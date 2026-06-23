export const createFavorite = async (
  userId: string,
  recipeId: string,
) => {
  try {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, recipeId}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("No se pudieron guardar los favoritos", error);
    throw error
  }
};

export const deleteFavorite = async (userId: string, recipeId:string) =>{
  try{
    const res = await fetch(`/api/favorites?userId=${userId}&recipeId=${recipeId}`,
      {method:"DELETE"}
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error)
      return data
  }catch(error){
    console.error("No se pudo eliminar la receta de favorito", error)
    throw error
  }
}

export const getFavorite = async (userId: string)=>{
  try{
    const res = await fetch(`/api/favorites?userId=${userId}`);
    const data = await res.json()
    return data.data

  }catch(error){
    console.error("No se pudieron traer la receta de favoritos",error)
    return [];
  }
}