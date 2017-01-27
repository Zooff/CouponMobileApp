angular.module('starter.services')

.factory("couponData", function($http, ApiEndpoint){
  var couponDataOp = {};

  couponDataOp.getCouponGerant = function(){
    return $http.get(ApiEndpoint.url + "coupons/gerant");
  }

  couponDataOp.getCouponClient = function(){
    return $http.get(ApiEndpoint.url + "coupons/client");
  }

  couponDataOp.removeCoupon = function(couponId){
  	return $http.delete(ApiEndpoint.url + "coupons/" + couponId);
  }

  return couponDataOp;
});
