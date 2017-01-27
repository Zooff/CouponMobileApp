angular.module('starter.services')

.factory("exchangeData", function($http, ApiEndpoint){
  var exchangeDataOp = {};

  exchangeDataOp.getCoupons = function(){
    return $http.get(ApiEndpoint.url + "exchange");
  }

  exchangeDataOp.addExchange = function(idUser, idCoupon){
    var exchange = {exchange : {
      userA : idUser,
      couponA : idCoupon
    }}
    return $http.post(ApiEndpoint.url + "exchange/addExchange", exchange)
  }

  exchangeDataOp.tradeOk = function(idUser, exchange){
    return $http.post(ApiEndpoint.url + "exchange/doIt", exchange);
  }

  exchangeDataOp.tradeNo = function(id){
    return $http.delete(ApiEndpoint.url + "exchange/" + id);
  }

  return exchangeDataOp;
});
