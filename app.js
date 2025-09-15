import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('Recipes API is running'));

//routes
app.use('/api/recipes', recipeRoutes);

//error handler 
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    } catch (err) {
        console.log("failed to start server", err.message);
        process.exit(1);
    }

};

start();