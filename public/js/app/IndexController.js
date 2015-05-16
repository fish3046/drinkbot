(function(){
    angular.module('drinks')
        .controller('IndexController', ['DrinkService', IndexController]);

    function IndexController(DrinkService)
    {
        this.drinks = [
            {
                id: 1,
                name: 'Martini',
                ingredients: [
                    '1 part Vodka',
                    '1 part Sprite'
                ]
            },
            {
                id: 2,
                name: 'Corkscrew',
                ingredients: [
                    '1 part Vodka',
                    '1 part Orange Juice'
                ]
            }
        ];

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