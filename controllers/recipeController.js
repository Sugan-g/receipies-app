import Recipe from '../models/recipe.js';

// create recipe

export const createRecipe = async (req, res, next) => {
    try {
        const payload = req.body;
        const recipe = await Recipe.create(payload);
        return res.status(201).json({
            success: true,
            data: recipe
        });
    } catch (err) {
        next(err);
    }
};

// get all recipes with filters and pagination 
export const getAllRecipes = async (req, res, next) => {
    try {

        const { page = 1, limit = 20, tag, difficulty } = req.query;
        const filter = {};
        if (tag)
            filter.tag = { $in: [tag] };
        if (difficulty)
            filter.difficulty = difficulty;
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

//get single recipe by ID 

export const getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe)
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        return res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (err) {
        next(err);
    }
};

//update recipe 

export const updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated)
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        return res.status(200).json({
            success: true,
            data: updated
        });
    } catch (err) {
        next(err);
    }
};


//delete recipe 

export const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Recipe.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        return res.status(200).json({
            success: true,
            message: 'Recipe Deleted',
            data: deleted
        });
    } catch (err) {
        next(err);
    }
}