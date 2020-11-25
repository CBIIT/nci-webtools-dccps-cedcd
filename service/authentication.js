const settings = require('../config/cedcd.settings')

module.exports = {
    authenticationMiddleware,
    getUserSession,
    logout,
}

const authRoutes = [
    // '^/admin/\\w+$',
    // '^/cohort/questionnaire/\\w+$',
    '^/login/internal\/?$',
    '^/login/external\/?$',
].map(pattern => new RegExp(pattern));

async function authenticationMiddleware(request, response, next) {
    const { url, headers, session, app } = request;
    const { mysql } = app.locals;
    const nodeEnv = process.env.NODE_ENV;
    const { 
        user_auth_type: userAuthType, 
        fed_email: fedEmail, 
        sm_user: smUser
    } = headers;

    console.log('authenticationMiddleware', url, authRoutes.some(regex => regex.test(url)))

    if (authRoutes.some(regex => regex.test(url))) {
        try {

            if (nodeEnv === 'development' || !smUser) {
                // siteminder is not configured or if developing locally, assign default permissions
                session.user = {
                    type: 'internal',
                    name: 'admin',
                    role: /internal/.test(url) 
                        ? 'SystemAdmin' 
                        : 'CohortAdmin',
                };
    
            } else {

                // otherwise, update user-session variable when hitting authRoutes
                const isFederated = userAuthType === 'federated';
                const userType = isFederated ? 'external' : 'internal';
                const userName = isFederated ? fedEmail : smUser;

                const results = await mysql.query(
                    `SELECT access_level as accessLevel 
                    FROM user where user_name = ?`,
                    [userName]
                );

                console.log(results);

                const userRole = results[0] && results[0].accessLevel; // SystemAdmin or CohortAdmin;

                session.user = {
                    type: userType,
                    name: userName,
                    role: userRole,
                };
            }

            console.log('logged in', session.user);

            if (/CohortAdmin/.test(session.user.role)) {
                response.status(301).redirect('/cohort/questionnaire/79');
            } else if (/SystemAdmin/.test(session.user.role)) {
                response.status(301).redirect('/admin/managecohort');
            } else {
                response.status(301).redirect('/');
            }
       
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
        response.json(settings.logoutUrl || '/');
    });
}

function getUserSession(request, response) {
    response.json(request.session.user || null);
}
