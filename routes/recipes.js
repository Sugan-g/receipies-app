import express from 'express';
import { body } from 'express-validator';
import * as  ctrl from '../controllers/recipeController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

//POST /api/ recipes 
router.post('/',
    [
        body('title').isString().isLength({ min: 2 }),
        body('ingredients').isArray({ min: 1 }),
        body('steps').isArray({ min: 1 }),
    ],
    validateRequest,
    ctrl.createRecipe
);

// GET /api/recipes
router.get('/', ctrl.getAllRecipes);

//GET / api/recipes/:id
router.get('/:id', ctrl.getRecipeById);

//PATCH /api/recipes/:id

router.patch('/:id',
    [
        body('title').optional().isString().isLength({ min: 2 }),
        body('ingredients').optional().isArray(),
        body('steps').optional().isArray()
    ],
    validateRequest,
    ctrl.updateRecipe
);

//DELETE /api/recipes/:id
router.delete('/:id', ctrl.deleteRecipe);

export default router;