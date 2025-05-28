import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("Database URI not set in environment variables.");
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};
