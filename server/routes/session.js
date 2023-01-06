import Router from "express-promise-router";
import passport from "passport";

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
  (request, response) => {
    request.session.expires = request.session.cookie.expires;
    const destination = request.query.state || "/";
    response.redirect(destination);
  }
);

// if (!user || !session.user.active) {
//   redirectUrl = '/unauthorized';
// } else if (/SystemAdmin/.test(session.user.role)) {
//   redirectUrl = '/admin/managecohort';
// } else if (/CohortAdmin/.test(session.user.role)) {
//   if (session.user.cohorts.length === 1) {
//       redirectUrl = `/cohort/questionnaire/${session.user.cohorts[0].id}`;
//   } else {
//       redirectUrl = `/cohort/questionnaire`;
//   }
// }

router.get("/api/logout", (request, response) => {
  request.logout(() => response.redirect("/"));
});

router.get("api/session", (request, response) => {
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

export default router;
