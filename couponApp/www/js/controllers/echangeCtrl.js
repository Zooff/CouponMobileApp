angular.module('starter.controllers')

.controller('EchangeCtrl', function($scope, authService, echangeData) {

  console.log("testtt");
  getCoupons();

  function getCoupons() {
    echangeData.getCoupons()
      .success(function (coupons) {
        $scope.coupons = coupons;
        console.log($scope.coupons);
      })
      .error(function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
      });
  }

});
