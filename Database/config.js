import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const mongoDBConnectionString = process.env.MONGODB_URI;
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongoDBConnectionString)
        console.log("Connected to DB");
    } catch(error){
        console.log("Error", error);
    }
}

export default connectDB;