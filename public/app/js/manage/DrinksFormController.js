(function(){
	angular.module('drinks')
		.controller('drinks.manage.DrinksFormController', ['$routeParams','drinks.resource.DrinkResource','Ingredient','drinks.service.LocationService', DrinksFormController]);

	function DrinksFormController($routeParams, Drink, Ingredient, LocationService)
	{
		this.drink = new Drink();
		this.ingredients = Ingredient.query();
		var self = this;

		function init()
		{
			if ($routeParams.id) {
				self.drink = Drink.get({id: $routeParams.id});
			}
		}

		this.title = function()
		{
			return angular.isString(this.drink._id) ? 'Edit ' + this.drink.name : 'Add New Drink';
		};

		this.addIngredient = function()
		{
			this.drink.ingredients.push({});
		};

		this.removeIngredient = function(ing)
		{
			for (var i in this.drink.ingredients) {
				if (this.drink.ingredients[i] == ing) {
					this.drink.ingredients.splice(i, 1);
					break;
				}
			}
		};

		this.save = function()
		{
			if (angular.isString(this.drink._id))
				this.drink.$update({id: this.drink._id}, navBack);
			else
				this.drink.$save(navBack);
		};

		function navBack()
		{
			LocationService.go('/manage/drinks');
		}

		init();
	}
})();