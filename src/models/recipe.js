import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  recipe_code : { type: Number, require: true, unique: true },
  recipe : { type: String, required: true, unique: true },
  introduce : { type: String },
  category_code : { type: Number, require: true },
  category : { type: String, required: true },
  class_code : { type: Number, require: true },
  class : { type: String, required: true },
  time : { type: String },
  calorie : { type: String },
  serving : { type: String },
  difficulty : { type: String },
  imageURL : { type: String },
  detailURL : { type: String },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;