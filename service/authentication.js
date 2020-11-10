const compression = require('compression');
var { getConnectionAsync, queryAsync } = require('../components/mysql');

module.exports = {
    authenticationMiddleware,
    getUserSession,
    logout,
}

const authRoutes = [
    '^/admin/\\w+$',
    '^/cohort/questionnaire/\\w+$',
    // '^/login/internal\/?$',
    // '^/login/external\/?$',
].map(pattern => new RegExp(pattern));

async function authenticationMiddleware(request, response, next) {
    const { url, headers, session } = request;
    const nodeEnv = process.env.NODE_ENV;

    if (authRoutes.some(regex => regex.test(url))) {

        if (nodeEnv === 'development') {
            session.user = {
                type: 'admin',
                name: 'dev_admin',
                role: 'CohortAdmin',
            };
            next();
        }

        else try {
            // otherwise, update user-session variable when hitting authRoutes
            const { 
                user_auth_type: userAuthType, 
                fed_email: fedEmail, 
                sm_user: smUser
            } = headers;
            
            const isFederated = userAuthType === 'federated';
            const userType = isFederated ? 'external' : 'internal';
            const userName = isFederated ? fedEmail : smUser;

            const { results } = await queryAsync(
                await getConnectionAsync(),
                `SELECT access_level as accessLevel 
                FROM user where user_name = ?`,
                [userName]
            );

            session.user = {
                type: userType,
                name: userName,
                role: results[0] && results[0].accessLevel, // SystemAdmin or CohortAdmin
            };
       
        } catch (e) {
            request.session.destroy(error => {
                request.session.user = null;
                console.error(e);
            })
        } finally {
            next();
        }
    } else {
        next();
    }
}

// note: both federated NIH Auth use siteminder under the hood to authenticate users
// so we can use the global siteminder agent logout route to invalidate our current session
function logout(request, response) {
    request.session.destroy(error => {
        response.json(true);
    });
}

function getUserSession(request, response) {
    response.json(request.session.user || null);
}
