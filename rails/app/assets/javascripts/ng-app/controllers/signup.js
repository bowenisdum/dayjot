angular.module('mainApp')
.controller('SignupCtrl', ["$scope", "Auth", function ($scope, Auth) {

	$scope.form = {
		user: {
			password: "",
			password_confirmation: "",
			email: ""
		}
	};

 	$scope.submit = function(event) {
 		event.preventDefault();
		event.stopPropagation();
		console.log("signing up");
		console.log($scope.form);
		Auth.signup($scope.form);
 	};
}]);