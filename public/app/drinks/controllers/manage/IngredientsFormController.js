(function(){
	angular.module('drinks')
		.controller('drinks.controllers.manage.IngredientsFormController', ['$routeParams','Ingredient', 'drinks.service.LocationService', IngredientsFormController]);

	function IngredientsFormController($routeParams, Ingredient, LocationService)
	{
		this.ingredient = new Ingredient();
		var self = this;

		function init()
		{
			if ($routeParams.id) {
				self.ingredient = Ingredient.get({id: $routeParams.id});
			}
		}

		this.title = function()
		{
			return angular.isString(this.ingredient._id) ? 'Edit ' + this.ingredient.name : 'Add New Ingredient';
		};

		this.save = function()
		{
			if (angular.isString(this.ingredient._id))
				this.ingredient.$update({id: this.ingredient._id}, navBack);
			else
				this.ingredient.$save(navBack, function(resp){
					console.log(resp);
				});
		};

		function navBack()
		{
			LocationService.go('/manage/ingredients');
		}

		init();
	}
})();