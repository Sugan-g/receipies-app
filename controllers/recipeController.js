import Recipe from '../models/recipe.js';

// Create a new recipe
export const createRecipe = async (req, res, next) => {
    try {
        const payload = req.body;
        const newRecipe = await Recipe.create(payload);

        return res.status(201).json({
            success: true,
            data: newRecipe
        });
    } catch (err) {
        next(err);
    }
};

// Get all recipes with filters and pagination
export const getAllRecipes = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, tag, difficulty } = req.query;
        const filter = {};
        if (tag) filter.tag = { $in: [tag] };
        if (difficulty) filter.difficulty = difficulty;

        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 20;

        const recipes = await Recipe.find(filter)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        const total = await Recipe.countDocuments(filter);
        return res.status(200).json({
            success: true,
            count: recipes.length,
            total,
            data: recipes
        });

    } catch (err) {
        next(err);
    }
};

// Get single recipe by ID
export const getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundRecipe = await Recipe.findById(id);

        if (!foundRecipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: foundRecipe
        });
    } catch (err) {
        next(err);
    }
};

// Update recipe by ID
export const updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedRecipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedRecipe
        });
    } catch (err) {
        next(err);
    }
};

// Delete recipe by ID
export const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Recipe Deleted',
            data: deletedRecipe
        });
    } catch (err) {
        next(err);
    }
};
