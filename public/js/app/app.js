(function(){
    angular.module('drinks', ['ngResource'])
        .config(['$locationProvider', drinkConfig])
    ;

    function drinkConfig($locationProvider)
    {
        //Using Non HTML5 Mode with HashBang (make sure links include #!)
        $locationProvider.html5Mode({enabled: false, requireBase: true});
        $locationProvider.hashPrefix('!');

        /*$routeProvider
            .when('/', {
                templateUrl: '/views/index.html',
                controller: 'IndexController'
            })
        ;*/
    }
})();