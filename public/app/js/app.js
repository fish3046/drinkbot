(function(){
    angular.module('drinks', ['ngResource','ngRoute'])
        .config(['$locationProvider', '$routeProvider', drinkConfig])
    ;

    function drinkConfig($locationProvider, $routeProvider)
    {
        //Using Non HTML5 Mode with HashBang (make sure links include #!)
        //$locationProvider.html5Mode({enabled: true, requireBase: true});
        $locationProvider.html5Mode(false);

        $routeProvider
			.when('/manage/drinks', {
				templateUrl: '/app/views/manage/drinks.html',
				controller: 'drinks.manage.DrinksController',
				controllerAs: 'ctrl'
			})
			.when('/manage/drinks/form/:id', {
				templateUrl: '/app/views/manage/drinksform.html',
				controller: 'drinks.manage.DrinksFormController',
				controllerAs: 'ctrl'
			})
			.when('/manage/ingredients/:id', {
				templateUrl: '/app/views/manage/ingredients.html',
				controller: 'drinks.manage.IngredientsController',
				controllerAs: 'ctrl'
			})
			.when('/manage/ingredients/form/:id', {
				templateUrl: '/app/views/manage/ingredientsform.html',
				controller: 'drinks.manage.IngredientsFormController',
				controllerAs: 'ctrl'
			})
			.otherwise({
				templateUrl: '/app/views/index.html',
				controller: 'IndexController',
				controllerAs: 'ctrl'
			})
        ;
    }
})();