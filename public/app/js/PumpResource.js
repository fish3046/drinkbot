(function (){
	angular.module('drinks')
		.factory('drinks.resource.PumpResource', ['$resource', Pump]);

	function Pump($resource)
	{
		return $resource('/db/pump/:id', {id: '@id'},
			{
				'update': {method: 'PUT', params: {id: '@id'}}
			}
		);
	}
})();