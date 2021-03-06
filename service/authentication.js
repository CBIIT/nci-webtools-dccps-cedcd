const settings = require('../config/cedcd.settings')
const timeoutMinutes = Number(settings.sessionTimeoutMinutes || 15);
const maxSessionAge = timeoutMinutes * 60 * 1000; // convert minutes to ms

module.exports = {
    login,
    logout,
    getUserSession,
    updateSession,
}

async function login(request, response) {
    const { headers, session, app, params, query } = request;
    const { loginType } = params;
    const { mysql } = app.locals;
    let {
        user_auth_type: userAuthType,
        user_email: userEmail,
        sm_user: smUser,
    } = headers;
    if (smUser) {
        let match = smUser.match(/CN=([^,]+)/i);
        if (match) smUser = match[1];
    }
    if (!['internal', 'external'].includes(loginType)) {
        return response.status(301).redirect('/');
    }
    const expires = new Date().getTime() + maxSessionAge;

    if (query.refresh && session.user) {
        session.user.refresh = query.refresh;
        return response.json(true);
    }

    try {
        let userName, userRole, userType;

        if (!smUser) {
            userName = 'admin';
            userType = loginType;
            userRole = userType === 'internal'
                ? 'SystemAdmin'
                : 'CohortAdmin'
        } else {
            // otherwise, update user-session variable when hitting authRoutes
            const isFederated = userAuthType === 'federated';
            userType = isFederated ? 'external' : 'internal';
            userName = isFederated ? userEmail : smUser;
        }

        const [user] = await mysql.query(
            `SELECT 
                id, 
                access_level as accessLevel, 
                active_status as activeStatus
            FROM user where user_name = ? `,
            [userName]
        );


        if (user) {
            const userId = user.id;
            if (!userRole) {
                userRole = user.activeStatus === 'Y'
                    ? user.accessLevel
                    : null
            }

            // update last login date
            await mysql.query(
                `update user set last_login = now() 
                where user_name = ?`,
                [userName]
            );

            const cohortAcronyms = await mysql.query(
                `SELECT DISTINCT cohort_acronym as acronym
                FROM cohort_user_mapping 
                WHERE user_id = ? AND active = 'Y'
                ORDER BY acronym ASC`,
                [userId]
            );

            let cohorts = [];

            for (const { acronym } of cohortAcronyms) {
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
                loginType,
                expires,
                // headers,
            };
        } else {
            session.user = {
                id: null,
                type: null,
                name: null,
                role: null,
                cohorts: [],
                active: false,
                loginType,
                expires,
                // headers,
            };
        }

        let redirectUrl = '/';

        if (!user || !session.user.active) {
            redirectUrl = '/unauthorized';
        } else if (/SystemAdmin/.test(session.user.role)) {
            redirectUrl = '/admin/managecohort';
        } else if (/CohortAdmin/.test(session.user.role)) {
            if (session.user.cohorts.length === 1) {
                redirectUrl = `/cohort/questionnaire/${session.user.cohorts[0].id}`;
            } else {
                redirectUrl = `/cohort/questionnaire`;
            }
        }

        response.status(301).redirect(redirectUrl);

    } catch (e) {
        console.error('authentication error', e);
        request.session.destroy(error => {
            response.status(301).redirect('/unauthorized');
        });
    }
}

async function updateSession(request, response) {
    if (!request.session || !request.session.user) {
        response.json(null);
    }

    const { mysql } = request.app.locals;
    const user = request.session.user;
    const userId = user.id;

    const cohortAcronyms = await mysql.query(
        `SELECT DISTINCT cohort_acronym as acronym
        FROM cohort_user_mapping 
        WHERE user_id = ? AND active = 'Y'
        ORDER BY acronym ASC`,
        [userId]
    );

    let cohorts = [];

    for (const { acronym } of cohortAcronyms) {
        const [editableCohorts] = await mysql.query(
            `call select_editable_cohort_by_acronym(?)`,
            [acronym]
        );
        cohorts.push(...editableCohorts);
    }

    user.cohorts = cohorts;
    user.expires = new Date().getTime() + maxSessionAge;
    request.session.user = { ...user };
    response.json(user || null);
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
