(function (){
	angular.module('drinks')
		.controller('IndexController', ['$uibModal', 'DrinkService', 'drinks.resource.PumpResource', 'Ingredient', IndexController]);

	function IndexController($uibModal, DrinkService, Pump, Ingredient)
	{
		this.drinks = [];
		this.pumps = Pump.query();
		this.ingredients = Ingredient.query();

		var self = this;

		this.drink = {
			id: '',
			size: 1
		};

		function init()
		{
			loadPossibleDrinks();
		}

		function loadPossibleDrinks()
		{
			DrinkService.getPossibleDrinks().then(function (resp)
			{
				self.drinks = resp;
			});
		}

		/**
		 * For use with pump ingredient listing
		 * @param pump
		 */
		this.changePumpIngredient = function (pump)
		{
			pump.$update({id: pump._id}, function(){
				loadPossibleDrinks();
			});
		};

		/**
		 * Make a drink!
		 */
		this.make = function ()
		{
			if (this.drink.id == '') {
				alert('Select a drink to make');
				return;
			}

			DrinkService.make(this.drink).then(function (resp)
			{
				var drinkDuration = resp.duration;

				var modal = $uibModal.open({
					templateUrl: 'make-modal.html',
					windowClass: 'make-modal',
					controller: 'drinks.controller.MakeModalController',
					controllerAs: 'modalctrl',
					resolve: {
						duration: function() {
							return drinkDuration;
						}
					}
				});
			}, function (resp)
			{
				if (resp.hasOwnProperty('error')) {
					alert(resp['error']);
				} else {
					alert('Failed! ' + resp);
				}
			});
		};

		init();
	}
})();