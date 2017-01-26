angular.module('starter.controllers')

.controller('MarketCtrl', function($scope, couponData, authService) {

  $scope.coupons;
  getCouponGerant();

  function getCouponGerant(){
    couponData.getCouponGerant()
      .success (function(coupons){
        $scope.coupons = coupons;
      })
      .error(function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
      });
  }

});
