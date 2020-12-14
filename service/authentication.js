const settings = require('../config/cedcd.settings')

module.exports = {
    login,
    logout,
    getUserSession,
}

async function login(request, response) {
    const { headers, session, app, params } = request;
    const { loginType } = params;
    const { mysql } = app.locals;
    const { 
        user_auth_type: userAuthType, 
        fed_email: fedEmail, 
        sm_user: smUser
    } = headers;

    if (!['internal', 'external'].includes(loginType)) {
        return response.status(301).redirect('/');
    }

    try {
        let userName, userRole, userType;

        if (!smUser || process.env.NODE_ENV === 'development') {
            userName = 'admin';
            userType = loginType;
            userRole = userType === 'internal'
                ? 'SystemAdmin' 
                : 'CohortAdmin'
        } else {
            // otherwise, update user-session variable when hitting authRoutes
            const isFederated = userAuthType === 'federated';
            userType = isFederated ? 'external' : 'internal';
            userName = isFederated ? fedEmail : smUser;
        }

        const [user] = await mysql.query(
            `SELECT 
                id, 
                access_level as accessLevel, 
                active_status as activeStatus
            FROM user where user_name = ? `,
            [userName]
        );

        const userId = user.id;
        if (!userRole) {
            userRole = user.activeStatus === 'Y'
                ? user.accessLevel
                : null
        }

        const cohortAcronyms = await mysql.query(
            `SELECT DISTINCT cohort_acronym as acronym
            FROM cohort_user_mapping 
            WHERE cohort_user_id = ? AND active = 'Y'
            ORDER BY acronym ASC`,
            [userId]
        );

        console.log(cohortAcronyms);

        let cohorts = [];

        for (const {acronym} of cohortAcronyms) {
            const [editableCohorts] = await mysql.query(
                `call select_editable_cohort_by_acronym(?)`,
                [acronym]
            );
            cohorts.push(...editableCohorts);
        }
        
        session.user = {
            id: userId,
            type: userType,
            name: userName,
            role: userRole,
            cohorts: cohorts,
            active: user.activeStatus === 'Y',
        };

        let redirectUrl = '/';

        if (!session.user.active) {
            redirectUrl = '/unauthorized';
        } else if (/SystemAdmin/.test(session.user.role)) {
            redirectUrl = '/admin/managecohort';
        } else if (/CohortAdmin/.test(session.user.role)) {
            if (cohorts.length === 1) {
                redirectUrl = `/cohort/questionnaire/${cohorts[0].id}`;
            } else if (cohorts.length > 1) {
                redirectUrl = `/cohort/select`;
            }
        }

        response.status(301).redirect(redirectUrl);
    
    } catch (e) {
        console.error('authentication error', e);
        request.session.destroy(error => {
            response.status(301).redirect('/');
        });
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
