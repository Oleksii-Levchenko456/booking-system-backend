import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const conectMongoDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL
    await mongoose.connect(mongoURL)
    console.log('✅ MongoDB connection established successfully')
  } catch (error){
    console.error('❌ Failed to connect to MongoDB:', error.message)
    process.exit(1)
  }
}
