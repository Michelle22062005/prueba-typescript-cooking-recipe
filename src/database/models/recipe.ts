import { Schema, model, Model, Document } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  imageUrl: string;
  preparationTime: string;
  difficulty: string;
  createdAt: Date;
  longDescription: string;
  ingredients: Map<string, string>;
  preparationsteps: Map<string, string>;
  portions: Map<string, string>;
}

const RecipeSchema = new Schema<IRecipe>({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "The image URL is required"],
  },
  preparationTime: {
    type: String,
    required: [true, "The preparation time is required"],
  },
  difficulty: {
    type: String,
    required: [true, "The difficulty is required"],
  },
  longDescription: {
    type: String,
    required: [true, "The long description is required"],
  },
  ingredients: {
    type: Map,
    of: String,
  },
  preparationsteps: {
    type: Map,
    of: String,
  },
  portions: {
    type: Map,
    of: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export let Recipe: Model<IRecipe>;
try {
  Recipe = model<IRecipe>("recipes");
} catch (error) {
  Recipe = model("recipes", RecipeSchema);
}

export default RecipeSchema;