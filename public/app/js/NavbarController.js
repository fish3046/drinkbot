(function() {
	'use strict';

	angular.module('drinks')
		.controller('drinks.controller.NavbarController', ['drinks.service.LocationService', NavbarController]);

	function NavbarController(LocationService)
	{
		this.go = function(url)
		{
			LocationService.go(url);
		};
	}
}());