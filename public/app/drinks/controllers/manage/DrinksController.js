(function(){
	angular.module('drinks')
		.controller('drinks.controllers.manage.DrinksController', ['drinks.service.LocationService', 'drinks.resource.DrinkResource', DrinksController]);

	function DrinksController(LocationService, Drink)
	{
		this.drinks = Drink.query();
		var self = this;

		this.addRecord = function()
		{
			LocationService.go('/manage/drinks/form');
		};

		this.deleteDrink = function(drink)
		{
			if (confirm('Are you sure?')) {
				drink.$delete({id: drink._id}, function(){
					for (var i in self.drinks) {
						if (self.drinks[i] == drink) {
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