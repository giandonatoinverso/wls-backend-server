import { NextFunction, Request, Response } from "express";
import * as provider from "../providers/wholesales";
import * as providerUtenti from "../providers/utenti";
import * as jwtUtils from "../jwtUtils";

export async function testKey(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await provider.testKey(req.body.clientId, req.body.clientSecret);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

/* Vendite */

export async function listVendite(req: Request, res: Response, next: NextFunction) {
    try {
        const customRule = (requiredScopes: any[], tokenScopes: string | any[]) => {
            return requiredScopes.some(scope => tokenScopes.includes(scope));
        };

        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 0, customRule);
        const result = await provider.listVendite(DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function newVendita(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 1);

        const idCliente = parseInt(req.body.idCliente);
        const idVenditore = parseInt(req.body.idVenditore);
        const idProdotto = parseInt(req.body.idProdotto);
        const quantita = parseInt(req.body.quantita);
        const importo = parseFloat(req.body.importo);

        // check existence
        const cliente = await providerUtenti.getUtenteById(idCliente, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        const venditore = await providerUtenti.getUtenteById(idVenditore, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        const prodotto = await provider.getProdotto(idProdotto);

        const result = await provider.newVendita(idCliente, idVenditore, idProdotto, quantita, importo, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getVendita(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 1);

        const idVendita = parseInt(req.params.idVendita);

        const result = await provider.getVendita(idVendita, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getVenditeVenditore(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 1);

        const idVenditore = parseInt(req.params.idVenditore);

        const result = await provider.getVenditeVenditore(idVenditore, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getVenditeCliente(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 2);

        const idCliente = parseInt(req.params.idCliente);

        const result = await provider.getVenditeCliente(idCliente, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getVenditeProdotto(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 1);

        const idProdotto = parseInt(req.params.idProdotto);

        const result = await provider.getVenditeProdotto(idProdotto, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function editVendita(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 1);

        const idVendita = parseInt(req.body.idVendita);
        const idCliente = parseInt(req.body.idCliente);
        const idVenditore = parseInt(req.body.idVenditore);
        const idProdotto = parseInt(req.body.idProdotto);
        const quantita = parseInt(req.body.quantita);
        const importo = parseFloat(req.body.importo);

        // check existence
        const vendita = await provider.getVendita(idVendita, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        const cliente = await providerUtenti.getUtenteById(idCliente, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        const venditore = await providerUtenti.getUtenteById(idVenditore, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        const prodotto = await provider.getProdotto(idProdotto);

        const result = await provider.editVendita(idVendita, idCliente, idVenditore, idProdotto, quantita, importo, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function deleteVendita(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 1);

        const idVendita = parseInt(req.body.idVendita);

        // check existence
        const vendita = await provider.getVendita(idVendita, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);

        const result = await provider.deleteVendita(idVendita, DecryptedTokenAndScopes.decryptedAccessToken.id, DecryptedTokenAndScopes.foundScopes);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

/* Prodotti */

export async function listProdotti(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await provider.listProdotti();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function newProdotto(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 0);

        const sku = req.body.sku;
        const nome = req.body.nome;
        const disponibilita = parseInt(req.body.disponibilita);
        const prezzo = parseInt(req.body.prezzo);
        const fornitore = req.body.fornitore;

        const result = await provider.newProdotto(sku, nome, disponibilita, prezzo, fornitore);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getProdotto(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 0);

        const idProdotto = parseInt(req.params.idProdotto);

        const result = await provider.getProdotto(idProdotto);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function editProdotto(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 0);

        const idProdotto = parseInt(req.body.idProdotto);
        const sku = req.body.sku;
        const nome = req.body.nome;
        const disponibilita = parseInt(req.body.disponibilita);
        const prezzo = parseInt(req.body.prezzo);
        const fornitore = req.body.fornitore;

        // check existence
        const prodotto = await provider.getProdotto(idProdotto);

        const result = await provider.editProdotto(idProdotto, sku, nome, disponibilita, prezzo, fornitore);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function deleteProdotto(req: Request, res: Response, next: NextFunction) {
    try {
        const DecryptedTokenAndScopes: any = await jwtUtils.getDecryptedTokenAndScopes(req, 0);

        const idProdotto = parseInt(req.body.idProdotto);

        // check existence
        const prodotto = await provider.getProdotto(idProdotto);

        const result = await provider.deleteProdotto(idProdotto);
        res.json(result);
    } catch (err) {
        next(err);
    }
}
