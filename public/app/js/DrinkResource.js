(function(){
    angular.module('drinks')
        .factory('Drink', ['$resource', Drink]);

    function Drink($resource)
    {
        return $resource('/db/drink/:drinkid', {drinkid:'@id'});
    }
})();