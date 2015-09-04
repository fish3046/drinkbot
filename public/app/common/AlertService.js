(function() {
	'use strict';

	/**
	 * Manages alerts to be displayed at the top of the screen.  ui.bootstrap dependency needs to be
	 * injected in module
	 */
	angular.module('common')
		.service('common.AlertService', ['$sce', AlertService]);

	function AlertService($sce)
	{
		this.alerts = [];

		/**
		 * Allowed alert types
		 *
		 * @type {Array}
		 */
		this.types = ['success','info','warning','danger'];

		this.getAlerts = function() {
			return this.alerts;
		};


		/**
		 * Show an alert
		 *
		 * @param {string} type
		 * @param {string} msg
		 * @param {number} ttl  0 means no timeout
		 */
		this.addAlert = function(type, msg, ttl)
		{
			// Make sure the type is valid
			if (this.types.indexOf(type) == -1) {
				throw "Invalid alert type " + type;
			}

			// Ensure we have a time to live for this box.
			if (typeof(ttl) == 'undefined') {
				ttl = 9000;
			}

			this.alerts.push({
				type: type,
				msg: $sce.trustAsHtml(msg),
				timeout: ttl
			});
		};

		this.success = function(msg, ttl)
		{
			this.addAlert('success', msg, ttl);
		};

		this.info = function(msg, ttl)
		{
			this.addAlert('info', msg, ttl);
		};

		this.warning = function(msg, ttl)
		{
			this.addAlert('warning', msg, ttl);
		};

		this.danger = function(msg, ttl)
		{
			this.addAlert('danger', msg, ttl);
		};

		this.error = function(msg, ttl)
		{
			this.addAlert('danger', msg, ttl);
		};

		/**
		 * Add multiple messages at once
		 *
		 * @param alertType
		 * @param msgArray
		 * @param ttl
		 */
		this.showAlerts = function (alertType, msgArray, ttl)
		{
			var msg = "";
			angular.forEach(msgArray, function (v, k) {
				msg = msg + v + "<br>";
			});

			if(alertType == "error"){
				this.error(msg, ttl);
			}else if(alertType == "warning"){
				this.warning(msg, ttl);
			}else if(alertType == "info"){
				this.error(msg, ttl);
			}else if(alertType == "danger"){
				this.error(msg, ttl);
			}else if(alertType == "success"){
				this.error(msg, ttl);
			}
		};


		/**
		 * Delete an entry from the main alerts array by its index within the array
		 *
		 * @param {number} index
		 */
		this.closeAlert = function(index)
		{
			this.alerts.splice(index, 1);
		};
	}
}());