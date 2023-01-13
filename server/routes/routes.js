/**
 * Main application routes
 */

'use strict';
import Router from "express-promise-router";
import cohortRouter from "./cohort.js";
import commonRouter from "./common.js";
import userRouter from "./user.js";
import questionnaireRouter from "./questionnaire.js";
import adminRouter from "./admin.js";
import sessionRouter from "./session.js";
import { login, logout, getUserSession, updateSession } from "../service/auth/authentication.js";
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

// public cohorts 
routes.use('/api/', commonRouter);

// login, logout , session data
routes.use(sessionRouter);
// routes.use('/private/:loginType', login);
//routes.use('/api/logout', logout);

// note: remember to check user authentication state in the following routes
// eg: if (request.session.user.role !== 'SystemAdmin') return response.status(400).json('Unauthorized');
routes.use('/api/cohort', cohortRouter);
routes.use('/api/user', userRouter);
routes.use('/api/questionnaire', questionnaireRouter);
routes.use('/api/managecohort', adminRouter);

//routes.use('/api/user-session', getUserSession);
//routes.use('/api/update-session', updateSession);



// healthcheck route
routes.get('/api/ping', (request, response) => {
	response.status(200).json('true');
});

// All other routes should redirect to error page
routes.get('/*', function (req, res) {
	res.sendFile(path.join(config.root, '../client/www', 'index.html'));
});

export default routes;
