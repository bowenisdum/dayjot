angular.module('mainApp')
.factory('notModifiedInterceptor', ["$q", function ($q) {
    return {

        'responseError': function (rejection) {
            if (rejection.status === 304)  return $q.resolve(rejection);
            return $q.reject(rejection);
        }
    };
}]);