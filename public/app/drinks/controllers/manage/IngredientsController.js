(function(){
	angular.module('drinks')
		.controller('drinks.controllers.manage.IngredientsController', ['drinks.service.LocationService', 'Ingredient', IngredientsController]);

	function IngredientsController(LocationService, Ingredient)
	{
		this.ingredients = Ingredient.query();
		var self = this;

		this.deleteRecord = function(record)
		{
			if (confirm('Are you sure?')) {
				record.$delete({id: record._id}, function(){
					for (var i in self.ingredients) {
						if (self.ingredients[i] == record) {
							self.ingredients.splice(i, 1);
							break;
						}
					}
				});
			}
		};

		this.addRecord = function()
		{
			LocationService.go('/manage/ingredients/form');
		};

		this.edit = function(record)
		{
			LocationService.go('/manage/ingredients/form/' + record._id);
		};
	}
})();