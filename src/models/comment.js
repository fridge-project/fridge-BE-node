import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	user_id : { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
  recipe_id : { type: mongoose.Schema.Types.ObjectId, ref: "recipe", require: true },
  detail : { type: String, required: true },
  grade : { type: Number, required: true },
  imageURL : { type: String }
});

CommentSchema.index({ user_id: 1, recipe_id: 1 }, {unique: true}); // 복합 인덱스

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;