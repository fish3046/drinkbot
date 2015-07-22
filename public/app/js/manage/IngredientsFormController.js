(function(){
	angular.module('drinks')
		.controller('drinks.manage.IngredientsFormController', ['$routeParams','Drink', IngredientsFormController]);

	function IngredientsFormController($routeParams, Drink)
	{
		this.ingredient = {};
		var self = this;

		function init()
		{
			if ($routeParams.id) {
				self.ingredient = Drink.get({drinkid: $routeParams.id});
			}
		}

		this.title = function()
		{
			return this.ingredient.id != '' ? 'Edit ' + this.ingredient.name : 'Add New Drink';
		};

		this.save = function()
		{

		};

		init();
	}
})();