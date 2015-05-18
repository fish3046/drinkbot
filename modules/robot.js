var Gpio = require('onoff').Gpio;
var manager;
var bartender;

/**
 * Keeps mapping of pins to ingredients
 *
 * @param pumps
 * @constructor
 */
var PumpManager = function(pumps){
	// Array of GPIO pins, keyed to ingredient ID
	var ingredient_to_gpio = {};
	// Array of Gpio objects, keyed to pin number
	var gpios = {};

	for (var i in pumps)
	{
		if (pumps.hasOwnProperty(i)) {
			ingredient_to_gpio[pumps[i].ingredient] = pumps[i].pin;
			gpios[pumps[i].pin] = new Gpio(pumps[i].pin, 'out');
		}
	}

	/**
	 * Number of pumps this manager knows about
	 * @returns {int}
	 */
	this.pumpCount = function()
	{
		return gpios.length;
	};

	/**
	 * @param {int} id
	 * @returns {Gpio}
	 */
	this.getPumpByIngredient = function(id)
	{
		if (ingredient_to_gpio.hasOwnProperty(id))
		{
			return gpios[ingredient_to_gpio[id]];
		}

		return null;
	};

	/**
	 * Unexport all pins and destroy objects
	 */
	this.shutdown = function()
	{
		for (var pin in gpios)
		{
			if (gpios.hasOwnProperty(pin))
			{
				gpios[pin].unexport();
			}
		}

		gpios = {};
		ingredient_to_gpio = {};
	};
};


var BarTender = function(pumpmanager)
{
	var manager = pumpmanager;
	var activePumps = 0;
	var active = false;
	var completeCallback;
	var currentDrink = null;

	/**
	 * Checks if we our PumpManager knows about all the ingredients
	 * @param drink
	 */
	this.canMake = function(drink)
	{
		var ingredients = drink.ingredients;

		for (var i = 0; i < ingredients.length; i++) {
			if (manager.getPumpByIngredient(ingredients[i].id) == null)
			{
				return false;
			}
		}

		return true;
	};

	this.makeDrink = function(drink, callback)
	{
		if (!this.canMake(drink))
			throw new Error("Robot is unaware of at least one ingredient");

		if (drink.ingredients.length == 0)
			throw new Error("Invalid drink: no ingredients");

		console.log("\033[31m[MSG] Creating a " + drink.name + " \033[91m");

		var ingredients = drink.ingredients;
		active = true;
		activePumps = 0;
		completeCallback = callback;
		currentDrink = drink;

		for (var i = 0; i < ingredients.length; i++)
		{
			(function (i) {
				setTimeout(function () {  // Delay implemented to have a top-biased mix
					var gpio = manager.getPumpByIngredient(ingredients[i].id);
					pumpMilliseconds(gpio, ingredients[i].pump_time);
				}, ingredients[i].pump_start_delay);
			})(i);
		}
	};

	this.getCurrentDrink = function()
	{
		return currentDrink;
	};

	this.isActive = function()
	{
		return active;
	};

	function pumpMilliseconds(pump, ms)
	{
		startPump(pump);

		setTimeout(function () {
			stopPump(pump);

			if (activePumps == 0)
			{
				finish();
			}
		}, ms);
	}

	/**
	 * Called by pumpMilliseconds when it detects all pumps have shut off
	 */
	function finish()
	{
		console.log("\033[31m[MSG] Finished making " + currentDrink.name + "\033[91m");

		active = false;

		if (completeCallback)
			completeCallback(currentDrink);

		currentDrink = null;
	}

	function startPump(gpio)
	{
		console.log("\033[32m[PUMP] Starting " + gpio + "\033[91m");
		gpio.writeSync(1);
		++activePumps;
	}

	function stopPump(gpio)
	{
		console.log("\033[32m[PUMP] Stopping " + gpio + "\033[91m");
		gpio.writeSync(0);
		--activePumps;
	}
};

/*
 * EXPORTS
 */

exports.init = function(pumps)
{
	manager = new PumpManager(pumps);
	bartender = new BarTender(manager);

	console.log("\033[31m[MSG] Drink Bot Ready\033[91m");
	console.log("\033[31m[MSG] Managing " + manager.pumpCount() + " pumps\033[91m");
};

exports.makeDrink = function(drink, callback)
{
	if (bartender == null) {
		throw new Error("ROBOT: Must run init() before making a drink");
	}

	bartender.makeDrink(drink, callback);
};

exports.shutdown = function()
{
	console.log("\033[31m[MSG] Shutting down\033[91m");

	manager.shutdown();
};