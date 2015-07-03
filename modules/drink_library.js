module.exports = {
	drinks: [
		{
			id: 1,
			name: 'Martini',
			ingredients: [
				{
					'id': 1,
					'pump': 27, // from join
					'pump_time': 3000,
					'pump_start_delay': 0,
					'desc': '1 part Vodka'
				},
				{
					'id': 2,
					'pump': 24,	// from join
					'pump_time': 3000,
					'pump_start_delay': 0,
					'desc': '1 part Sprite'
				}
			]
		},
		{
			id: 2,
			name: 'Corkscrew',
			ingredients: [
				{
					name: 'Vodka',
					'pump_time': 3000,
					'desc': '1 part Vodka'
				},
				{
					'id': 3,
					'pump_time': 3000,
					'desc': '1 part Orange Juice'
				}
			]
		}
	],

	// Ingredient ID and label
	ingredients: {
		1: 'Vodka',
		2: 'Sprite',
		3: 'Orange Juice'
	},

	// GPIO pin number to ingredient
	pumps: [
		{
			pin: 27,
			ingredient: 1
		},
		{
			pin: 24,
			ingredient: 2
		}
	]
};