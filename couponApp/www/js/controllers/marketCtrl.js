angular.module('starter.controllers')

.controller('MarketCtrl', function($scope, couponData, authService, $ionicPopup) {

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

  $scope.addCoupon = function(idCoupon){
    couponData.addCoupon(idCoupon)
      .success(function (){
        alert("ok");
      })
      .error(function(error){
        alert(error);
      })
  }

});
