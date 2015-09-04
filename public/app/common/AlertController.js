(function() {
	'use strict';

	angular.module('common')
		.controller('common.AlertController', ['$scope', 'common.AlertService', AlertController]);

	function AlertController($scope, AlertService)
	{
		$scope.alerts = AlertService.getAlerts();

		$scope.closeAlert = function(index)
		{
			AlertService.closeAlert(index);
		};
	}
}());

