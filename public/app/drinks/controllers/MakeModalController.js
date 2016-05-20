(function() {
	'use strict';

	angular.module('drinks')
		.controller('drinks.controller.MakeModalController', ['$uibModalInstance', '$interval', 'duration', MakeModalController]);

	function MakeModalController($uibModalInstance, $interval, duration)
	{
		/**
		 * Let the pumps stop
		 *
		 * @type {number}
		 */
		var durationPadding = 1000;
		var modalShowTime = duration + durationPadding;

		var startTime = Date.now();

		// For use in progress bar
		this.progressMax = duration;
		this.progressCurrent = 0;
		var self = this;

		// When the drink duration has been reached, close this dialog
		var interval = $interval(function(){
			var elapsed = Date.now() - startTime;
			self.progressCurrent = elapsed;

			if (elapsed >= modalShowTime) {
				$interval.cancel(interval);
				$uibModalInstance.close();
			}
		}, 1000);
	}
}());