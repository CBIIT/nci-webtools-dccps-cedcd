/**
 * Main application routes
 */

'use strict';
var express = require('express');
var m_cohort = require('./service/cohort');
var m_common = require('./service/common');
var m_user = require('./service/user');
var config = require('./config');
var path = require('path');

module.exports = function(app){

	//allows CrossDomainAccess to API
	app.use(function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

		if(next){
			next();
		}
	});

	app.use('/api/', m_common);
	app.use('/api/cohort', m_cohort);
	app.use('/api/user', m_user);

	// All other routes should redirect to error page
    app.get('/*', function (req, res) {
	  res.sendFile(path.join(config.root, 'client/www', 'index.html'));
	});
};