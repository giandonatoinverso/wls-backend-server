import * as db from "./lib/db";
import { Request, Response } from "express";
import * as jwtUtils from "./jwtUtils";
import * as SqlString from "sqlstring";

/*
Simple authentication that checks clientId and clientSecret in the http call header in a database to verify that they exist and the user is authorized
 */
export async function simpleAuthMiddleware(req: Request, res: Response, next: any) {
  const clientId = req.header("clientId");
  const clientSecret = req.header("clientSecret");

  const query = SqlString.format(
      `SELECT id, nome, data_registrazione, stato FROM client WHERE clientId = ? AND clientSecret = ?`,
      [clientId, clientSecret],
  );

  db.db.query(query, function (err: unknown, results: any) {
    if (err) {
      res.status(500).json({ error: "Auth: Internal server error" });
      return;
    } else if (results.length === 0) {
      res.status(404).json({ error: "Auth: Client not found" });
      return;
    } else if (!results[0].stato) {
      res.status(401).json({ error: "Auth: Unauthorized" });
      return;
    } else {
      next();
    }
  });
}

/*
Authentication method that in addition to checking simple authentication checks the berear token provided for the API call
 */
export async function jwtAuthMiddleware(req: Request, res: Response, next: any) {
    simpleAuthMiddleware(req, res, async () => {
      try {
        const encryptedAccessToken: string = req.header("Authorization").split(" ")[1];

        const decryptedAccessToken = await jwtUtils.getDecryptedToken(encryptedAccessToken);
        jwtUtils.checkTokenExpiration(decryptedAccessToken);

        next();
      } catch (error) {
        res.status(500).json({ message: error.message });
        return;
      }
    });
}

/*
Authentication method that in addition to checking simple authentication and checking the berear token provided for the API call, checks that it is an access token type token
 */
export async function jwtAccessTokenAuthMiddleware(req: Request, res: Response, next: any) {
  jwtAuthMiddleware(req, res, async () => {
    try {
      const encryptedAccessToken: string = req.header("Authorization").split(" ")[1];
      jwtUtils.removeTokenFromUniqueTokenMap(req.header("clientId"), encryptedAccessToken);

      const decryptedAccessToken = await jwtUtils.getDecryptedToken(encryptedAccessToken);
      jwtUtils.checkTokenType(decryptedAccessToken, "accessToken");

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
      return;
    }
  });
}
