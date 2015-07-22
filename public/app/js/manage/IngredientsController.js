(function(){
	angular.module('drinks')
		.controller('drinks.manage.IngredientsController', ['DrinkService', 'Drink', IngredientsController]);

	function IngredientsController(DrinkService, Drink)
	{
		this.drinks = Drink.query();
		this.drink = {
			id: 0,
			size: 0
		};

		this.make = function(){
			DrinkService.make(this.drink).then(function(){
				alert('Done!');
			},function(resp){
				alert('Failed! ' + resp);
			});
		};
	}
})();