import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

export default connectDB;
