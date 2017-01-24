angular.module('starter.controllers', [])

.controller("CompteCtrl", function($scope, $http, authService){
    $scope.verifLogin = function(){
      authService.login($scope.loginData, function(res){
        window.location = "/home";
      }, function(res){
        alert(res.data);
      });
    };

})
