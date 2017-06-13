
app
.config(function ($stateProvider, $httpProvider, $urlRouterProvider, $ionicConfigProvider) {
    
    $stateProvider
    .state('app', {
        url: '/app',
        abstratct: true,
        templateUrl: 'views/menu/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.myreservations', {
        url: '/myreservations',
        views: {
            'menuContent': {
                templateUrl: 'views/myreservations/myreservations.html',
                controller: 'MyCtrl'
            },
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'views/login/login.html',
                controller: 'LoginCtrl'
            }
        }
    })


    

    .state('app.reserve', {
        url: '/reserve',
        views: {
            'menuContent': {
                templateUrl: 'views/reserve/reserve.html',
                controller: 'ReserveCtrl'
            }
        }
    })

    .state('app.lookup', {
        url: '/lookup',
        views: {
            'menuContent': {
                templateUrl: 'views/lookup/lookup.html',
                controller: 'LookupCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
})


.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // Keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // Redirect to login page if not logged in
            if ($location.path() !== '/app/login' && !$rootScope.globals.currentUser) {
                $location.path('/app/login');
            }
        });
		
    }]);
