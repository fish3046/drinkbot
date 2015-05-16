(function(){
    angular.module('drinks', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider', drinkConfig])
    ;

    function drinkConfig($routeProvider, $locationProvider)
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