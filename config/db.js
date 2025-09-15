import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

export default connectDB;
