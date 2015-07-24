(function(){
    angular.module('drinks')
        .controller('IndexController', ['DrinkService', 'Drink', IndexController]);

    function IndexController(DrinkService, Drink)
    {
        this.drinks = Drink.query();
        this.drink = {
            id: '',
            size: 1
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