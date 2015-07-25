(function(){
    angular.module('drinks')
        .controller('IndexController', ['DrinkService', 'drinks.resource.DrinkResource', 'drinks.resource.PumpResource', 'Ingredient', IndexController]);

    function IndexController(DrinkService, Drink, Pump, Ingredient)
    {
        this.drinks = [];
		this.pumps = Pump.query();
		this.ingredients = Ingredient.query();

		var self = this;

		DrinkService.getPossibleDrinks().then(function(resp){
			self.drinks = resp;
		});

        this.drink = {
            id: '',
            size: 1
        };

		this.changePumpIngredient = function(pump, ingredient)
		{
			alert(ingredient.name);
		};

        this.make = function()
		{
			if (this.drink.id == '') {
				alert('Select a drink to make');
				return;
			}

            DrinkService.make(this.drink).then(function(){
                alert('Done!');
            },function(resp){
                alert('Failed! ' + resp);
            });
        };
    }
})();