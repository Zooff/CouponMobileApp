angular.module('starter.controllers', ['starter.services'])


.controller('InscriptionCtrl', function($scope, $http, $authService) {

  $scope.verifInscription = function() {
    console.log($scope.inscriptionData);
    authService.signup($scope.inscriptionData).then(function(response){
    }
  }

})
