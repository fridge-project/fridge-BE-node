import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  recipe_code : { type: Number, require: true },
  recipe : { type: String, required: true },
  introduce : { type: String },
  category_code : { type: Number},
  category : { type: String },
  class_code : { type: Number },
  class : { type: String },
  time : { type: String },
  calorie : { type: String },
  serving : { type: String },
  difficulty : { type: String },
  imageURL : { type: String },
  detailURL : { type: String },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;