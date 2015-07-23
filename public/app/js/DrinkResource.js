(function ()	{
	angular.module('drinks')
		.factory('Drink', ['$resource', Drink]);

	function Drink($resource)
	{
		return $resource('/db/drink/:id', {id: '@id'},
			{
				'update': {method: 'PUT', params: {id: '@id'}}
			}
		);
	}
})();