(function (){
	angular.module('drinks')
		.factory('Ingredient', ['$resource', Ingredient]);

	function Ingredient($resource)
	{
		return $resource('/db/ingredient/:id', {id: '@id'},
			{
				update: {method: 'PUT', params: {id: '@id'}}
			}
		);
	}
})();