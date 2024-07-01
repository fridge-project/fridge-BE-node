import mongoose from "mongoose";

const ProcessSchema = new mongoose.Schema({
  recipe_code : { type: Number, require: true, unique: true },
  order_num : { type: Number, require: true },
  detail : { type: String },
  imageURL : { type: String },
  tip : { type: String }
});

const Process = mongoose.model("Process", ProcessSchema);

export default Process;