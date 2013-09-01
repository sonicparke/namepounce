'use strict';

var app = angular.module('NamePounce', ['ui.bootstrap', 'loader']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider.when('/term', {
    templateUrl: 'partials/term.html',
    controller: 'TermCtrl',
    reloadOnSearch: false
  });
  $routeProvider.when('/pounceit', {
    templateUrl: 'partials/PounceConfig.html',
    controller: 'PounceConfigViewCtrl',
    reloadOnSearch: false
  });
  $routeProvider.otherwise({
    redirectTo: '/',
    controller: 'MainCtrl',
    templateUrl: 'partials/main.html'
  });

}]);
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
app.controller('PounceConfigViewCtrl', function ($scope, $location){

    

    $scope.InitPage = function() {
        $scope.nameQuery = $scope.$parent.nameQuery;
        $scope.userID = $scope.$parent.userID;
        $scope.searching = false;
        $scope.pounceButtonText = "Pounce It!";
        $scope.saving = false;
        $scope.disabled = false;

        var blankform = {
            domainName: $scope.nameQuery.domainName,
            email: "",
            userID: $scope.userID
        }

        $scope.pounceIt = angular.copy(blankform);

        console.log('$scope.nameQuery', $scope.nameQuery);
        console.log('$scope.pounceIt', $scope.pounceIt);

        $scope.showPost = false; // For Dev Only
    };

    $scope.PounceIt = function () {
        $scope.showPost = true; // For Dev Only
    }

});
angular.module("ui.bootstrap.alert", []).directive('alert', function ($timeout) {
  return {
    restrict:'E',
    templateUrl: 'partials/alert.html',
    transclude:true,
    scope:{
      type:'=',
      close:'&',
      autoclose: '=',
      autoclosetime: '='
    },
    link:function (scope, element, attrs) {
      scope.type = scope.type || 'info';

      scope.timedDismiss = function (index) {
          $timeout(function () {
            scope.close();
          }, scope.autoclosetime);
        };

      if(scope.autoclose === true){
        scope.timedDismiss();
      }

      scope.dismiss = function () {
        scope.close();
      };
    }
  };
});

// Example DOM Element with View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert($index)">{{alert.msg}}<a ng-show="alert.url.length > 0" class="btn btn-mini btn-primary pull-right" href="{{alert.url}}" target="_blank">View File</a></alert>

// Example DOM Element without View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert($index)">{{alert.msg}}</alert>

// Setup Alerts in controller
// $scope.alerts = [];
// $scope.closeAlert = function (index) {
//     $scope.alerts.splice(index, 1);
// };

// Push Alert from controller
// $scope.alerts.push({msg: "Please enter End Date", type:'error', autoclose: true, autoclosetime: 3000});
angular.module('loader', [])
    .directive('ngLoader', function () {
        return{
            restrict: 'E,A',
            template: '<div ng-show="showLoader" class="ngLoader"><img src="http://axccdn.harsco.com/cdn/images/loading-spinner-24_whitebg.gif" /></div>'
        };
    });
////////// Get Data //////////
// app.factory('JobData', function($http) {
//   // JobData is a class which we can use for retrieving and
//   // updating data on the server
//   var JobData = function(data) {
//     angular.extend(this, data);
//     // console.log('service data:', data);
//   };

//   // var WCFServer = 'axcapps.harsco.com';
//   var WCFServer = 'AXCUSCATLTRRIE1';
//   // var WCFServer = 'AXCUSCATLTLTHOM';

//   // a static method to retrieve JobData
//   JobData.get = function(data) {
//     return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetData').then(function(response) {
//       return new JobData(response.data);
//     });
//   };

//   JobData.getTest = function(data) {
//     return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/TestData').then(function(response) {
//       return new JobData(response.data);
//     });
//   };

//   JobData.JSONWebService = function(data) {
//     return $http.get('http://' + WCFServer + '/JSONWebService/Service1.svc/GetAllCustomers').then(function(response) {
//       return new JobData(response.data);
//     });
//   };

//   JobData.post = function(data) {
//     return $http.post('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetAllFiles', data).then(function(response) {
//       return new JobData(response.data);
//     });
//   };

//   // FROM CAPACITY PLANNING:
//   JobData.GetDataCP = function(data) {
//     return $http.post('http://' + WCFServer + '/CapacityPlanningWCF/Service1.svc/GetAllFiles', data).then(function(response) {
//       return new JobData(response.data);
//     });
//   };

//   JobData.GetAllFilesGet = function(data) {
//     return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetAllFilesGet').then(function(response) {
//       return new JobData(response.data);
//     });
//   };

//   return JobData;
// });