angular.module('mainApp')
.controller('NavCtrl', ["$scope", "Auth", "$state", function ($scope, Auth, $state) {

	$scope.currentState = function() {
		return $state.current.name;
	};

	$scope.logout = function() {
		Auth.logout();
	};

	$scope.loggedIn = function() {
		return Auth.loggedIn();
	};
}]);