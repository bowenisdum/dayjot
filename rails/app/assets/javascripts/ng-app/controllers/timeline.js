angular.module('mainApp')
.controller('TimelineCtrl', ["$scope", "Auth", "Entries", "$state", "$sce", function ($scope, Auth, Entries, $state, $sce) {
	$scope.selectedMonth = null;

	$scope.jwplayerOptions = {
		width: "100%",
      	aspectratio: "3:2",
   		title: 'Basic Video Embed',
   		type: 'mp4'
	};

	$scope.getVideoUrl = function(entry) {
		// var url = 'rtmp://s3rxipmtanmkg.cloudfront.net/cfx/st/mp4:' + entry.video_file_name;
		var url = 'https://d1lpzmvldrffat.cloudfront.net/' + entry.video_file_name;
		return $sce.trustAsResourceUrl(url);
	};

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