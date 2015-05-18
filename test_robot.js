var robot = require('./modules/robot');

var pumpconfig = [
	{
		pin: 16,
		ingredient: 1
	},
	{
		pin: 19,
		ingredient: 2
	}
];

var drink = {
	id: 1,
	name: 'Martini',
	ingredients: [
		{
			id: 1,
			pump_time: 10000,
			pump_start_delay: 0,
			desc: '1 part Vodka'
		},
		{
			id: 2,
			pump_time: 15000,
			pump_start_delay: 5000,
			desc: '3 part Sprite'
		}
	]
};

robot.init(pumpconfig);
robot.makeDrink(drink, function(){
	robot.shutdown();
});
