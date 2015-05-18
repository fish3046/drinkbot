var Drink = function(data)
{
	this.id = data.id || 0;
	this.name = data.name || '';
	this.ingredients = data.ingredients || [];
};

Drink.prototype = {
	/**
	 * How long it will take to make this drink in milliseconds
	 * @returns {number}
	 */
	duration: function()
	{
		var longest = 0;
		var curIngredientTime = 0;

		for (var i = 0; i < this.ingredients.length; i++) {
			curIngredientTime = this.ingredients[i].pump_time + this.ingredients[i].pump_start_delay;
			if (curIngredientTime > longest)
				longest = curIngredientTime;
		}

		return longest;
	}
};

module.exports.Drink = Drink;