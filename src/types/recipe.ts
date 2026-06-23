export interface IRecipeCard {
 _id: string;
  name: string;
  imageUrl: string;
  preparationTime: string;
  difficulty:string;
  createdAt: string;
}

// Vista de detalle — incluye campos adicionales no visibles en el listado
export interface IRecipeDetail extends IRecipeCard {
  longDescription: string;
  ingredients: Record<string, string> | string;
  preparationsteps: Record<string, string> | string;
  portions:number | string;

}