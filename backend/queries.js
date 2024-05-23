// Description: This file contains the queries to interact with the database.

const Recipe = require('./mongoose/RecipeSchema.js')

async function getAllRecipes() {
    console.log("Attempting to fetch all recipes...");
    try {
        const recipes = await Recipe.find();
        console.log("Recipes fetched successfully!");
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

// Create a new recipe
async function createRecipe(recipeData) {
    try {
        const recipe = new Recipe(recipeData);
        await recipe.save();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Update a recipe by id
async function updateRecipe(recipeId, updateData) {
    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: recipeId },
            { $set: updateData },
            { new: true }
        );
        if (!recipe) {
            console.log('No recipe found with ID:', recipeId);
            return false;
        }
        return recipe;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Delete a recipe by id
async function deleteRecipe(id) {
    try {
        const result = await Recipe.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            console.log('No recipe found with ID:', id);
            return false; // No document was deleted
        }
        console.log('Recipe deleted successfully');
        return true; // Document was deleted
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return false; // An error occurred
    }
}

module.exports = {
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
