import { NextFunction, Request, Response } from "express";
import * as provider from "../providers/utenti";
import * as jwtUtils from "../jwtUtils";


export async function getUtenteById(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 2);

        const id = parseInt(req.params.id);

        const result = await provider.getUtenteById(id, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getUtenteByUsername(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 2);

        const result = await provider.getUtenteByUsername(req.params.username, DecryptedTokenAndScopes.decryptedAccessToken.username, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}
