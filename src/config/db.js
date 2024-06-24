import mongoose from "mongoose";

//비동기 처리를 위한 async 키워드 사용
// await는 실제 비동기 처리 시 사용하는 키워드
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fridge");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(err);
    console.log('MongoDB connection failed');
    process.exit(1);
  }
  
}

export default connectDB;