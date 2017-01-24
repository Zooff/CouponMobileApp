angular.module('starter.controllers', [])

.controller('CompteCtrl', function($scope, $ionicModal) {

  $scope.verifLogin = function() {

  }

  $ionicModal.fromTemplateUrl('templates/inscription.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.inscription = modal;
  });

})

.controller('InscriptionCtrl', function($scope) {

  $scope.verifInscription = function() {

  }

})

.controller('MarketCtrl', function($scope) {

});
