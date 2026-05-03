import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

async function connectDB() {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
}

export default connectDB;