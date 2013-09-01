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