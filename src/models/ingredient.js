import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  recipe : { type: String, required: true},
  name : { type: String, required: true},
  amount : { type: String, required: true},
  recipe_id : { type: mongoose.Schema.Types.ObjectId, ref: "recipe"}
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

export default Ingredient;