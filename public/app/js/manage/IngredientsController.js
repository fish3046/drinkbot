(function(){
	angular.module('drinks')
		.controller('drinks.manage.IngredientsController', ['Ingredient', IngredientsController]);

	function IngredientsController(Ingredient)
	{
		this.ingredients = Ingredient.query();
	}
})();