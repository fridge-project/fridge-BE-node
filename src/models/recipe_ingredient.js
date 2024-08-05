import mongoose from "mongoose";

const RecipeIngredientSchema = new mongoose.Schema({
  recipe : { type: String, required: true},
  name : { type: String, required: true},
  amount : { type: String, required: true},
  recipe_code : { type: Number, require: true }
});

const RecipeIngredient = mongoose.model("RecipeIngredient", RecipeIngredientSchema);

export default RecipeIngredient;