const settings = require('../config/cedcd.settings')

module.exports = {
    authenticationMiddleware,
    getUserSession,
    logout,
}

const authRoutes = [
    '^/login/internal\/?$',
    '^/login/external\/?$',
].map(pattern => new RegExp(pattern));

async function authenticationMiddleware(request, response, next) {
    const { url, headers, session, app } = request;
    const { mysql } = app.locals;
    const { 
        user_auth_type: userAuthType, 
        fed_email: fedEmail, 
        sm_user: smUser
    } = headers;

    if (authRoutes.some(regex => regex.test(url))) {
        try {

            if (process.env.NODE_ENV === 'development' || !smUser) {
                // siteminder is not configured or if developing locally, assign default permissions
                session.user = {
                    id: 1,
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

                const [results] = await mysql.query(
                    `SELECT id, access_level as accessLevel 
                    FROM user where user_name = ?`,
                    [userName]
                );

                // SystemAdmin or CohortAdmin
                const userId = results.id
                const userRole = results.accessLevel 

                session.user = {
                    id: userId,
                    type: userType,
                    name: userName,
                    role: userRole,
                };
            }

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
