
//Controller for Reserve View
app
.controller('ReserveCtrl', function ($scope, $ionicPopup, $http, $ionicActionSheet, $state, $rootScope, $cookieStore, $location) {

    //Fetch list of resources from JSON file
		$http.post('views/reserve/fetch_bookings.php').success(function (data, status, headers, config) {
			$scope.bookings = data;
        });

        $http.post('views/reserve/fetch_res.php').success(function (data, status, headers, config) {
            $scope.resources = data;
        });

    //Initialise $scope variables
    {
        $scope.reserve = { resource: '', purpose: '', strength: '', remarks: ''};
        $scope.datepicker = { dateSD: '', dateED: '' };
        $scope.timepicker = { timeST: '', timeET: '' };
        $scope.sDate = new Date();
        $scope.eDate = new Date();
        $scope.error = [false, false];
    }

    //Define datePicker and timePicker Properties and Function
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
                    $scope.datepicker.dateSD = val.format("mm/dd/yyyy")

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
                    $scope.datepicker.dateED = val.format("mm/dd/yyyy")

                    //console.log('Selected date is : ', val)
                }

            }
        };
        $scope.timePickerStartTime = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60),
            step: 1,
            format: 24,  //Optional
            titleLabel: 'Start Time',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                $scope.sTime = val;
                if (typeof (val) === 'undefined') {
                    console.log('Time not selected');
                } else {
                    $scope.timePickerStartTime.inputEpochTime = val;
                    $scope.timepicker.timeST = epochParser(val);
                }
            }
        };
        $scope.timePickerEndTime = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60),
            step: 1,
            format: 24,  //Optional
            titleLabel: 'Start Time',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                $scope.eTime = val;
                if (typeof (val) === 'undefined') {
                    console.log('Time not selected');
                } else {
                    $scope.timePickerEndTime.inputEpochTime = val;
                    $scope.timepicker.timeET = epochParser(val);
                }
            }
        };
        function prependZero(param) {
            if (String(param).length < 2) {
                return "0" + String(param);
            }
            return param;
        };
        function epochParser(val, opType) {
            if (val === null) {
                return '00:00';
            } else {
                var meridian = ['AM', 'PM'];

                if (opType === 'time') {
                    var hours = parseInt(val / 3600);
                    var minutes = (val / 60) % 60;
                    var hoursRes = hours > 12 ? (hours - 12) : hours;

                    var currentMeridian = meridian[parseInt(hours / 12)];

                    return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
                }
                else {
                    var hours = parseInt(val / 3600);
                    var minutes = (val / 60) % 60;
                    return prependZero(hours) + ":" + prependZero(minutes);
                }
            }
        };
    }
    

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

                    $scope.reserve = { resource: '', purpose: '', strength: '', remarks: '' };
                    $scope.datepicker = { dateED: '', dateSD: '' };
                    $scope.timepicker = { timeET: '', timeST: '' };
                     
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

    //Define reset button action
    $scope.reset = function () {
        $scope.reserve.purpose = '';
        $scope.reserve.resource = '';
        $scope.reserve.remarks = '';
        $scope.reserve.strength = '';
        $scope.datepicker.dateED = '';
        $scope.datepicker.dateSD = '';
        $scope.timepicker.timeST = '';
        $scope.timepicker.timeET = '';
    }
    
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


    //Define makeReservation function
    $scope.makeReservation = function () {

        //Check for incorrect entries
        if (isNaN($scope.reserve.strength))
            $scope.error[0] = true;
        if ($scope.eDate < $scope.sDate || $scope.sDate <= (new Date())) {
            $scope.error[1] = true;
        }
        if ($scope.eTime <= $scope.sTime) {
                $scope.error[1] = true;
        }
        if ($scope.error[0] || $scope.error[1]) {
            $scope.showPopup();
            return;
        }
        

        //Data to be saved
        var obj = {
            "startdate": $scope.datepicker.dateSD,
            "starttime": $scope.timepicker.timeST,
            "enddate": $scope.datepicker.dateED,
            "endtime": $scope.timepicker.timeET,
            "pno": $rootScope.globals.currentUser.username,
            "purpose": $scope.reserve.purpose,
            "strength": $scope.reserve.strength,
            "resource": $scope.reserve.resource.rname
        };

        //Confirm Reservation
        $ionicPopup.show({
            template: '<p style="text-align:center">Do you want to make this reservation?</p>',
            title: 'Confirm Reservation',
            scope: $scope,
            buttons: [
                    {
                        text: '<b>Yes</b>',
                        type: 'button-balanced',
                        onTap: function () {
                            $http.post('views/reserve/save.php', JSON.stringify(obj))
								.success(function (data) {
									if(data != '')
									{
										$ionicPopup.alert({
										title: 'Error',
										template: '<p style="text-align:center">The reservation could not be made.</p>'
										});
									}
									else
									{
										$ionicPopup.alert({
											title: 'Saved',
											template: '<p style="text-align:center">The reservation has been made.</p>'
										});
									}
                                    
                                })
                                .error(function (status) {
                                    $ionicPopup.alert({
										title: 'Error',
										template: '<p style="text-align:center">The reservation could not be made.</p>'
										});
                                })
                            

                            $scope.reset();
                    }},
            {
                text: 'No',
                type: 'button-assertive'
            }

            ]
        })
    };

    //Show Popup on incorrect entry
    $scope.showPopup = function () {
        var err = '';
        if ($scope.error[0]) {
            err = err + ' ' + 'Strength must be a valid number.';
        }
        if ($scope.error[1]) {
            err = err + ' ' + 'Incorrect Date or Timing selected.';
        }
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: '<p style="text-align:center">' + err + '</p>'
        });
        $scope.error[0] = $scope.error[1] = false;

    };

    $scope.deletable = function (index) {
        if ((new Date($scope.bookings[index].startdate) > (new Date())))
            return true;
        else
            return false;
    };
});
