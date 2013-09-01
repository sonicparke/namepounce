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
  }
]);
app.controller('MainCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.InitPage = function () {
      $scope.PageTitle = 'Name Pounce';
      $scope.GetDataItems = [];
      $scope.userID = '';
      $scope.searching = false;
      $scope.searchButtonText = 'Check Availability';
      $scope.saving = false;
      $scope.disabled = false;
      var blankform = { domainName: '' };
      $scope.nameQuery = angular.copy(blankform);
      $scope.CheckCredentials();
    };
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.CheckCredentials = function () {
      if ($scope.userID.length > 0) {
        $scope.loggedIn = true;
      } else {
        $scope.loggedIn = false;
      }
    };
    $scope.Login = function (data) {
      console.log('login Creds:', $scope.login);
      $scope.userID = $scope.login.userID;
      $scope.CheckCredentials($scope.userID);
    };
    $scope.Logout = function (data) {
      console.log('logout Creds:', $scope.logout);
      $scope.userID = '';
      $scope.CheckCredentials($scope.userID);
    };
    $scope.CheckAvailability = function () {
      $scope.searchButtonText = 'Checking';
      $scope.searching = true;
      $scope.disabled = true;
      $scope.alerts.length = 0;
      if ($scope.nameQuery.domainName === 'brad.com') {
        $scope.domainAvailable = false;
        $scope.resetForm();
        $location.path('/pounceit');
      } else {
        $scope.domainAvailable = true;
        $scope.resetForm();
        $scope.alerts.push({
          msg: 'Domain is Available!',
          type: 'success',
          autoclose: true,
          autoclosetime: 3000
        });
      }
    };
    $scope.resetForm = function () {
      $scope.searching = false;
      $scope.searchButtonText = 'Check Availability';
      $scope.saving = false;
      $scope.disabled = false;
    };
  }
]);
app.controller('PounceConfigViewCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.InitPage = function () {
      $scope.nameQuery = $scope.$parent.nameQuery;
      $scope.userID = $scope.$parent.userID;
      $scope.searching = false;
      $scope.pounceButtonText = 'Pounce It!';
      $scope.saving = false;
      $scope.disabled = false;
      var blankform = {
          domainName: $scope.nameQuery.domainName,
          email: '',
          userID: $scope.userID
        };
      $scope.pounceIt = angular.copy(blankform);
      console.log('$scope.nameQuery', $scope.nameQuery);
      console.log('$scope.pounceIt', $scope.pounceIt);
      $scope.showPost = false;
    };
    $scope.PounceIt = function () {
      $scope.showPost = true;
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