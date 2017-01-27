var express = require('express');
var router = express.Router();
var dao = require('../data/usersDao');
var daoExchange = require('../data/exchangeDao.js');
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
  daoExchange.FindAll(function(coupons,err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(coupons);
    }
  });
});


router.get('/:exchangeId', function(req,res){
  dao.findById(req.params.exchangeId, function(user, err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(user);
    }
  })
});

router.post('/addExchange', function(req, res){
	console.log(req.body);
	daoExchange.addExchange(req.body.exchange, function(exchange, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		else {
			dao.addExchange(req.decoded._id, exchange._id, function(c, err){
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

router.post('/doIt', function(req, res){
	daoExchange.permuteCoupon(req.decoded._id, req.body.exchange, function(user, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		else {
			daoExchange.delete(req.body.exchange._id, function(err){
				if (err){
					res.status(err.status).send(err.message);
				}
				else {
					res.status(200);
				}
			});
		}
	});
})

router.put('/:idExchange', function(req, res){
	daoExchange.updateCoupon(req.params.idExchange, exchange, function(updateExchange, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		else {
			res.status(200).json(updateExchange);
		}
	})
})

router.delete(':idExchange', function(req, res){
	daoExchange.delete(req.params.idExchange, function(err){
		if (err){
			res.status(err.status).send(err.message);
		}
		else {
			res.status(200);
		}
	});
})

module.exports = router;
