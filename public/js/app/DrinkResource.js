(function(){
    angular.module('drinks')
        .factory('Drink', [Drink]);

    function Drink()
    {
        return $resource();
    }
})();