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

  couponDataOp.addCoupon = function(idCoupon){
    var coupon = {_id : idCoupon}
    return $http.post(ApiEndpoint.url + "coupons/addCoupon", coupon);
  }

  return couponDataOp;
});
