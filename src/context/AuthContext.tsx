"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getFavorite, createFavorite, deleteFavorite } from "@/src/services/favoriteService";

interface AuthContextType {
    favorites:string[];
    authMessage:string;
    toggleFavorite:(recipeId: string) => void;
    isFavorite: (recipeId: string) => boolean
}

interface Favorite {
  recipeId: {
    _id: string;
  };
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: {children:React.ReactNode}) {
    const {data: session} = useSession()
    const [favorites, setFavorites] = useState<string[]>([]);
    const [authMessage, setAuthMessage] = useState("")

    useEffect(() =>{
        const loadFavorites = async () => {
            if(!session?.user?.id){
                setFavorites([]);
                return
            }
            const data = await getFavorite(session.user.id);
            const ids = data.map((fav: Favorite) => fav.recipeId._id)
            setFavorites(ids)
        }
        loadFavorites()
    },[session])

    const toggleFavorite = async (recipeId: string) =>{
        if (!session?.user?.id) {
      setAuthMessage("Debes iniciar sesión para agregar a favoritos");
      setTimeout(() => setAuthMessage(""), 3000);
      return;
    }
    const userId = session.user.id;
    const isFav = favorites.includes(recipeId);

    const previousFavorites = [...favorites];

    try{
        if(isFav){
            setFavorites((prev) => prev.filter((id) => id !== recipeId));
            await deleteFavorite(userId, recipeId);
        }else{
            setFavorites((prev) => [...prev, recipeId]);
            await createFavorite(userId, recipeId);
        }

    }catch(error){
        console.error("Error al actualizar favorito", error)
        setFavorites(previousFavorites);
        console.error("Error crítico en el servidor al actualizar favorito:", error);
        
        setAuthMessage("Hubo un error en el servidor al guardar tu favorito.");
        setTimeout(() => setAuthMessage(""), 3000);
    }
}
const isFavorite = (recipeId: string) => favorites.includes(recipeId);
return(
    <AuthContext.Provider value={{favorites,authMessage, toggleFavorite,isFavorite}}>
        {children}
    </AuthContext.Provider>
)

}
export const useAuth = () => useContext(AuthContext);