var mongoose = require('mongoose');

var ds = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: false },
	ingredients: [{
		name: { type: String, required: true },
		desc: String,
		ml: { type: Number, required: true },
		pump_start_delay: Number
	}]
});

/**
 * How long it will take to make this drink in milliseconds
 * @returns {number}
 */
ds.methods.duration = function()
{
	var longest = 0;
	var curIngredientTime = 0;

	if (!this.size) {
		this.size = 1;
	}

	for (var i = 0; i < this.ingredients.length; i++) {
		// Because this isn't required, make sure it's an int
		var pumpDelay = this.ingredients[i].pump_start_delay;
		if (isNaN(pumpDelay))
			pumpDelay = 0;

		curIngredientTime = (this.ingredients[i].pump_time * this.size) + pumpDelay;
		if (curIngredientTime > longest)
			longest = curIngredientTime;
	}

	return longest;
};

exports.DrinkSchema = ds;