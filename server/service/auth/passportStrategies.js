import axios from "axios";
import { Issuer, Strategy, generators } from "openid-client";
const { codeVerifier, codeChallenge, nonce } = generators;

// Broadcom OAuth Toolkit does not implement the standard OpenID end_session_endpoint
// and instead provides a custom endpoint
export async function logoutOAuthToolkitSession({ baseUrl, clientId, clientSecret, tokenSet }) {
  const url = baseUrl + "/connect/session/logout";
  const auth = { username: clientId, password: clientSecret };
  const { id_token, id_token_type } = tokenSet;
  const params = { id_token, id_token_type };
  const response = await axios.post(url, null, { auth, params });
  return response.data;
}

export async function createOAuthStrategy({ baseUrl, clientId, clientSecret, redirectUris, params }) {
  const { Client } = await Issuer.discover(baseUrl);

  const client = new Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: redirectUris,
    response_types: ["code"],
  });

  return new Strategy({ client, params }, async (tokenSet, done) => {
    const user = await client.userinfo(tokenSet);
    await logoutOAuthToolkitSession({ baseUrl, clientId, clientSecret, tokenSet });
    done(null, user);
  });
}

export async function createPkceStrategy({ baseUrl, clientId, redirectUris, params }) {
  const { Client } = await Issuer.discover(baseUrl);

  const client = new Client({
    client_id: clientId,
    redirect_uris: redirectUris,
    response_types: ["code"],
    token_endpoint_auth_method: "none",
  });

  params = {
    code_challenge: codeChallenge(codeVerifier()),
    code_challenge_method: "S256",
    nonce: nonce(),
    ...params,
  };

  return new Strategy({ client, params }, async (tokenSet, done) => {
    console.log(tokenSet);
    const user = await client.userinfo(tokenSet);
    done(null, user);
  });
}
