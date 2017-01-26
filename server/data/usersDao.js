'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var Users = require('./users.js');

exports.FindAll = function(callback){
  Users.find({}, function(err, users){
    if (err){
      return callback(null,{status : 500, message : 'Error: ' + err});
    }
    if (users){
      return callback(users, null);
    }
    return callback(null,{status : 404, message : 'No User has ever signup'});
  });
}

exports.findById = function(id,callback){
  Users.findOne({_id : id}, function(err, user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(user, null);
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  });
}

exports.addUser = function(newUser, callback){
  Users.findOne({email : newUser.email}, function(err,user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(null, {status : 409, message : 'This User already exist'});
    }
    var uservar = new Users({ email : newUser.email, password : newUser.password, pseudo : newUser.pseudo, role : newUser.role, coupons : [], registration : new Date().toJSON()});
    return uservar.save(function (err, creUser){
      if (err){
        return callback(null, {status : 500, message : 'Error : ' + err});
      }
      if (creUser){
        return callback(creUser, null);
      }
    });
  });
}

exports.update = function(id, modifiedUser, callback){
  Users.findOne({_id : id}, function (err,user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      console.log(modifiedUser);
      if (modifiedUser.email)
        user.email = modifiedUser.email;
      if (modifiedUser.password)
        user.password = modifiedUser.password;
      if (modifiedUser.pseudo)
        user.pseudo = modifiedUser.pseudo;
      return user.save(function (err, mUser){
        if (err){
          return callback(null, {status : 500, message : 'Error : ' + err});
        }
        if (mUser){
          return callback(mUser, null);
        }
      });
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  });
}

exports.removeUser = function(id, callback){
  Users.findOneAndRemove({_id : id}, function(err, user){
    if (err){
      return callback({status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(null);
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  })
}

exports.authenticate = function(user, callback){

  Users.findOne({ email : user.email}, function(err,userAuth){
    if (err) {
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (!userAuth){
      return callback(null, {status : 404, message : 'Authentification Failed. User not found'});
    }
    else if (userAuth) {
      userAuth.verifyPassword(user.password, function(err, ok){
        if (err) {
          return callback(null, {status : 500, message : 'Database Error : ' + err});
        }
        if (!ok) {
          return callback(null, {status : 401, message : 'Authentification Failed. Bad password'});
        }

        var tknUser = {_id : userAuth._id, role : userAuth.role};

        var token = jwt.sign(tknUser, 'secrettoken', {
          expiresIn: 1440 // expires in 24 hours
        });

        return callback(token, null);

      });
    }
  });
}

exports.addCoupon = function(idUser, idCoupon, callback){
	Users.findOne({_id : idUser}, function(err, user){
		if(err){
			return callback(null, {status : 500, message : 'Error Find Group : ' + err});
		}
		if(user){
			if (user.coupons.indexOf(idCoupon) > -1){
				return callback(null, {status : 409, message : 'You already have this coupon, greedy man !'});
			}
			user.coupons.push(idCoupon);
			return user.save(function(err, userModif){
				if(err){
					return callback(null, {status : 500, message : 'Error Save : ' + err});
				} else {
					return callback(userModif, null);
				}
			});
		}
	});
}
