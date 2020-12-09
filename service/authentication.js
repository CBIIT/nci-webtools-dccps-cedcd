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

            let cohortId;

            if (process.env.NODE_ENV === 'development' || !smUser) {
                // siteminder is not configured or if developing locally, assign default permissions
                cohortId = process.env.NODE_ENV === 'development' ? 79 : 30;
                session.user = {
                    id: 1,
                    type: 'internal',
                    name: 'admin',
                    role: /internal/.test(url) 
                        ? 'SystemAdmin' 
                        : 'CohortAdmin',
                    cohorts: [cohortId]
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

                const allowedCohorts = (await mysql.query(
                    `call select_cohort_for_user(?)`,
                    [userId]
                )).map(c => c.id);
                
                // todo: if there is more than one allowed cohort for the user, take the user
                // to a cohort selection page
                cohortId = allowedCohorts[0];

                session.user = {
                    id: userId,
                    type: userType,
                    name: userName,
                    role: userRole,
                    cohorts: allowedCohorts
                };
            }

            if (/CohortAdmin/.test(session.user.role)) {
                response.status(301).redirect(`/cohort/questionnaire/${cohortId || ''}`);
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
