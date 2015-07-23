(function(){
    angular.module('drinks')
        .service('DrinkService', ['$q', '$http', DrinkService]);

    function DrinkService($q, $http)
    {
        this.make = function(drink){
            var deferred = $q.defer();

            $http.post('/robot/make', drink).then(function(){
                deferred.resolve();
            }, function(resp){
                deferred.reject(resp);
            });

            return deferred.promise;
        };
    }
})();