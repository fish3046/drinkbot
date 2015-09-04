(function (){
	'use strict';

	/**
	 * Allows you to use angular directives in bound html
	 *
	 * Instead of <div ng-bind-html="ctrl.htmldata"/>
	 * You can    <div compile-html="ctrl.htmldata"/>
	 */
	angular.module('common.directives')
		.directive("compileHtml", function ($parse, $sce, $compile)
		{
			return {
				restrict: "A",
				link: function (scope, element, attributes)
				{
					var expression = $sce.parseAsHtml(attributes.compileHtml);

					var getResult = function ()
					{
						return expression(scope);
					};

					scope.$watch(getResult, function (newValue)
					{
						//var linker = $compile(newValue);
						//element.html(linker(scope));

						// Clear out whatever is in the element, because I have not found a way to use anything but
						// appendTo on the next line.
						$(element).html('');
						var result = $(newValue).appendTo(element);
						$compile(result)(scope);
					});
				}
			}
		});
}());