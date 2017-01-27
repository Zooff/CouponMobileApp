'use strict';

var mongoose = require('mongoose');
var Exchange = require('./exchange.js');

exports.FindAll = function(callback){
  Exchange.find({})
    .populate('couponA')
    .exec(function(err, users){
    if (err){
      return callback(null,{status : 500, message : 'Error: ' + err});
    }
    if (users){
      return callback(users, null);
    }
    return callback(null,{status : 404, message : 'No Coupons Found'});
  });
}

exports.addExchange = function(exchange, callback){
  var newExchange = new Exchange({userA : exchange.userA, userB : "", couponA : exchange.couponA, couponB : "" });
  return newExchange.save(function (err, saveExchange){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (saveExchange){
      return callback(saveExchange, null);
    }
  });
}

exports.update = function(id, modifiedExchange, callback){
  Exchange.findOne({_id : id}, function (err,exchange){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (exchange){
      console.log(modifiedUser);
      if (modifiedExchange.userB)
        exchange.userB = modifiedExchange.userB;
      if (modifiedExchange.couponB)
        exchange.lastname = modifiedExchange.lastname;
      return exchange.save(function (err, mExchage){
        if (err){
          return callback(null, {status : 500, message : 'Error : ' + err});
        }
        if (mExchange){
          return callback(mExchange, null);
        }
      });
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  });
}

exports.delete = function(){

}
