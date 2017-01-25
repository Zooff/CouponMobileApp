angular.module('starter.controllers')

.controller('InscriptionCtrl', function($scope, $http, authService) {

  console.log('YOu are here');

  $scope.VerifInscription = function() {
    console.log($scope.inscriptionData);
    authService.signup($scope.inscriptionData).then(function(response){
      console.log(response);
    });
  }

});
