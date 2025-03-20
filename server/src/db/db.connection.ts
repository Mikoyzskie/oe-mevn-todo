import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
