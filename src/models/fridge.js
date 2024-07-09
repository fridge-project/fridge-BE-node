import mongoose from "mongoose";

const FridgeSchema = new mongoose.Schema({
	name : { type: String, required: true},
	memo : { type: String },
	storage : { type: String, required: true},
	exp : { type: String, required: true},
	date : { type: String },
	imageURL : { type: String },
  ingredient_id : { type: mongoose.Schema.Types.ObjectId, ref: "ingredient"}
});

const Fridge = mongoose.model("Fridge", FridgeSchema);

export default Fridge;