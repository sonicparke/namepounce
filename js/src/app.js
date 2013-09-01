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