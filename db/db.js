import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbUrl = process.env.MONGODB_URI;

if (!mongodbUrl) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error");
    console.error(err);
  });
