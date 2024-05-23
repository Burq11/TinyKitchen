const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
}, { collection: 'recipes' });
 
module.exports = mongoose.model('Recipe', recipeSchema);