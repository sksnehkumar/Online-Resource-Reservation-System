//Service for User Authentication
app
.factory('AuthenticationService',
    function ($http, $cookieStore, $rootScope, $timeout) {

        //Declare servics
        var service = {};

        //Define Login action
        service.Login = function (username, password, callback) {

            //Set default response to false
            var response = { success: false };

            //Verify user credentials
			$http.post('views/login/auth.php', {'user':username, 'pass': password})
			.success(function(data, status, headers, config){
				if(data != '')
				{
					response.success = true;
					name = data;
				}
				callback(response);
			})
			
            
        };

        //Store user credentials in cookie
        service.SetCredentials = function (username, password) {

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    name: name,
                    password: password
                }
            };

            $cookieStore.put('globals', $rootScope.globals);
        };

        //Clear user credentials and remove cookie
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        };

        return service;
    })

//Controller for Login view
.controller('LoginCtrl', function ($scope, $state, $ionicModal, $ionicPopup, $rootScope, $http, AuthenticationService) {

    //Inialise $scope variables
    $scope.user = { username: '', password: '', name: '' };

    //Clear user credentials on startup
    AuthenticationService.ClearCredentials();
    
    //Login function
    $scope.login = function () {
        
        //Authenticate credentials
        AuthenticationService.Login($scope.user.username, $scope.user.password, function (response) {

            if (response.success) {
                //Store user credentials
                AuthenticationService.SetCredentials($scope.user.username, $scope.user.password);
                $scope.user.name = $rootScope.globals.currentUser.name;

                //Show welcome message
                $scope.openModal();
            } else {
                //Incorrect credentials
                $scope.showPopup();
                
            }
        });
    };

    //Popup for incorrect user credentials
    $scope.showPopup = function () {
        $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p style="text-align:center">Incorrect Personal No. or Password !</p>'
        });

        
    };


    
    //Define action for change of view
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        $scope.user.username='';
        $scope.user.password='';
    });

    //Show welcome message in $ionicModal
    {
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
            $state.go('app.myreservations');
        }

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
    }
});
