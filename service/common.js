var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config');
var path = require('path');

router.get('/', function(req, res, next) {
	res.json({status:200,data:'Welcome to CEDCD API Center.'});
});

router.get('/download/:filename', function(req, res, next) {
	let filename = req.params.filename;
	let filePath = path.format({
		dir: config.file_path,
		base: filename
	});
    fs.readFile(filePath, function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;