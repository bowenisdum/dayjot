angular.module('mainApp')
.factory('authTokenInjector', ['localStorageService', function(localStorageService) {  
    var authTokenInjector = {
        request: function(config) {

    		let AuthorizationHeader = localStorageService.get("AuthorizationHeader");

            if (AuthorizationHeader) {
                config.headers['Authorization'] = AuthorizationHeader;
            }
            return config;
        }
    };
    return authTokenInjector;
}]);