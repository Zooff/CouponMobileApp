angular.module('starter.controllers')

.controller('EchangeCtrl', function($scope, authService, exchangeData) {

  console.log("testtt");
  $scope.coupons;
  getCoupons();

  function getCoupons() {
    exchangeData.getCoupons()
      .success(function (coupons) {
        $scope.coupons = coupons;
        console.log($scope.coupons);
      })
      .error(function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
      });
  }

});
