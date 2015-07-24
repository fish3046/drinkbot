module.exports.makeDrink = function(DrinkSchema, robot)
{
	var drink;

	var drinkMake01 = function(req, res, next)
	{
		DrinkSchema.findById(req.body.id, function (err, record){
			if (err || !record) {
				res.status(400);
				res.json({error: err});
			} else if (record) {
				// Store drink in the request object and move on
				drink = record;
				drink.size = req.body.size;
				next();
			} else {
				// If we are finding by ID, assuming that if we don't have 1 record, none are found
				res.status(404);
				res.send();
			}
		});
	};
	var drinkMake02 = function(req, res, next)
	{
		try {
			robot.makeDrink(drink);

			res.json({
				status: 'Started',
				duration: drink.duration()
			});
		} catch (e) {
			res.status(500);
			res.json({error: e.message});
		}
	};

	return [drinkMake01, drinkMake02];
};
