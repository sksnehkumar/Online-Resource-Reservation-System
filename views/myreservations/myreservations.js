//Controller for My Reservations View
app
.controller('MyCtrl', function ($scope, $http, $state, $rootScope, $ionicPopup, $ionicActionSheet, $cookieStore, $location) {
    
    //Intialise $scope variables
    {
        $scope.shown = [];
        $scope.userid = $rootScope.globals.currentUser.username;
        $scope.search = { purpose: '', resource: '', hidden: '' };
        $scope.date = { dateSD: '', dateED: '' };
    }

    //Fetch resources' and reservations' data from JSON files
    {
        $http.post('views/myreservations/fetch_bookings.php', {'user': $scope.userid}).success(function (data, status, headers, config) {
            $scope.bookings = data;
            for (i = 0; i < $scope.bookings.length; i++) {
                $scope.shown[i] = true;
            }
        });

        $http.post('views/myreservations/fetch_res.php').success(function (data, status, headers, config) {
            $scope.resources = data;
        });
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
                }

            }
        };
    }

    //Clear Filters function
    $scope.cf = function () {
        
        $scope.search.purpose = '';
        $scope.search.resource = '';
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

                //Logout Action
                if ($rootScope.globals.currentUser) {
                    $scope.search = { resource: '', purpose: '' };
                    $scope.date = { dateED: '', dateSD: '' };
                    $scope.userid = $rootScope.globals.currentUser.username;
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

    //Define Delete Reservation function
    $scope.delete = function (index) {
       
        //Confirm deletion
        $ionicPopup.show({
            template: '<p style="text-align:center">Do you want to cancel this reservation?</p>',
            title: 'Confirm Delete',
            scope: $scope,
            buttons: [
                    {
                        text: '<b>Yes</b>',
                        type: 'button-assertive',
                        onTap: function () {

                            //Delete Reservation
                            {
                                $scope.shown[index] = false;
                                var obj = {
                                    "startdate": $scope.bookings[index].startdate,
                                    "starttime": $scope.bookings[index].starttime,
                                    "enddate": $scope.bookings[index].enddate,
                                    "endtime": $scope.bookings[index].endtime,
                                    "resource": $scope.bookings[index].resource
                                };

                                $http.post('views/myreservations/delete.php', JSON.stringify(obj))
                                .success(function (data) {
									if(data == 'failed')
									{
										$ionicPopup.alert({
										title: 'Error',
										template: '<p style="text-align:center">The reservation could not be cancelled.</p>'
										});
									}
									else
									{
										$ionicPopup.alert({
										title: 'Deleted',
										template: '<p style="text-align:center">The reservation has been cancelled.</p>'
									});
									}
                                    
                                })
                                .error(function () {
                                    $ionicPopup.alert({
                                    title: 'Error',
                                    template: '<p style="text-align:center">The reservation could not be cancelled.</p>'
                                });
                                })

                                
                            }
                        }
                    },
            {
                text: 'No',
                type: 'button-positive'
            }

            ]
        })
    };

    $scope.deletable = function (index) {
        if ((new Date($scope.bookings[index].startdate) > (new Date())))
            return true;
		else
            return false;
    };
})


