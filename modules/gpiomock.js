var Gpio = function(pin, direction)
{
	this.gpio = pin;
	this.direction = direction;

	console.log("MOCK: Gpio initialized, pin: " + pin + ", direction: " + direction);
};
Gpio.prototype = {
	unexport: function()
	{
		console.log("MOCK: gpio " + this.gpio + " unexported");
	},

	writeSync: function(val)
	{
		console.log("MOCK: gpio " + this.gpio + " writeSync " + val);
	}
};

exports.Gpio = Gpio;