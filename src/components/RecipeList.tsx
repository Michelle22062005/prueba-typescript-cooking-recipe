import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { getRecipe } from "../services/recipeService";
import { IRecipeCard } from "../types/recipe";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState<IRecipeCard[]>([]);

  useEffect(() => {
    getRecipe().then((data) => setRecipes(data ?? []));
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} {...recipe} />
      ))}
    </div>
  );
}