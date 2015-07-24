(function(){
	angular.module('drinks')
		.controller('drinks.manage.DrinksController', ['drinks.service.LocationService', 'drinks.resource.DrinkResource', DrinksController]);

	function DrinksController(LocationService, Drink)
	{
		this.drinks = Drink.query();
		var self = this;

		this.deleteDrink = function(drink)
		{
			if (confirm('Are you sure?')) {
				drink.$delete(function(){
					for (var i in self.drinks) {
						if (self.drinks == drink) {
							self.drinks.splice(i, 1);
							break;
						}
					}
				});
			}
		};

		this.edit = function(drink)
		{
			LocationService.go('/manage/drinks/form/' + drink._id);
		};
	}
})();