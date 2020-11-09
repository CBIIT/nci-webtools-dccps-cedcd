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

    if (nodeEnv === 'development') {
        // when developing locally, assign full privileges from authRoutes
        session.user = {
            type: 'admin',
            name: 'dev_admin',
            role: 'SystemAdmin',
        };
        next();
    } else if (authRoutes.some(regex => regex.test(url))) {
        try {
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

            if (results.length) {
                session.user = {
                    type: userType,
                    name: userName,
                    role: results[0].accessLevel, // SystemAdmin or CohortAdmin
                };
                next();
            } else {
                throw('Unauthorized');
            }
        } catch (e) {
            request.session.user = null;
            logger.error(e);
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
        // to ensure the proper session is destroyed, always visit the logout route from the application
        response.redirect(301, 'https://auth.nih.gov/siteminderagent/smlogout.asp');
    })
}

function getUserSession(request, response) {
    response.json(request.session.user || null);
}
