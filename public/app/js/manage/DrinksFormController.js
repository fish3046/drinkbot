(function(){
	angular.module('drinks')
		.controller('drinks.manage.DrinksFormController', ['$routeParams','Drink','Ingredient', DrinksFormController]);

	function DrinksFormController($routeParams, Drink, Ingredient)
	{
		this.drink = {};
		this.ingredients = Ingredient.query();
		var self = this;

		function init()
		{
			if ($routeParams.id) {
				self.drink = Drink.get({drinkid: $routeParams.id});
			}
		}

		this.title = function()
		{
			return this.drink.id != '' ? 'Edit ' + this.drink.name : 'Add New Drink';
		};

		this.save = function()
		{

		};

		init();
	}
})();