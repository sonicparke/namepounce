app.controller('MainCtrl', function ($scope, $location){

    

    // Initial Functions
    $scope.InitPage = function() {
        $scope.PageTitle = "Name Pounce";
        $scope.GetDataItems = [];
        $scope.userID = "";
        $scope.searching = false;
        $scope.searchButtonText = "Check Availability";
        $scope.saving = false;
        $scope.disabled = false;

        var blankform = {
            domainName: ""
        }

        $scope.nameQuery = angular.copy(blankform);

        $scope.CheckCredentials();
    };

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.CheckCredentials = function() {
        if($scope.userID.length > 0) {
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
    }


    $scope.Login = function (data) {
        console.log('login Creds:', $scope.login);
        $scope.userID = $scope.login.userID;
        $scope.CheckCredentials($scope.userID);
    }

    $scope.Logout = function (data) {
        console.log('logout Creds:', $scope.logout);
        $scope.userID = "";
        $scope.CheckCredentials($scope.userID);
    }

    $scope.CheckAvailability  = function () {
        // Set Buttons and Grid behavior
        $scope.searchButtonText = 'Checking';
        $scope.searching = true;
        $scope.disabled = true;
        $scope.alerts.length = 0;

        if($scope.nameQuery.domainName === "brad.com"){
            $scope.domainAvailable = false; 
            $scope.resetForm();
            $location.path("/pounceit");
        } else {
            $scope.domainAvailable = true;
             $scope.resetForm();
             $scope.alerts.push({msg: "Domain is Available!", type:'success', autoclose: true, autoclosetime: 3000});
        }

        // $scope.alerts.push({msg: "Checked", type:'success', autoclose: true, autoclosetime: 3000});
    };

    $scope.resetForm = function () {
        $scope.searching = false;
        $scope.searchButtonText = "Check Availability";
        $scope.saving = false;
        $scope.disabled = false;
    }


});