angular.module('starter.controllers')

.controller('CompteCtrl', function($scope, $ionicModal, authService) {

  $scope.verifLogin = function() {
    console.log($scope.loginData);
    authService.login($scope.loginData, function(res){
    }, function(res){
      alert(res.data);
    });
  }

  $scope.deco = function() {
    authService.logout();
  }

  $ionicModal.fromTemplateUrl('templates/inscription.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.inscription = modal;
  });

});
