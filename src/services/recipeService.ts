export const getRecipe = async () => {
    try{
        const res = await fetch("/api/recipes");
        const data = await res.json()
        console.log("TRAE LOS PRODUCTOS------------", data.data)
        return data.data
    }catch(error){
        console.error("NO se pudieron traewr las recetas", error)
    }
}
export const getRecipeById = async (_id:string) => {
    try{
        const res = await fetch(`/api/recipes/${_id}`)
        const data = await res.json()

        console.log("data", data)
        return data
    }catch(error){
        console.error(error)
    }
}