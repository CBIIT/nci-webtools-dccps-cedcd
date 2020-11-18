'use strict';

var express = require('express');
var config = require('./config');
var mysql = require('./components/mysql');
var cache = require('./components/cache');
var app = express();

require('./config/express')(app);
require('./routes')(app);

const connection = mysql.getConnectionPool(config.mysql);
app.locals.connection = connection;

mysql.deferUntilConnected(connection).then(function(connection) {
	connection.query('call select_cohort_lookup()', (error, results, columns) => {
		if (!error && results && results[0] && results[0].length > 0) {
			let gender = results[0];
			let cancer = results[1];
			let data_category = results[2];
			let ethnicity = results[3];
			let race = results[4];
			let specimen = results[5];
			let cohortstatus = results[6];
			cache.setValue("lookup:gender", gender, -1);
			cache.setValue("lookup:cancer", cancer, -1);
			cache.setValue("lookup:data_category", data_category, -1);
			cache.setValue("lookup:ethnicity", ethnicity, -1);
			cache.setValue("lookup:race", race, -1);
			cache.setValue("lookup:specimen", specimen, -1);
			cache.setValue("lookup:cohortstatus", cohortstatus, -1);
	
			app.listen(config.port, function () {
				console.log('Project CEDCD listening on port :' + config.port);
			});
		}
		else {
			console.log('failed to start up the service: load lookup data error.');
		}
	});
});

// when shutdown signal is received, do graceful shutdown
process.on('SIGINT', function () {
	console.log('gracefully shutting down :)');
	mysql.close();
	process.exit();
});
