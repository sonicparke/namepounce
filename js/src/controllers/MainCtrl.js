app.controller('MainCtrl', function ($scope, $location, $http,  $timeout, JobData){

    // Initial Functions
    $scope.InitPage = function() {
        $scope.PageTitle = "Job Print";
        $scope.GetDataItems = [];
        $scope.UserID = "brad";
        $scope.searching = false;
        $scope.searchButtonText = "Check Availability";
        $scope.saving = false;

        // Setup format for form data sumission
        // var blankFormData = {
        //     sStartDate: ""
        // };

        // Make copy of form data model
        // $scope.WCFServerName = angular.copy(blankFormData);

        // FOR TESTING ONLY
        // $scope.dateRange.sStartDate = "08/01/2013";
        // $scope.dateRange.sEndDate = "08/30/2013";
    };

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    // Submit Form Action
    $scope.searchForName = function () {
        // if ($scope.dateRange.sStartDate === "") {
        //     $scope.alerts.push({msg: "Please enter Start Date", type:'error', autoclose: true, autoclosetime: 3000});
        // } else if($scope.dateRange.sEndDate === "") {
        //     $scope.alerts.push({msg: "Please enter End Date", type:'error', autoclose: true, autoclosetime: 3000});
        // }
        // else {
        //     $scope.GridData($scope.dateRange);
        // }
        // var WCFServerName = $scope.jobNumber;
        // console.log('WCFServerName:', WCFServerName);
        // $scope.JobData($scope.jobNumber);

        $scope.CheckAvailability();
    };

    $scope.CheckAvailability  = function (data) {
        // Set Buttons and Grid behavior
        // console.log('data:',data);
        $scope.searchButtonText = 'Checking';
        $scope.searching = true;
        $scope.disabled = true;
        $scope.alerts.length = 0;

        $scope.alerts.push({msg: "Checked", type:'success', autoclose: true, autoclosetime: 3000});

        // var JobDataPromise = JobData.get(data);
        // JobDataPromise.then(function(data) {

        //     $scope.JobDataItems = data;
        //     $scope.searchButtonText = 'Go';
        //     $scope.searching = false;
        //     $scope.disabled = false;

        //     console.log('data:', data);
        //     return $scope.JobDataItems;
        // });
    };



//     $scope.selected = undefined;
//     $scope.states = [
// {"name":"Alabama","alpha-2":"AL"},
// {"name":"Alaska","alpha-2":"AK"},
// {"name":"Arizona","alpha-2":"AZ"},
// {"name":"Arkansas","alpha-2":"AR"},
// {"name":"California","alpha-2":"CA"},
// {"name":"Colorado","alpha-2":"CO"},
// {"name":"Connecticut","alpha-2":"CT"},
// {"name":"Delaware","alpha-2":"DE"},
// {"name":"District of Columbia","alpha-2":"DC"},
// {"name":"Florida","alpha-2":"FL"},
// {"name":"Georgia","alpha-2":"GA"},
// {"name":"Hawaii","alpha-2":"HI"},
// {"name":"Idaho","alpha-2":"ID"},
// {"name":"Illinois","alpha-2":"IL"},
// {"name":"Indiana","alpha-2":"IN"},
// {"name":"Iowa","alpha-2":"IA"},
// {"name":"Kansa","alpha-2":"KS"},
// {"name":"Kentucky","alpha-2":"KY"},
// {"name":"Lousiana","alpha-2":"LA"},
// {"name":"Maine","alpha-2":"ME"},
// {"name":"Maryland","alpha-2":"MD"},
// {"name":"Massachusetts","alpha-2":"MA"},
// {"name":"Michigan","alpha-2":"MI"},
// {"name":"Minnesota","alpha-2":"MN"},
// {"name":"Mississippi","alpha-2":"MS"},
// {"name":"Missouri","alpha-2":"MO"},
// {"name":"Montana","alpha-2":"MT"},
// {"name":"Nebraska","alpha-2":"NE"},
// {"name":"Nevada","alpha-2":"NV"},
// {"name":"New Hampshire","alpha-2":"NH"},
// {"name":"New Jersey","alpha-2":"NJ"},
// {"name":"New Mexico","alpha-2":"NM"},
// {"name":"New York","alpha-2":"NY"},
// {"name":"North Carolina","alpha-2":"NC"},
// {"name":"North Dakota","alpha-2":"ND"},
// {"name":"Ohio","alpha-2":"OH"},
// {"name":"Oklahoma","alpha-2":"OK"},
// {"name":"Oregon","alpha-2":"OR"},
// {"name":"Pennsylvania","alpha-2":"PA"},
// {"name":"Rhode Island","alpha-2":"RI"},
// {"name":"South Carolina","alpha-2":"SC"},
// {"name":"South Dakota","alpha-2":"SD"},
// {"name":"Tennessee","alpha-2":"TN"},
// {"name":"Texas","alpha-2":"TX"},
// {"name":"Utah","alpha-2":"UT"},
// {"name":"Vermont","alpha-2":"VT"},
// {"name":"Virginia","alpha-2":"VA"},
// {"name":"Washington","alpha-2":"WA"},
// {"name":"West Virginia","alpha-2":"WV"},
// {"name":"Wisconsin","alpha-2":"WI"},
// {"name":"Wyoming","alpha-2":"WY"}
// ];
});