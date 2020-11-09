module.exports = {
    authenticationMiddleware,
    getUserSession,
    logout,
}

const authRoutes = [
    '^/admin/\w+$',
    '^/cohort/questionnaire/\w+$',
    // '^/login/internal\/?$',
    // '^/login/external\/?$',
].map(pattern => new RegExp(pattern));

function authenticationMiddleware(request, response, next) {
    const { url, headers, session } = request;
    
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === 'development') {
        session.user = {
            type: 'admin',
            name: 'dev_admin',
            role: 'admin',
        };
    } else if (nodeEnv === 'production' && headers.sm_user) {

        if (authRoutes.some(regex => regex.test(url))) {
            const { 
                user_auth_type: userAuthType, 
                fed_email: fedEmail, 
                sm_user: smUser 
            } = headers;

            const userType = userAuthType === 'federated' ? 'external' : 'internal';
            const userName = userType === 'external' ? fedEmail : smUser;

            session.user = {
                type: userType,
                name: userName,
                role: 'admin',
            };
        }
    }

    next();
}

// note: both federated NIH Auth use siteminder under the hood to authenticate users
// so we can use the global siteminder agent logout route to invalidate our current session
function logout(request, response) {
    req.session.user = null;
    response.redirect(301, 'https://auth.nih.gov/siteminderagent/smlogout.asp');
}

function getUserSession(request, response) {
    response.json(request.session.user);
}
