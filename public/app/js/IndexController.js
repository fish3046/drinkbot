(function (){
	angular.module('drinks')
		.controller('IndexController', ['DrinkService', 'drinks.resource.PumpResource', 'Ingredient', IndexController]);

	function IndexController(DrinkService, Pump, Ingredient)
	{
		this.drinks = [];
		this.pumps = Pump.query();
		this.ingredients = Ingredient.query();

		var self = this;

		this.drink = {
			id: '',
			size: 1
		};

		function init()
		{
			loadPossibleDrinks();
		}

		function loadPossibleDrinks()
		{
			DrinkService.getPossibleDrinks().then(function (resp)
			{
				self.drinks = resp;
			});
		}

		/**
		 * For use with pump ingredient listing
		 * @param pump
		 */
		this.changePumpIngredient = function (pump)
		{
			pump.$update({id: pump._id}, function(){
				loadPossibleDrinks();
			});
		};

		this.make = function ()
		{
			if (this.drink.id == '') {
				alert('Select a drink to make');
				return;
			}

			DrinkService.make(this.drink).then(function ()
			{
				alert('Done!');
			}, function (resp)
			{
				alert('Failed! ' + resp);
			});
		};

		init();
	}
})();