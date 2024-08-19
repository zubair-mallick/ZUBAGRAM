import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('\x1b[32m%s\x1b[0m', "MongoDB Connected...");
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', "Error connecting to MongoDB:",error);
        process.exit(1);
    }
}

export default connectDB;