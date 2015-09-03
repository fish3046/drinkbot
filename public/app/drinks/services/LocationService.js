(function(){
	angular.module('drinks')
		.service('drinks.service.LocationService', ['$location', LocationService]);

	function LocationService($location)
	{
		this.go = function(url)
		{
			$location.path(url);
		};
	}
})();