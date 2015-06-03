var myApp = angular.module('admin', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl:'../partials/home.html'})
    .when('/management', {templateUrl:'partials/management.html', controller:"managementController"})
    .when('/kitchen', {templateUrl:'partials/kitchen.html', controller:"kitchenController"})
    .when('/floor', {templateUrl:'partials/floor.html', controller:"floorController"})
    .when('/applicants', {templateUrl:'partials/applicants.html', controller:"applicantsController"})
    .when('/menu', {templateUrl: 'partials/menu.html', controller:"menuController"})
    .when('/applicant/:id', {templateUrl: 'partials/applicant.html', controller:'applicantController'})
    .otherwise('/');
    // .when('/two', {templateUrl:'partials/two.html', controller:'TestTwoController'});
});

myApp.controller('managementController', function($scope, $http) {
  $scope.managementForm = {};
  $scope.managementFormSubmit = function(){
    $http.post('/applicant', $scope.managementForm)
    .success(function(data){
      $scope.message=data;
    })
    .error(function(data){
      $scope.message=data;
    });
  };
});

myApp.controller('kitchenController', function($scope, $http) {
  $scope.kitchenForm = {};
  $scope.kitchenFormSubmit = function(){
    $http.post('/applicant', $scope.kitchenForm)
    .success(function(data){
      $scope.message=data;
    })
    .error(function(data){
      $scope.message=data;
    });
  };
});

myApp.controller('floorController', function($scope, $http) {
  $scope.floorForm = {};
  $scope.floorFormSubmit = function(){
    // console.log($scope.floorForm);
    $http.post('/applicant', $scope.floorForm)
    .success(function(data){
      $scope.message=data;
    })
    .error(function(data){
      $scope.message=data;
    });
  };
});


myApp.controller('menuController', function($scope, $http) {
  $scope.menuForm = {};
  $scope.menuFormSubmit = function(){
    $http.post('/applicant', $scope.menuForm)
    .success(function(data){
      $scope.message=data;
    })
    .error(function(data){
      $scope.message=data;
    });
  };
});

myApp.controller('applicantsController', function($scope, $http) {
  $scope.allApplicants;

  var getApplicants = function(){
    $http.get('/applicants')
    .success(function(data){
      $scope.allApplicants = data;
    })
    .error(function(data){
      console.log(data);
    });
  };

  getApplicants();

  $scope.deleteApplicant = function(id){
    console.log(id);
    $http.delete('/applicant/' + id)
    .success(function(data){
      console.log(data);
      getApplicants();
    })
    .error(function(data){
      console.log(data);

    });
  };
});

myApp.controller('applicantController', function($scope, $http, $routeParams, $location) {
  $scope.applicant = {};
  var getApplicant = function(){
    var id = $routeParams.id;
    $http.get('/applicant/' + id)
    .success(function(data){
      console.log(data);
      $scope.applicant = data;
    })
    .error(function(data){
      // console.log(data);
    });
  };
  getApplicant();
  $scope.deleteApplicant = function(id){
    console.log(id);
    $http.delete('/applicant/' + id)
    .success(function(data){
      console.log(data);
      $location.path('applicants');
    })
    .error(function(data){
      console.log(data);

    });
  };
});
