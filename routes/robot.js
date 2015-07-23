//var express = require('express');
//var router = express.Router();
//var robot = require('../modules/robot');

module.exports.makeDrink = function(DrinkSchema, robot)
{
	var drinkMake01 = function(req, res, next)
	{
		var drinkId = req.body.id;
		var drink;

		// Find the requested drink in the drink library
		for (var i = 0; i < drinks.length; i++)
		{
			if (drinks[i].id == drinkId) {
				drink = drinks[i];
				break;
			}
		}

		// If we couldn't find it, send error
		if (!drink) {
			console.log('Drink request failed: invalid drink ID ' + drinkId);

			res
				.status(404)
				.json({ error: "Invalid drink ID" });
			return;
		}

		// Store drink in the request object and move on
		req.drink = drink;
		next();
	};
	var drinkMake02 = function(req, res, next)
	{
		robot.makeDrink(req.drink);

		res.json({
			status: 'Started',
			duration: 'TODO'
		});
	};

	return [drinkMake01, drinkMake02];
};
