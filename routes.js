/**
 * Main application routes
 */

'use strict';
var express = require('express');
var m_cohort = require('./service/cohort');
var m_common = require('./service/common');
var m_user = require('./service/user');
var m_questionnaire = require('./service/questionnaire')
var m_admin = require('./service/admin');
var { login, logout, getUserSession, updateSession } = require('./service/authentication');
var config = require('./config');
var path = require('path');

module.exports = function (app) {

	//allows CrossDomainAccess to API
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

		if (next) {
			next();
		}
	});

	app.use('/api/', m_common);

	// note: remember to check user authentication state in the following routes
	// eg: if (request.session.user.role !== 'SystemAdmin') return response.status(400).json('Unauthorized');
	app.use('/api/cohort', m_cohort);
	app.use('/api/user', m_user);
	app.use('/api/questionnaire', m_questionnaire);
	app.use('/api/managecohort', m_admin);
	app.use('/private/:loginType', login);
	app.use('/api/logout', logout);
	app.use('/api/user-session', getUserSession);
	app.use('/api/update-session', updateSession);

	// healthcheck route
	app.get('/api/ping', (request, response) => {
		response.status(200).json('true');
	});

	// All other routes should redirect to error page
	app.get('/*', function (req, res) {
		res.sendFile(path.join(config.root, 'client/www', 'index.html'));
	});
};