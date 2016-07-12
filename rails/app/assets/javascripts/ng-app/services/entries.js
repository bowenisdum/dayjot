angular.module('mainApp')
.factory('Entries', ["$http", function ($http) {

	var entryMonthes = [];
	var latestMonth = null;
	var entriesRaw = [];
	var allEntries = {};

	var dateToMonth = function(dateStr) {
		return dateStr.substring(0, dateStr.length - 3);
	};

	var updateEntries = function() {
		allEntries = {};
		_.each(entriesRaw, function(entry){
			entryMonth = dateToMonth(entry.entry_date);
			if (allEntries[entryMonth] === undefined) {
				allEntries[entryMonth] = [];
				entryMonthes.push(entryMonth);
			}

			allEntries[entryMonth].push(entry);
		});
		latestMonth = entryMonthes[0];
	};

	var getAllCallback = function(response) {
		entriesRaw = response.data;
		updateEntries();
	};

	var createCallback = function(response) {
		entriesRaw.push(response.data);
		updateEntries();
	};

	var EntriesInstance = {
		allEntries: function() {
			return allEntries;
		},
		latestMonth: function() {
			return latestMonth;
		},
		entryMonthes: function() {
			return entryMonthes;
		},
		getAll: function(data) {
			return $http.get("/entries").then(getAllCallback);
			// .catch(function(resp){
			//     if(resp.status !== 304){ $q.reject(resp) }
			//     return resp;   // response 
			// });
		},
		create: function(data) {
			return $http.post("/entries", data).then(createCallback);
		}
	};

	// factory function body that constructs shinyNewServiceInstance
	return EntriesInstance;
}]);