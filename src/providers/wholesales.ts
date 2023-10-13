import * as datamodel from "../models/wholesales";
import * as oauthScopes from "../oauthScopes";
import { InternalServerError } from "http-errors";

export async function testKey(clientId: string, clientSecret: string) {
    return datamodel.testKey(clientId, clientSecret);
}

/* Vendite */

export async function listVendite(idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.getVendite();
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeVenditore(idUtente);
    } else if (oauthScopes.getScopesForType(2).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeCliente(idUtente);
    }
}

export async function newVendita(idCliente: number, idVenditore: number, idProdotto: number, quantita: number, importo: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.newVendita(idCliente, idVenditore, idProdotto, quantita, importo);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        if (idVenditore === idUtente) {
            return datamodel.newVendita(idCliente, idVenditore, idProdotto, quantita, importo);
        } else {
            return new InternalServerError("You cannot make a sale that is not yours, with your privileges");
        }
    }
}

export async function getVendita(idVendita: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.getVendita(idVendita);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditaVenditore(idVendita, idUtente);
    }
}

export async function getVenditeVenditore(idVenditore: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeVenditore(idVenditore);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        if (idVenditore === idUtente) {
            return datamodel.getVenditeVenditore(idVenditore);
        } else {
            return new InternalServerError("You cannot request sales of other vendor, with your privileges");
        }
    }
}

export async function getVenditeCliente(idCliente: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeCliente(idCliente);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeClienteVenditore(idCliente, idUtente);
    } else if (oauthScopes.getScopesForType(2).every(scope => scopes.includes(scope))) {
        if (idCliente === idUtente) {
            return datamodel.getVenditeCliente(idCliente);
        } else {
            return new InternalServerError("You cannot request sales of other users, with your privileges");
        }
    }
}

export async function getVenditeProdotto(idProdotto: number, idVenditore: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeProdotto(idProdotto);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        return datamodel.getVenditeProdottoVenditore(idProdotto, idVenditore);
    }
}

export async function editVendita(id: number, idCliente: number, idVenditore: number, idProdotto: number, quantita: number, importo: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.editVendita(id, idCliente, idVenditore, idProdotto, quantita, importo);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        const result = await datamodel.getVenditaVenditore(id, idUtente);
        if (result.length !== 0) {
            return datamodel.editVendita(id, idCliente, idVenditore, idProdotto, quantita, importo);
        } else {
            return new InternalServerError("You cannot modify a sale that is not yours, with your privileges");
        }
    }
}

export async function deleteVendita(idVendita: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(0).every(scope => scopes.includes(scope))) {
        return datamodel.deleteVendita(idVendita);
    } else if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        const result = await datamodel.getVenditaVenditore(idVendita, idUtente);
        if (result.length !== 0) {
            return datamodel.deleteVendita(idVendita);
        } else {
            return new InternalServerError("You cannot delete a sale that is not yours, with your privileges");
        }
    }
}

/* Prodotti */
export async function listProdotti() {
    return datamodel.getProdotti();
}

export async function newProdotto(sku: string, nome: string, disponibilita: number, prezzo: number, fornitore: string) {
    return datamodel.newProdotto(sku, nome, disponibilita, prezzo, fornitore);
}

export async function getProdotto(idProdotto: number) {
    return datamodel.getProdotto(idProdotto);
}

export async function editProdotto(idProdotto: number,  sku: string, nome: string, disponibilita: number, prezzo: number, fornitore: string) {
    return datamodel.editProdotto(idProdotto, sku, nome, disponibilita, prezzo, fornitore);
}

export async function deleteProdotto(idProdotto: number) {
    return datamodel.deleteProdotto(idProdotto);
}
