import { createOAuthStrategy } from "./passportStrategies.js";
import cedcd_settings from  "../../config/cedcd_settings.js";

export function getAccountType({ preferred_username }) {
  const loginDomain = (preferred_username || "").split("@").pop();
  return loginDomain.endsWith("login.gov") ? "CohortAdmin" : "SystemAdmin";
}

export function createUserSerializer() {
  return (user, done) => done(null, user);
}

export function createUserDeserializer(userManager) {
  return async ({ email, preferred_username }, done) => {
    const accountType = getAccountType({ preferred_username });
    const user = await userManager.getUserForLogin(email, accountType);
    const expires = new Date().getTime() + cedcd_settings.maxSessionAge;
    user.expires = expires;
    done(null, user || {});
   
  };
}

export async function createDefaultAuthStrategy(config = config) {   
  return await createOAuthStrategy({
    name: "default",
    clientId: config.oauth2_client_id,
    clientSecret: config.oauth2_secret,
    baseUrl: config.oauth2_base_url,
    redirectUris: [config.oauth2_redirect_uri],
    params: {
      scope: "openid profile email",
      prompt: "login",
    },
  });
}
