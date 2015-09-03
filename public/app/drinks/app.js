(function(){
    angular.module('drinks', ['ngResource','ngRoute','ui.bootstrap'])
        .config(['$locationProvider', '$routeProvider', drinkConfig])
    ;

    function drinkConfig($locationProvider, $routeProvider)
    {
        //Using Non HTML5 Mode with HashBang (make sure links include #!)
        //$locationProvider.html5Mode({enabled: true, requireBase: true});
        $locationProvider.html5Mode(false);

        $routeProvider
			.when('/manage/drinks', {
				templateUrl: '/app/drinks/views/manage/drinks.html',
				controller: 'drinks.controllers.manage.DrinksController',
				controllerAs: 'ctrl'
			})
			.when('/manage/drinks/form', {
				templateUrl: '/app/drinks/views/manage/drinksform.html',
				controller: 'drinks.controllers.manage.DrinksFormController',
				controllerAs: 'ctrl'
			})
			.when('/manage/drinks/form/:id', {
				templateUrl: '/app/drinks/views/manage/drinksform.html',
				controller: 'drinks.controllers.manage.DrinksFormController',
				controllerAs: 'ctrl'
			})
			.when('/manage/ingredients', {
				templateUrl: '/app/drinks/views/manage/ingredients.html',
				controller: 'drinks.controllers.manage.IngredientsController',
				controllerAs: 'ctrl'
			})
			.when('/manage/ingredients/form', {
				templateUrl: '/app/drinks/views/manage/ingredientsform.html',
				controller: 'drinks.controllers.manage.IngredientsFormController',
				controllerAs: 'ctrl'
			})
			.when('/manage/ingredients/form/:id', {
				templateUrl: '/app/drinks/views/manage/ingredientsform.html',
				controller: 'drinks.controllers.manage.IngredientsFormController',
				controllerAs: 'ctrl'
			})
			.when('/manage/pumps', {
				templateUrl: '/app/drinks/views/manage/pumps.html',
				controller: 'drinks.controllers.manage.PumpsController',
				controllerAs: 'ctrl'
			})
			.otherwise({
				templateUrl: '/app/drinks/views/index.html',
				controller: 'IndexController',
				controllerAs: 'ctrl'
			})
        ;
    }
})();