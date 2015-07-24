(function ()	{
	angular.module('drinks')
		.factory('drinks.resource.DrinkResource', ['$resource', DrinkResource]);

	function DrinkResource($resource)
	{
		return $resource('/db/drink/:id', {id: '@id'},
			{
				'update': {method: 'PUT', params: {id: '@id'}}
			}
		);
	}
})();