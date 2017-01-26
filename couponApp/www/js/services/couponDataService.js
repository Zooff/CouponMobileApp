angular.module('starter.services')

.factory("couponData", function($http, ApiEndpoint){
  var couponDataOp = {};

  couponDataOp.getCouponGerant = function(){
    return $http.get(ApiEndpoint.url + "coupons/gerant");
  }

  couponDataOp.getCouponClient = function(){
    return $http.get(ApiEndpoint.url + "coupons/client");
  }

  return couponDataOp;
});
