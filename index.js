'use strict';

var express = require('express');
var config = require('./config');
var mysql = require('./components/mysql');
var app = express();

require('./config/express')(app);
require('./routes')(app);

//setup mysql connection
mysql.connect(config.mysql, function(result){
	if(result){
		app.listen(config.port, function(){
			console.log('Project CEDCD listening on port :' + config.port);
		});
	}
	else{
		console.log('failed to start up the service: mysql connection error.');
	}
	
});

// when shutdown signal is received, do graceful shutdown
process.on( 'SIGINT', function(){
  	console.log( 'gracefully shutting down :)' );
  	mysql.close();
    process.exit();
});
