'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT = 5;
var autoIncrement = require('mongoose-auto-increment');

var usersSchema = new mongoose.Schema({
  _id : String,
  email : String,
  password : String,
  pseudo : String,
  role : { type : String, enum: ['gerant', 'client']},
  coupons : [{
    type : String,
    ref : 'Coupon'
  }],
  exchanges : [{
    type : String,
    ref : 'Exchange'
  }],
  registration : Date,
}, {_id : false});

usersSchema.plugin(autoIncrement.plugin, {model : 'Users', field : '_id'});

// Function call before a save operation
usersSchema.pre('save', function(next){
  var user = this;
  // Dont need to hash the password if it was not modified
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT, function(err,salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

usersSchema.methods.verifyPassword = function (password, callback){
  bcrypt.compare(password, this.password, function(err, ok){
    if (err) {
      return callback(err);
    }
    return callback(null, ok);
  });
}

var Users = mongoose.model('Users', usersSchema);



module.exports = Users;
