import { env } from "../../common/zod/env";

const ISSUER = env.BASE_URL;
const AUTHORIZATION_ENDPOINT = `${env.BASE_URL}/authorize`;
const TOKEN_ENDPOINT = `${env.BASE_URL}/token`;
const USERINFO_ENDPOINT = `${env.BASE_URL}/userinfo`;
const JWKS_URI = `${env.BASE_URL}/ jwks.json`;

export const SERVICE_DISCOVERY_ENDPOINTS = {
  issuer: ISSUER,
  authorization_enpoint: AUTHORIZATION_ENDPOINT,
  token_endpoint: TOKEN_ENDPOINT,
  userinfo_endpoint: USERINFO_ENDPOINT,
  jwks_uri: JWKS_URI,
};
