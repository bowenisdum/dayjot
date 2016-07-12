angular.module('mainApp')
.factory('Auth', ["$http", "localStorageService", "$location", function ($http, localStorageService, $location) {
	
	var loginCallback = function(response) {
		let AuthorizationHeader = 'Token user_token="' + response.data.authentication_token + '", user_email="' + response.data.email + '"';
		$http.defaults.headers.common['Authorization'] = AuthorizationHeader;
		localStorageService.set("AuthorizationHeader", AuthorizationHeader);
		localStorageService.set("CurrentUser", response.data);
	};

	var signupCallback = function(response) {
		loginCallback(response);
		$location.url('/dashboard');
	};

	var logoutCallback = function(response) {
		localStorageService.remove("AuthorizationHeader");
		localStorageService.remove("CurrentUser");
		$location.url('/');
	};

	var AuthInstance = {
		currentUser: function() {
			return localStorageService.get("CurrentUser");
		},
		loggedIn: function(data) {
			let AuthorizationHeader =  localStorageService.get("AuthorizationHeader");
			if (AuthorizationHeader) {
				return true;
			} else {
				return false;
			}
		},
		signup: function(data) {
			return $http.post("/users", data).then(signupCallback);
		},
		login: function(data) {
			return $http.post("/users/sign_in", data).then(loginCallback);
		},
		logout: function(data) {
			return $http.delete("/users/sign_out").then(logoutCallback);
		},
		forgotPassword: function(data) {
			return $http.post("/start_password_reset", data);
		},
		resetPassword: function(data) {
			return $http.put("/finish_password_reset", data);
		}
	};

	// factory function body that constructs shinyNewServiceInstance
	return AuthInstance;
}]);