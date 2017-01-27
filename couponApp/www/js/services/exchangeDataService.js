angular.module('starter.services')

.factory("exchangeData", function($http, ApiEndpoint){
  var exchangeDataOp = {};

  exchangeDataOp.getCoupons = function(){
    return $http.get(ApiEndpoint.url + "exchange");
  }

  return exchangeDataOp;
});
