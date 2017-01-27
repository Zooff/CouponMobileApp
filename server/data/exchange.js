'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');



var exchangeShema = new mongoose.Schema({
  _id : String,
  userA : {type : String, ref : 'Users'},
  userB : {type : String, ref : 'Users'},
  couponA : {type : String, ref : 'Coupon'},
  couponB : {type : String, ref : 'Coupon'},
}, {_id : false});



exchangeShema.plugin(autoIncrement.plugin, {model : 'Exchange', field : '_id'});
var Exchange = mongoose.model("Exchange", couponShema);

module.exports = Exchange;
