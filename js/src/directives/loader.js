angular.module('loader', [])
    .directive('ngLoader', function () {
        return{
            restrict: 'E,A',
            template: '<div ng-show="showLoader" class="ngLoader"><img src="http://axccdn.harsco.com/cdn/images/loading-spinner-24_whitebg.gif" /></div>'
        };
    });