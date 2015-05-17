var express = require('express');
var router = express.Router();

/**
 * REST
 * get all available
 */
router.get('/', function(req, res, next) {
	var drinks = [
		{
			id: 1,
			name: 'Martini',
			ingredients: [
				'1 part Vodka',
				'1 part Sprite'
			]
		},
		{
			id: 2,
			name: 'Corkscrew',
			ingredients: [
				'1 part Vodka',
				'1 part Orange Juice'
			]
		}
	];

    res.send(drinks);
});

router.post('/make', function(req, res, next) {


    res.send('someting');
});

module.exports = router;
