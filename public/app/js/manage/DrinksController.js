(function(){
	angular.module('drinks')
		.controller('drinks.manage.DrinksController', ['Drink', DrinksController]);

	function DrinksController(Drink)
	{
		this.drinks = Drink.query();
	}
})();