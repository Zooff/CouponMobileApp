angular.module('starter.controllers')

.controller('InscriptionCtrl', function($scope, $http, authService, $state) {

  console.log('YOu are here');

  $scope.VerifInscription = function() {
    console.log($scope.inscriptionData);
    authService.signup($scope.inscriptionData).then(function(response){
      console.log(response);
    });
    $state.go('tab.compte', {}, {reload: true});
  }

});
