var express = require('express');
var router = express.Router();
var drinks = require('../modules/drink_library').drinks;
var robot = require('../modules/robot');

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

		res.status(404).json({
			error: "Invalid drink ID"
		});
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

/**
 * REST
 * get all available drinks
 */
router.get('/', function(req, res, next) {
    res.json(drinks);
});

router.post('/make', [drinkMake01, drinkMake02]);

module.exports = router;
