// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router', 'ngStorage'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'lib/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('login.errorUser', {
      url: '/errorLoginUser',
      templateUrl: 'lib/views/errorLoginUser.html',
      controller: 'LoginCtrl'
    })
    .state('login.errorPass', {
      url: '/errorLoginPass',
      templateUrl: 'lib/views/errorLoginPass.html',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url: '/',
      templateUrl: 'lib/views/main.html',
      controller: 'AppCtrl'
    })

    $urlRouterProvider.otherwise('main')
})

.controller('LoginCtrl', [
  '$scope', '$http', 'LoginFactory', '$state','$localStorage',
  function($scope, $http, LoginFactory, $state, $localStorage) {

    $scope.login = function(user, pass) {
      LoginFactory.login(user, pass).then(function(res) {
        if(res.data === 'true'){
          $localStorage.userName = user;
          $localStorage.pass = pass;
          $scope.userName = '';
          $scope.pass = '';
          $state.go('main');
          console.log(res.data);        
        }else{
          if(res.data === 'user'){
            console.log(res.data)
            $state.go('login.errorUser');            
          }else{
            $state.go('login.errorPass');
          }
        }
      });      
    }

}])

.controller('AppCtrl',['$scope','$localStorage','$state', function($scope, $localStorage, $state) {

  if($localStorage.userName){
    $scope.userLogin = $localStorage.userName;
  }else{
    $state.go('login');
  }

  if($scope.userLogin){
    $scope.classLogin = 'loginTrue';
  }else{
    $scope.classLogin = 'loginFalse';
  }

  $scope.showMe = function() {
    alert('anda');
  }


  $scope.logout = function() {
    delete $localStorage.userName;
    $state.go('login');
  }


}])

.factory('LoginFactory', function($http) {
  var factory = {};
  factory.login = function(user, pass) {
      return $http({
          method: 'GET',
          url: 'http://127.0.0.3:8000/api/getLogin?userName='+user+'&password='+pass,
        });
    }
  return factory;
})