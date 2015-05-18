var robot = require('modules/robot.js');

var pumpconfig = [
	{
		pin: 27,
		ingredient: 1
	},
	{
		pin: 24,
		ingredient: 2
	}
];

var drink = {
	id: 1,
	name: 'Martini',
	ingredients: [
		{
			id: 1,
			pump_time: 1000,
			pump_start_delay: 0,
			desc: '1 part Vodka'
		},
		{
			id: 2,
			pump_time: 3000,
			pump_start_delay: 0,
			desc: '3 part Sprite'
		}
	]
};

robot.init(pumpconfig);
robot.makeDrink(drink, function(){
	robot.shutdown();
});
