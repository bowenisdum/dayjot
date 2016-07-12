angular.module('mainApp')
.factory('Subscription', ["$http", "Auth", "localStorageService", function ($http, Auth, localStorageService) {

	var updateCallback = function(response) {
		localStorageService.set("CurrentUser", response.data);
	};

	var cancelCallback = function(response) {
		localStorageService.set("CurrentUser", response.data);
	};

	var SubscriptionInstance = {
		active: function() {
			return Auth.currentUser().plan_status == "active";
		},
		update: function(data) {
			return $http.post("/update_plan", data).then(updateCallback);
		},
		cancel: function(data) {
			return $http.post("/cancel_plan").then(cancelCallback);
		}
	};

	// factory function body that constructs shinyNewServiceInstance
	return SubscriptionInstance;
}]);