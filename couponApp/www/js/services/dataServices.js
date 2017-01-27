angular.module('starter.services')

.factory("userData", function($http, ApiEndpoint){
  var userDataOp = {};

  userDataOp.getUser = function(){
    return $http.get(ApiEndpoint.url + "users/me");
  }

  userDataOp.addCoupon = function(coupon){
    return $http.post(ApiEndpoint.url + "users/me/addCoupon", coupon)
  }

  userDataOp.removeUser = function(idUser){
    return $http.delete(ApiEndpoint.url + "users/" + idUser)
  }

  userDataOp.getCoupons = function(){
    return $http.get(ApiEndpoint.url + "users/me/coupons");
  }

  userDataOp.getExchange = function(){
    return $http.get(ApiEndpoint.url + "users/me/exchange");
  }


  return userDataOp;
});
