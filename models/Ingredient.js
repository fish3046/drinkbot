var mongoose = require('mongoose');

exports.IngredientSchema = new mongoose.Schema({
	name: { type: String, required: true }
});