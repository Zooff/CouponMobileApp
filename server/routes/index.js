var express = require('express');
var dao = require('../data/usersDao.js');
var jwt = require('jsonwebtoken');

var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//
 router.get('/authenticate', function(req, res){
     res.render('index', {title: 'Signup'});
 });

router.post('/signup', function(req, res){
  var newUser = req.body;
  dao.addUser(newUser, function(user, err){
    if (err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(user);
    }
  })
});

router.post('/authenticate', function(req, res){
  var user = req.body;
  console.log(user);
  dao.authenticate(user, function(token, err){
    if (err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json({success : true, message : token});
    }
  });
});




module.exports = router;
