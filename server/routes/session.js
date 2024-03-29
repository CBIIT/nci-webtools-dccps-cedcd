import Router from "express-promise-router";
import passport from "passport";
import cedcd_settings from "../config/cedcd_settings.js";

const router = Router();

router.get(
  "/api/login",
  (request, response, next) => {
    const destination = request.query.destination || "/";
    passport.authenticate("default", {
      failureRedirect: "/api/login",
      state: destination,
    })(request, response, next);
  },
  async (request, response) => {
    request.session.expires = request.session.cookie.expires;
    const destination = await getDestLink(request);
    response.redirect(destination);
  },
);

router.get("/api/logout", (request, response) => {
  request.logout(() => response.redirect("/"));
});

router.get("/api/session", (request, response) => {
  const { session } = request;
  if (session.passport?.user) {
    response.json({
      authenticated: true,
      expires: session.expires,
      user: request.user,
    });
  } else {
    response.json({ authenticated: false });
  }
});

router.post("/api/session", (request, response) => {
  const { session } = request;
  if (session.passport?.user) {
    session.touch();
    session.expires = session.cookie.expires;
    response.json({
      authenticated: true,
      expires: session.expires,
      user: request.user,
    });
  } else {
    response.json({ authenticated: false });
  }
});

router.get("/api/user-session", (request, response) => {
  const { session } = request;

  if (session.passport?.user) {
    let user = { ...request?.user };
    if (user.expires) {
      user.expires = new Date(session.expires).getTime();
    }

    response.json({
      authenticated: true,
      expires: user.expires ? user.expires : session.expires,
      user: user || null,
    });
  } else {
    response.json(null);
  }
});

router.get("/api/update-session", async (request, response) => {
  if (request?.user == undefined || request?.user == null) {
    console.log(" undefined user ");
    response.json(null);
  } else {
    const { userManager } = request.app.locals;
    const user = await userManager.updateUserSession(request.user);
    if (user) {
      user.expires = new Date().getTime() + parseInt(cedcd_settings.maxSessionAge);
    }

    const { session } = request;
    session.touch();
    session.expires = user.expires;
    request.user = { ...user };
    response.json({
      authenticated: true,
      expires: session.expires,
      user: request?.user,
    });
  }
});

export async function getDestLink(request) {
  let destination = request.query.state || "/";

  if (!request.user || !request.user.email) {
    destination = "/unauthorized";
  } else {
    const loginDomain = (request.user.preferred_username || "").split("@").pop();
    const accountType = loginDomain.endsWith("login.gov") ? "Login.gov" : "NIH";
    const { userManager } = request.app.locals;
    let userobj = await userManager.getUserForLogin(request.user.email, accountType);
    if (userobj && userobj.role) {
      if (/SystemAdmin/.test(userobj.role)) {
        destination = "/admin/managecohort";
      } else if (/CohortAdmin/.test(userobj.role)) {
        if (userobj.cohorts.length === 1) {
          destination = `/cohort/questionnaire/${userobj.cohorts[0].id}`;
        } else {
          destination = `/cohort/questionnaire`;
        }
      }
    } else {
      destination = "/unauthorized";
    }
  }
  return destination;
}

export default router;
