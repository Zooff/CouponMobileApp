var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.connect("mongodb://localhost/couponApp");
var db = mongoose.connection;

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);


db.on('error', console.error.bind(console, "Connection Error"));
db.on('open', function(){
  console.log("Connexion Réussi")}
);
