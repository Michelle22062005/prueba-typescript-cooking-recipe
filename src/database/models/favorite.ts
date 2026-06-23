import { Schema, model, Model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
  savedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "The user is required"],
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "recipes",
    required: [true, "The product is required"],
  },
  savedAt: {
    type: Date,
  },
});

FavoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export let Favorite: Model<IFavorite>;
try {
  Favorite = model<IFavorite>("favorites");
} catch (error) {
  Favorite = model("favorites", FavoriteSchema);
}

export default FavoriteSchema;