(function(){
    angular.module('drinks')
        .service('DrinkService', ['$q', '$http', DrinkService]);

    function DrinkService($q, $http)
    {
        this.make = function(drink){
            var deferred = $q.defer();

            $http.post('/robot/make', drink).then(function(resp){
                deferred.resolve(resp.data);
            }, function(resp){
                deferred.reject(resp);
            });

            return deferred.promise;
        };

		this.getPossibleDrinks = function()
		{
			var deferred = $q.defer();

			$http.get('/service/possible_drinks').then(function(resp){
				deferred.resolve(resp.data);
			}, function(resp){
				deferred.reject(resp);
			});

			return deferred.promise;
		};
    }
})();