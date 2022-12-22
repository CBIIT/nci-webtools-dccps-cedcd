import { createOAuthStrategy } from "./passportStrategies.js";
import config from "../../config/index.js"

export function getAccountType({ preferred_username }) {
  const loginDomain = (preferred_username || "").split("@").pop();
  return loginDomain.endsWith("login.gov") ? "Login.gov" : "NIH";
}

export function createUserSerializer() {
  return (user, done) => done(null, user);
}

export function createUserDeserializer() {
  return async ({ email, preferred_username }, done) => {
    const accountType = getAccountType({ preferred_username });
    console.log(" accountType " + accountType);
   // const user = await userManager.getUserForLogin(email, accountType);
   // done(null, user || {});
   done(null,  {});
  };
}

export async function createDefaultAuthStrategy(config = config) {
  //console.log("passport config ", config);
 // console.dir(config);
  console.log(" end passport config ");
   
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
