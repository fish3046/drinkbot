(function() {
	'use strict';

	angular.module('common')
		.factory('common.HttpInterceptors', ['$q', '$window', '$location', HttpInterceptors]);

	function HttpInterceptors($q, $window, $location)
	{
		return {
			request: function(config)
			{
				// Add X-Request-With to all $http requests
				config.headers['X-Requested-With'] = 'XMLHttpRequest';

				return config;
			}
			/*,

			 responseError: function(rejection)
			 {
			 // If HTTP status is 401, that means we need to login
			 if (rejection.status == 401) {

			 //TODO: Need to completely reload page if this happens during ajax call to clear desktop state
			 // If we want to do angular route change instead of hard refresh, we need to clear state by sending
			 // a notification from here to DesktopController to do the route change
			 $window.location.href = '/';

			 //$location.path('/signup/login');
			 }
			 // On 403 (access denied) && the response is text (not json)
			 else if ((rejection.status == 403 || rejection.status == 404) && typeof(rejection.data) == 'string') {
			 // On $location.path() access denied, this will cause it to display what the server
			 // gives us.  $q.reject() will not show anything to the user.
			 return rejection;
			 }

			 return $q.reject(rejection);
			 }*/
		};
	}
}());