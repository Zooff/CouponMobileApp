angular.module('starter.services')

.factory("userData", function($http, ApiEndpoint){
  var userDataOp = {};

  userDataOp.getUser = function(idUser){
    return $http.get(ApiEndpoint.url + "users/me");
  }

  userDataOp.addCoupon = function(coupon){
    return $http.post(ApiEndpoint.url + "users/me/addCoupon", coupon)
  }

  return userDataOp;
});
