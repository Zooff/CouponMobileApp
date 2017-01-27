var express = require('express');
var router = express.Router();
var dao = require('../data/usersDao');
var daoCoupon = require('../data/couponDao.js');
var jwt = require('jsonwebtoken');


router.use(function(req, res, next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token){
		jwt.verify(token, 'secrettoken', function(err, decoded){
			if (err){
				res.status(500).json({success : false, message : 'Failed to decode the JSON token ' + err});
			}
			else {
				req.decoded = decoded;
				console.log(decoded);
				next();
			}
		});
	}
	else {
		return res.status(403).json({success : false, message : "No token provided"});
	}
})


router.get('/', function(req, res){
  daoCoupon.FindAll(function(coupons,err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(coupons);
    }
  });
});

router.get('/gerant', function(req, res){
  daoCoupon.FindAllGerant(function(coupons, err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(coupons);
    }
  });
})

router.get('/client', function(req, res){
  daoCoupon.FindAllGerant(function(coupons, err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(coupons);
    }
  });
})

router.post('/addCoupon', function(req, res){
	console.log(req.body);
	daoCoupon.updateCoupon(req.body._id, true, function(updateCoupon, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		else {
			dao.addCoupon(req.decoded._id, req.body._id, function(c, err){
	    	if(err){
	      	res.status(err.status).send(err.message);
	    	}
	    	else {
	      	res.status(200).json(c);
	    	}
			});
		}
	});
})

router.put('/:idCoupon', function(req, res){
	daoCoupon.updateCoupon(req.body._id, false, function(updateCoupon, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		else {
			res.status(200).json(updateCoupon);
		}
	})
})

module.exports = router;
