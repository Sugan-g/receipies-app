import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true,
        minLength: 2,
        maxLength: 200,
    },
    description: {
        type: String,
        trim: true
    },
    ingredients: {
        type: [String],
        validate: {
            validator: arr => Array.isArray(arr) && arr.length > 0,
            message: 'At least one ingredients is required'
        }
    },
    steps: {
        type: [String],
        validate: {
            validator: arr => Array.isArray(arr) && arr.length > 0,
            message: 'At least one step is required'
        }
    },
    servings: {
        type: Number,
        min: 1,
        default: 1
    },
    prepTimeMinutes: {
        type: Number,
        min: 0,
        default: 0
    },
    cookTimeMinutes: {
        type: Number,
        min: 0,
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    tag: [String],
    author: {
        type: String,
        default: 'anonymous'
    }

}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);
