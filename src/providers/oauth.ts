import * as datamodel from "../models/oauth";

export async function testKey(clientId: string, clientSecret: string) {
  return datamodel.testKey(clientId, clientSecret);
}

export async function getClientInfo(clientId: string, clientSecret: string) {
  return datamodel.getClientInfo(clientId, clientSecret);
}

export async function getUserScopes(accessToken: string) {
  return datamodel.getUserScopes(accessToken);
}

export async function getUserInfo(username: string, password: string) {
  return datamodel.getUserInfo(username, password);
}

export async function getAuthorizationCode(userInfoToken: string) {
  return datamodel.getAuthorizationCode(userInfoToken);
}

export async function exchangeAuthorizationCodeAccessToken(clientId: string, authorizationCode: string) {
  return datamodel.exchangeAuthorizationCodeAccessToken(clientId, authorizationCode);
}

export async function exchangeRefreshTokenAccessToken(clientId: string, refreshToken: string) {
  return datamodel.exchangeRefreshTokenAccessToken(clientId, refreshToken);
}
