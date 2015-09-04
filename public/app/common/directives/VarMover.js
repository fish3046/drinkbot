/**
 * Avenue for getting PHP view variables into an angular controller
 *
 * Usage:
 * <var-mover value="'<?= $phpVar ?>'" ng-model="ctrl.guid"></var-mover>
 */
(function (){
	'use strict';

	angular.module('common.directives')
		.directive('varMover', [VarMover]);

	function VarMover()
	{
		return {
			restrict: 'EA',
			scope: {
				value: '='
			},
			require: 'ngModel',
			transclude: false,
			replace: false,
			link: function (scope, el, attrs, ngModelCtrl)
			{
				// Move the "value" attribute into ngModel
				ngModelCtrl.$setViewValue(scope.value);
			}
		};
	}
}());