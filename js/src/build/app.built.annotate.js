'use strict';
var app = angular.module('NamePounce', [
    'ui.bootstrap',
    'loader'
  ]);
app.config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/term', {
      templateUrl: 'partials/term.html',
      controller: 'TermCtrl',
      reloadOnSearch: false
    });
    $routeProvider.otherwise({
      redirectTo: '/',
      controller: 'MainCtrl',
      templateUrl: 'partials/main.html'
    });
  }
]);
app.controller('MainCtrl', [
  '$scope',
  '$location',
  '$http',
  '$timeout',
  'JobData',
  function ($scope, $location, $http, $timeout, JobData) {
    $scope.InitPage = function () {
      $scope.PageTitle = 'Job Print';
      $scope.GetDataItems = [];
      $scope.UserID = 'brad';
      $scope.searching = false;
      $scope.searchButtonText = 'Check Availability';
      $scope.saving = false;
    };
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.searchForName = function () {
      $scope.CheckAvailability();
    };
    $scope.CheckAvailability = function (data) {
      $scope.searchButtonText = 'Checking';
      $scope.searching = true;
      $scope.disabled = true;
      $scope.alerts.length = 0;
      $scope.alerts.push({
        msg: 'Checked',
        type: 'success',
        autoclose: true,
        autoclosetime: 3000
      });
    };
  }
]);
angular.module('ui.bootstrap.alert', []).directive('alert', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'partials/alert.html',
      transclude: true,
      scope: {
        type: '=',
        close: '&',
        autoclose: '=',
        autoclosetime: '='
      },
      link: function (scope, element, attrs) {
        scope.type = scope.type || 'info';
        scope.timedDismiss = function (index) {
          $timeout(function () {
            scope.close();
          }, scope.autoclosetime);
        };
        if (scope.autoclose === true) {
          scope.timedDismiss();
        }
        scope.dismiss = function () {
          scope.close();
        };
      }
    };
  }
]);
angular.module('loader', []).directive('ngLoader', function () {
  return {
    restrict: 'E,A',
    template: '<div ng-show="showLoader" class="ngLoader"><img src="http://axccdn.harsco.com/cdn/images/loading-spinner-24_whitebg.gif" /></div>'
  };
});
app.factory('JobData', [
  '$http',
  function ($http) {
    var JobData = function (data) {
      angular.extend(this, data);
    };
    var WCFServer = 'AXCUSCATLTRRIE1';
    JobData.get = function (data) {
      return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetData').then(function (response) {
        return new JobData(response.data);
      });
    };
    JobData.getTest = function (data) {
      return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/TestData').then(function (response) {
        return new JobData(response.data);
      });
    };
    JobData.JSONWebService = function (data) {
      return $http.get('http://' + WCFServer + '/JSONWebService/Service1.svc/GetAllCustomers').then(function (response) {
        return new JobData(response.data);
      });
    };
    JobData.post = function (data) {
      return $http.post('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetAllFiles', data).then(function (response) {
        return new JobData(response.data);
      });
    };
    JobData.GetDataCP = function (data) {
      return $http.post('http://' + WCFServer + '/CapacityPlanningWCF/Service1.svc/GetAllFiles', data).then(function (response) {
        return new JobData(response.data);
      });
    };
    JobData.GetAllFilesGet = function (data) {
      return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetAllFilesGet').then(function (response) {
        return new JobData(response.data);
      });
    };
    return JobData;
  }
]);