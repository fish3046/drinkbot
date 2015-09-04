(function (){
	'use strict';

	/**
	 * Code heavily borrowed from ngClick directive in angular, this shortcuts
	 * the process of linking to a page from within a template.  This navigates
	 * to the angular route specified
	 *
	 * <a ng-href="" nav="/dashboard">click me</a>
	 * goes to
	 * domain.com/#!/dashboard
	 */
	angular.module('common.directives')
		.directive('nav', ['drinks.service.LocationService', function (LocationService)
		{
			return {
				restrict: 'A',
				compile: function ($element, attr)
				{
					return function navEventHandler(scope, element)
					{
						element.on('click', function (event)
						{
							var callback = function ()
							{
								LocationService.go(attr['nav']);
							};
							scope.$apply(callback);
						});
					};
				}
			};
		}]);
}());