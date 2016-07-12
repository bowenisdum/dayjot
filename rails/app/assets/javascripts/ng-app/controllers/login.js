angular.module('mainApp')
.controller('LoginCtrl', ["$scope", "Auth", "$state", "$location", function ($scope, Auth, $state, $location) {
	$scope.formData = {
		user: {
			email: "",
			password: ""
		}
	};

	$scope.submit = function($event) {
 		event.preventDefault();
		event.stopPropagation();
		console.log("logging in");
		console.log($scope.formData);
		Auth.login($scope.formData).then(redirectToDashboard);
	};

	var redirectToDashboard = function(response) {
		$location.url('/dashboard');
	};
}]);