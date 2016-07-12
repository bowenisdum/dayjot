angular.module('mainApp')
.controller('TimelineCtrl', ["$scope", "Auth", "Entries", "$state", function ($scope, Auth, Entries, $state) {
	$scope.selectedMonth = null;

	$scope.allEntries = function() {
		return Entries.allEntries();
	};

	$scope.latestMonth = function() {
		return Entries.latestMonth();
	};

	$scope.selectMonth = function(month) {
		$state.go("dashboard.timeline");
		$scope.selectedMonth = month;
	};

	var initialize = function(response) {
		$scope.selectedMonth = $scope.latestMonth();
	};

	Entries.getAll().then(initialize);
}]);