/**
 * Main application routes
 */

'use strict';
import Router from "express-promise-router";
import m_cohort from "./cohort.js";
import m_common from "./common.js";
import m_user from "./user.js";
import m_questionnaire from "./questionnaire.js";
import m_admin from "./admin.js";
import { login, logout, getUserSession, updateSession } from "../service/authentication.js";
import config from "../config/index.js";
import path from "path";

const routes = Router();

//allows CrossDomainAccess to API
routes.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (next) {
		next();
	}
});

routes.use('/api/', m_common);

// note: remember to check user authentication state in the following routes
// eg: if (request.session.user.role !== 'SystemAdmin') return response.status(400).json('Unauthorized');
routes.use('/api/cohort', m_cohort);
routes.use('/api/user', m_user);
routes.use('/api/questionnaire', m_questionnaire);
routes.use('/api/managecohort', m_admin);
routes.use('/private/:loginType', login);
routes.use('/api/logout', logout);
routes.use('/api/user-session', getUserSession);
routes.use('/api/update-session', updateSession);



// healthcheck route
routes.get('/api/ping', (request, response) => {
	response.status(200).json('true');
});

// All other routes should redirect to error page
routes.get('/*', function (req, res) {
	res.sendFile(path.join(config.root, '../client/www', 'index.html'));
});

export default routes;
