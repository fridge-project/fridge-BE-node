import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
  recipe_id : { type: Number, require: true}
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;