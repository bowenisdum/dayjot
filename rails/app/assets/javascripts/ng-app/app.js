angular
.module('mainApp', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'templates',
    'LocalStorageModule',
    'ng-jwplayer'
])
.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "localStorageServiceProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {

    // Prefix for local storage
    localStorageServiceProvider
        .setPrefix('vidjou');

    $httpProvider.defaults.headers.delete = { 'Content-Type' : 'application/json' };

    $httpProvider.interceptors.push('authTokenInjector');
    $httpProvider.interceptors.push('notModifiedInterceptor');

	/**
     * Routes and States
     */
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeCtrl',
        resolve: {
            loggedIn: ["Auth", function(Auth){
                return Auth.loggedIn();
            }]
        }
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'signup.html',
        controller: 'SignupCtrl'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
    })
    .state('dashboard', {
        abstract: true,
        url: '/dashboard',
        templateUrl: 'dashboard/layout.html'
    })
    // the default route when someone hits dashboard
    .state('dashboard.timeline', {
        url: '',
        templateUrl: 'dashboard/timeline.html'
    })
    // this is /dashboard/two
    .state('dashboard.new', {
        url: '/new',
        templateUrl: 'dashboard/new.html',
        controller: 'NewCtrl'
    })
    // this is /dashboard/two
    .state('dashboard.subscription', {
        url: '/subscription',
        templateUrl: 'dashboard/subscription.html'
    });

    // default fall back route
    $urlRouterProvider.otherwise('/');

    // enable HTML5 Mode for SEO
    $locationProvider.html5Mode(true);
}]).run(["$rootScope", "Auth", "$state", "$http", function($rootScope, Auth, $state, $http) {

    var publicStates = [
        'home',
        'signup',
        'login'
    ];

    $rootScope.$on('$stateChangeStart', function (event, toState) {      
     if (_.contains(publicStates, toState.name) && Auth.loggedIn()) {              
        event.preventDefault();   // Prevent migration to default state                  
        $state.go('dashboard.timeline');           
      } else if (!_.contains(publicStates, toState.name) && !Auth.loggedIn()) {
        event.preventDefault();   // Prevent migration to default state                  
        $state.go('home');    
      }
    });
}]);
