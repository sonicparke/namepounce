////////// Get Data //////////
app.factory('JobData', function($http) {
  // JobData is a class which we can use for retrieving and
  // updating data on the server
  var JobData = function(data) {
    angular.extend(this, data);
    // console.log('service data:', data);
  };

  // var WCFServer = 'axcapps.harsco.com';
  var WCFServer = 'AXCUSCATLTRRIE1';
  // var WCFServer = 'AXCUSCATLTLTHOM';

  // a static method to retrieve JobData
  JobData.get = function(data) {
    return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetData').then(function(response) {
      return new JobData(response.data);
    });
  };

  JobData.getTest = function(data) {
    return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/TestData').then(function(response) {
      return new JobData(response.data);
    });
  };

  JobData.JSONWebService = function(data) {
    return $http.get('http://' + WCFServer + '/JSONWebService/Service1.svc/GetAllCustomers').then(function(response) {
      return new JobData(response.data);
    });
  };

  JobData.post = function(data) {
    return $http.post('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetAllFiles', data).then(function(response) {
      return new JobData(response.data);
    });
  };

  // FROM CAPACITY PLANNING:
  JobData.GetDataCP = function(data) {
    return $http.post('http://' + WCFServer + '/CapacityPlanningWCF/Service1.svc/GetAllFiles', data).then(function(response) {
      return new JobData(response.data);
    });
  };

  JobData.GetAllFilesGet = function(data) {
    return $http.get('http://' + WCFServer + '/JobQueryWCF/Service1.svc/GetAllFilesGet').then(function(response) {
      return new JobData(response.data);
    });
  };

  return JobData;
});