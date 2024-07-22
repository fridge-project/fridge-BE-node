import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
  recipe_id : { type: mongoose.Schema.Types.ObjectId, ref: "recipe"}
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

export default Favorite;