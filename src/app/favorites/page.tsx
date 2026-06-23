"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { RecipeCard } from "@/src/components/RecipeCard";
import { IRecipeCard } from "@/src/types/recipe";
import { getRecipe } from "@/src/services/recipeService";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";

export default function PageFavorites(){
  const { favorites} = useAuth()
  const { data:session } = useSession();
    const router= useRouter();
    const [recipes, setRecipes]= useState<IRecipeCard[]>([])
    //Proteger la ruta
    useEffect(()=>{
        if(!session){
            router.push("/login")
        }
    },[session])
    

    //Traer las recetas y filtrar favoritos
    useEffect(() => {
  if (!session) return;

  getRecipe().then((data: IRecipeCard[]) => {
   
    const favoritesArray = Array.isArray(favorites) 
      ? favorites 
      : favorites ? Object.values(favorites) : [];
    
    // 2. Filtramos las recetas usando la data que acaba de llegar (Dentro del .then)
    const favRecipe = data.filter((p) => favoritesArray.includes(p._id));
    
    // 3. Guardamos en el estado (Dentro del .then)
    setRecipes(favRecipe);
  });
  
}, [favorites, session]);

    const back=()=>{
        router.back()
    }
    if(!session) return null
    return (
    <div className="flex flex-col gap-5 m-5">
      <h1 className="text-2xl" style={{ color: "#6b4f3a" }}>Mis favoritos</h1>
      <Button onPress={back}>Volver</Button>

      {recipes.length === 0 ? (
        <p style={{ color: "#b07850" }}>No tienes productos en favoritos aún.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))}
        </div>
      )}
    </div>
    )
}