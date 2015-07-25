(function() {
	'use strict';

	angular.module('drinks')
		.controller('drinks.controller.DesktopController', ['drinks.service.LocationService', DesktopController]);

	function DesktopController(LocationService)
	{
		/**
		 * Wrapper for LocationService, to make it easier in views.
		 *
		 * @param url
		 */
		this.go = function(url)
		{
			LocationService.go(url);
		};
	}
}());