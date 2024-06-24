import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email : { type: String, required: true, unique:true},
  username : { type: String, required: true},
  password : { type: String, requierd: true},
  refreshToken: { type: String }
});

const User = mongoose.model("User", UserSchema);

export default User;