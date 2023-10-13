import { NextFunction, Request, Response } from "express";
import * as provider from "../providers/oauth";

export async function testKey(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.testKey(req.body.clientId, req.body.clientSecret);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getClientInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.getClientInfo(req.body.clientId, req.body.clientSecret);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getUserScopes(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.getUserScopes(req.header("Authorization").split(" ")[1]);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.getUserInfo(req.body.username, req.body.password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAuthorizationCode(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.getAuthorizationCode(req.header("Authorization").split(" ")[1]);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function exchangeAuthorizationCodeAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.exchangeAuthorizationCodeAccessToken(req.header("clientId"), req.header("Authorization").split(" ")[1]);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function exchangeRefreshTokenAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await provider.exchangeRefreshTokenAccessToken(req.header("clientId"), req.header("Authorization").split(" ")[1]);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
