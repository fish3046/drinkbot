/* GET home page. */
exports.indexPage = function (env)
{
	return function (req, res)
	{
		res.render('layout', {env: env});
	};
};

/**
 * Based on what ingredients are configured to pumps, return what drinks we can make
 * @param PumpSchema
 * @param DrinkSchema
 * @returns {Function}
 */
exports.possibleDrinks = function (PumpSchema, DrinkSchema)
{
	return function (req, res)
	{
		console.log("Determining possible drinks...");

		PumpSchema.find({ingredient: {$ne: ''}}, function (err, pumps)
		{
			var activeIngredients = [];

			for (var i in pumps) {
				activeIngredients.push(pumps[i].ingredient);
			}

			console.log("Active ingredients: " + activeIngredients);

			//DrinkSchema.find({'ingredient.name': {$in: activeIngredients}}, function (err, records)
			DrinkSchema.find({}, function (err, drinks)
			{
				if (err || !drinks) {
					res.status(500);
					res.json({error: err});
				} else {
					var pdrinks = determineDrinks(activeIngredients, drinks);

					console.log(pdrinks.length + " drinks available");
					res.json(pdrinks);
				}
			});
		});
	};

	/**
	 * TODO: this should be replaced by a better mongo query
	 *
	 * @param {Array} ingredients
	 * @param {Array} drinks
	 * @returns {Array}
	 */
	function determineDrinks(ingredients, drinks)
	{
		var results = [];

		for (var d = 0; d < drinks.length; d++) {
			var reject = false;

			for (var i = 0; i < drinks[d].ingredients.length; i++) {
				if (ingredients.indexOf(drinks[d].ingredients[i].name) == -1) {
					console.log(drinks[d].name + " missing " + drinks[d].ingredients[i].name);

					reject = true;
				}
			}

			if (!reject) {
				results.push(drinks[d]);
			}
		}

		return results;
	}
};