//Controller for Lookup Reservations View
app
.controller('LookupCtrl', function ($scope, $http, $ionicActionSheet, $rootScope, $cookieStore, $ionicPopup, $state,$location) {

    //Fetch reservations', resources' and users' data from JSON files
    {
        $http.post('views/lookup/fetch_bookings.php').success(function (data) {
            $scope.bookings = data;
        });

        $http.post('views/lookup/fetch_res.php').success(function (data) {
            $scope.resources = data;
        });

    }

    //Initialise $scope variables
    {
        $scope.date = { dateSD: '', dateED: '' };
        $scope.search = { purpose: '', resource: '', pno: '' };
    }

    //Define datePicker Properties and Function
    {
        $scope.datepickerStartDate = {
            titleLabel: 'Start Date',  //Optional
            todayLabel: 'Today',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: 'Set',  //Optional
            setButtonType: 'button-positive',  //Optional
            todayButtonType: 'button-assertive',  //Optional
            closeButtonType: 'button-assertive',  //Optional
            inputDate: new Date(),    //Optional
            mondayFirst: true,    //Optional
            templateType: 'modal', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive',
            from: new Date(),
            callback: function (val) {    //Mandatory
                $scope.sDate = val;
                if (typeof (val) === 'undefined') {
                    console.log('No date selected');
                } else {
                    $scope.date.dateSD = val.format("mm/dd/yyyy")

                    //console.log('Selected date is : ', val)
                }
            }
        };
        $scope.datepickerEndDate = {
            titleLabel: 'End Date',  //Optional
            todayLabel: 'Today',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: 'Set',  //Optional
            setButtonType: 'button-positive',  //Optional
            todayButtonType: 'button-assertive',  //Optional
            closeButtonType: 'button-assertive',  //Optional
            inputDate: new Date(),    //Optional
            mondayFirst: true,    //Optional
            templateType: 'modal', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive',
            from: new Date(),
            callback: function (val) {    //Mandatory
                $scope.eDate = val;
                if (typeof (val) === 'undefined') {
                    console.log('No date selected');
                } else {
                    $scope.date.dateED = val.format("mm/dd/yyyy")

                    //console.log('Selected date is : ', val)
                }

            }
        };
    }
    
    //Clear Filters function
    $scope.cf = function () {
        $scope.search.purpose = '';
        $scope.search.resource = '';
        $scope.search.pno = '';
        $scope.date.dateSD = '';
        $scope.date.dateED = '';
    };

    //Define $actionSheet for viewing profile and logout
    $scope.actionSheet = function () {
        $ionicActionSheet.show({
            buttons: [{
                text: '<i class="icon ion-person"></i><b>' + $rootScope.globals.currentUser.name + '</b>'
            }],
            titleText: 'Logged in as',
            cancelText: 'Cancel',
            destructiveText: 'Logout',
            destructiveButtonClicked: function () {

                //Logout action
                if ($rootScope.globals.currentUser) {

                    $scope.search = { resource: '', purpose: '' };
                    $scope.date = { dateED: '', dateSD: '' };
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    $ionicPopup.alert({
                        title: 'Logout',
                        template: '<p style="text-align:center">You have logged out succesfully.</p>',
                        buttons: [
                                    {
                                        text: 'OK',
                                        type: 'button-positive',
                                        onTap: function () {
                                            $state.go('app.login');
                                    }
                                   },
            
                                ]
                    });
                }
            },
            buttonClicked: function (index) {
                return false;
            }
        });
    };

    //Define action for change of view
    $rootScope.$on('$locationChangeStart', function () {
        if ($location.path() !== '/app/login' && !$cookieStore.get('globals')) {
            $ionicPopup.alert(
                {
                    template: '<p style="text-align:center">You are not logged in !</p>'
                });
            $location.path('/app/login');
        }
    });
});