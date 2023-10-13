import * as db from "../lib/db";
import * as SqlString from "sqlstring";
import { format, addHours } from "date-fns";
import * as jwtUtils from "../jwtUtils";
import * as oauthScopes from "../oauthScopes";
import { NotFound, InternalServerError } from "http-errors";

export function testKey(clientId: string, clientSecret: string) {
  return new Promise(function (resolve, reject) {
    const query = SqlString.format(
        `SELECT COUNT(*) > 0 AS result FROM client WHERE clientId = ? AND clientSecret = ?`,
        [clientId, clientSecret],
    );

    db.db.query(query, function (err: Error | null, results: any) {
      if (err) {
        return reject(new InternalServerError(err.message));
      }

      if (results.length === 0) {
        reject(new NotFound("Client not found"));
        return;
      }

      resolve(results);
    });
  });
}

export function getClientInfo(clientId: string, clientSecret: string) {
  return new Promise(function (resolve, reject) {
    const query = SqlString.format(
        `SELECT id, nome, data_registrazione, stato FROM client WHERE clientId = ? AND clientSecret = ?`,
        [clientId, clientSecret],
    );

    db.db.query(query, function (err: Error | null, results: any) {
      if (err) {
        return reject(new InternalServerError(err.message));
      }

      if (results.length === 0) {
        reject(new NotFound("Client not found"));
        return;
      }

      resolve(results);
    });
  });
}

export function getUserScopes(accessToken: string): Promise<string[]> {
  return new Promise<string[]>(async (resolve, reject) => {
    try {
      const decryptedAccessToken = await jwtUtils.getDecryptedToken(accessToken);

      const userScopes: string[] = decryptedAccessToken.scopes;
      resolve(userScopes);
    } catch (error) {
      reject(error);
    }
  });
}

export function getUserInfo(username: string, password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {

    const query = SqlString.format(
        `SELECT id, nome, cognome, username, type FROM utenti WHERE username = ? AND password = ?`,
        [username, password],
    );

    db.db.query(query, function (err: Error | null, results: any) {
      if (err) {
        return reject(new InternalServerError(err.message));
      }

      if (results.length === 0) {
        reject(new NotFound("User not found"));
        return;
      } else {
        const user = results[0];
        const scopes = oauthScopes.getScopesForType(user.type);

        const payload = {
          tokenType: "userInfo",
          userInfo: user,
          scopes: scopes,
        };

        const expiresIn = "1m";

        jwtUtils.getEncryptedToken(payload, expiresIn)
            .then((token: string) => {
              resolve(token);
            })
            .catch((error: any) => {
              reject(error);
            });
      }
    });
  });
}

export function getAuthorizationCode(userInfoToken: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {

    try {
      const decryptedUserInfo = await jwtUtils.getDecryptedToken(userInfoToken);
      jwtUtils.checkTokenType(decryptedUserInfo, "userInfo");

      const payload = {
        tokenType: "authorizationCode",
        id: decryptedUserInfo.userInfo.id,
        username: decryptedUserInfo.userInfo.username,
        scopes: decryptedUserInfo.scopes,
      };

      const expiresIn = "1m";

      jwtUtils.getEncryptedToken(payload, expiresIn)
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: any) => {
            reject(error);
          });
    } catch (error) {
      reject(error);
    }
  });
}

export function exchangeAuthorizationCodeAccessToken(clientId: string, authorizationCode: string): Promise<{ accessToken: string, refreshToken: string, refreshTokenExpiration: string }> {
  return new Promise<{ accessToken: string, refreshToken: string, refreshTokenExpiration: string }>(async (resolve, reject) => {

    const decryptedAuthorizationCode = await jwtUtils.getDecryptedToken(authorizationCode);
    jwtUtils.checkTokenType(decryptedAuthorizationCode, "authorizationCode");

    const accessTokenPayload = {
      tokenType: "accessToken",
      id: decryptedAuthorizationCode.id,
      username: decryptedAuthorizationCode.username,
      scopes: decryptedAuthorizationCode.scopes,
    };

    const refreshTokenPayload = {
      tokenType: "refreshToken",
      id: decryptedAuthorizationCode.id,
      username: decryptedAuthorizationCode.username,
      scopes: decryptedAuthorizationCode.scopes,
    };

    const accessTokenExpiresIn = "1m";
    const refreshTokenExpiresIn = "1h";

    const createAccessTokenPromise = jwtUtils.getEncryptedToken(accessTokenPayload, accessTokenExpiresIn);
    const createRefreshTokenPromise = jwtUtils.getEncryptedToken(refreshTokenPayload, refreshTokenExpiresIn);

    const refreshTokenExpiration = format(addHours(new Date(), 1), "yyyy-MM-dd HH:mm:ss");

    Promise.all([createAccessTokenPromise, createRefreshTokenPromise])
        .then(([accessToken, refreshToken]) => {
          jwtUtils.addUniqueAccessToken(clientId, accessToken);
          resolve({accessToken, refreshToken, refreshTokenExpiration});
        })
        .catch((error: any) => {
          reject(error);
        });
  });
}

export function exchangeRefreshTokenAccessToken(clientId: string, refreshToken: string): Promise<{ accessToken: string, refreshToken: string, refreshTokenExpiration: string }> {
  return new Promise<{ accessToken: string, refreshToken: string, refreshTokenExpiration: string }>(async (resolve, reject) => {

    const decryptedRefreshToken = await jwtUtils.getDecryptedToken(refreshToken);
    jwtUtils.checkTokenType(decryptedRefreshToken, "refreshToken");

    const accessTokenPayload = {
      tokenType: "accessToken",
      id: decryptedRefreshToken.id,
      username: decryptedRefreshToken.username,
      scopes: decryptedRefreshToken.scopes,
    };

    const refreshTokenPayload = {
      tokenType: "refreshToken",
      id: decryptedRefreshToken.id,
      username: decryptedRefreshToken.username,
      scopes: decryptedRefreshToken.scopes,
    };

    const accessTokenExpiresIn = "1m";
    const refreshTokenExpiresIn = "1h";

    const createAccessTokenPromise = jwtUtils.getEncryptedToken(accessTokenPayload, accessTokenExpiresIn);
    const createRefreshTokenPromise = jwtUtils.getEncryptedToken(refreshTokenPayload, refreshTokenExpiresIn);

    const refreshTokenExpiration = format(addHours(new Date(), 1), "yyyy-MM-dd HH:mm:ss");

    Promise.all([createAccessTokenPromise, createRefreshTokenPromise])
        // tslint:disable-next-line:no-shadowed-variable
        .then(([accessToken, refreshToken]) => {
          jwtUtils.addUniqueAccessToken(clientId, accessToken);
          resolve({accessToken, refreshToken, refreshTokenExpiration});
        })
        .catch((error: any) => {
          reject(error);
        });
  });
}
