'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var couponShema = new mongoose.Schema({
  _id : String,
  shopName : String,
  value : String,
  role : { type : String, enum: ['gerant', 'client']},
  expireAt : Date,
  count : Number,
}, , {_id : false});

couponShema.index({ expireAt : 1}, {expireAfterSeconds : 0});

couponShema.plugin(autoIncrement.plugin, {model : 'Coupon', field : '_id'});
var Coupon = mongoose.model("Coupon", couponShema);

module.exports = Coupon;
