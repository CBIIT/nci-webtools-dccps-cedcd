'use strict';

var express = require('express');
var config = require('./config');
var mysql = require('./components/mysql');
var cache = require('./components/cache');
var app = express();

require('./config/express')(app);
require('./routes')(app);
app.use(require('./service/session'));
app.use(require('./service/authentication').authenticationMiddleware);

//setup mysql connection
mysql.connect(config.mysql, function (result) {
	if (result) {
		let func = "select_cohort_lookup";

		mysql.callProcedure(func, [], function (results) {
			if (results && results[0] && results[0].length > 0) {
				let gender = results[0];
				let cancer = results[1];
				let domain = results[2];
				let ethnicity = results[3];
				let race = results[4];
				let specimen = results[5];
				let cohortstatus = results[6];
				cache.setValue("lookup:gender", gender, -1);
				cache.setValue("lookup:cancer", cancer, -1);
				cache.setValue("lookup:domain", domain, -1);
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

	}
	else {
		console.log('failed to start up the service: mysql connection error.');
	}

});

// when shutdown signal is received, do graceful shutdown
process.on('SIGINT', function () {
	console.log('gracefully shutting down :)');
	mysql.close();
	process.exit();
});
