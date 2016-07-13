angular.module('mainApp')
.factory('authTokenInjector', ['localStorageService', function(localStorageService) {  
    var authTokenInjector = {
        request: function(config) {

    		var AuthorizationHeader = localStorageService.get("AuthorizationHeader");

            if (AuthorizationHeader) {
                config.headers['Authorization'] = AuthorizationHeader;
            }
            return config;
        }
    };
    return authTokenInjector;
}]);