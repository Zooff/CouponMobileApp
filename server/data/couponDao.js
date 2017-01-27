'use strict';

var mongoose = require('mongoose');
var Coupon = require('./coupon.js');

exports.FindAll = function(callback){
  Coupon.find({}, function(err, users){
    if (err){
      return callback(null,{status : 500, message : 'Error: ' + err});
    }
    if (users){
      return callback(users, null);
    }
    return callback(null,{status : 404, message : 'No Coupons Found'});
  });
}

exports.FindAllGerant = function(callback){
  Coupon.find({role : "gerant", count : {$gt : 0}}, function(err, coupons){
    if (err){
      return callback(null,{status : 500, message : 'Error: ' + err});
    }
    if (coupons){
      return callback(coupons, null);
    }
    return callback(null, {status : 404, message : 'No Coupons Found'})
  });
}

exports.FindAllClient = function(callback){
  Coupon.find({role : "client", count : {$gt : 0}}, function(err, coupons){
    if (err){
      return callback(null,{status : 500, message : 'Error: ' + err});
    }
    if (coupons){
      return callback(coupons, null);
    }
    return callback(null, {status : 404, message : 'No Coupons Found'})
  });
}

exports.findById = function(id,callback){
  Coupon.findOne({_id : id}, function(err, user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(user, null);
    }
    return callback(null, {status : 404, message : 'Are you sure this coupon exist ?'});
  });
}

exports.saveCoupon = function(newCoupon, callback){
  var newCoupon = new Coupon({ shopName : newCoupon.shopName, value : newCoupon.value, role : newCoupon.role, expireAt : newCoupon.expireAt, count : newCoupon.count});
  console.log(newCoupon + "NEW");
  return newCoupon.save(function (err, saveCoupon){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (saveCoupon){
      return callback(saveCoupon, null);
    }
  });
}

exports.updateCoupon = function(id, callback){
  Coupon.findOne({_id : id}, function(err, coupon){
    if (err){
      return callback(null, {status : 500, message : 'Error : '+ err});
    }
    if (coupon){
      coupon.count = coupon.count -1;
      return coupon.save(function (err, updateCoupon){
        if (err){
          return callback(null, {status : 500, message : 'Error : ' + err});
        }
        if (updateCoupon){
          return callback(saveCoupon, null);
        }
      });
    }
  });
}

exports.removeCoupon = function(id, callback){
  Coupon.findOneAndRemove({_id : id}, function(err, user){
    if (err){
      return callback({status : 500, message : 'Error : ' + err});
    }
    if (coupon){
      return callback(null);
    }
    return callback(null, {status : 404, message : 'Are you sure this coupon exist ?'});
  })
}
