var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json({status:200, data:[{
	  	id: 1,
	  	username: "Kevin"
	  }, {
	  	id: 2,
	  	username: "David"
	  }]});
});

module.exports = router;