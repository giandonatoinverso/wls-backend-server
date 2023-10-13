import * as datamodel from "../models/utenti";
import * as oauthScopes from "../oauthScopes";
import { NotFound } from "http-errors";

export async function getUtenteById(id: number, idUtente: number, scopes: string[]) {
    if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        return datamodel.getUtenteById(id);
    } else {
        return new Promise((resolve, reject) => {
            if (id === idUtente) {
                resolve(datamodel.getUtenteById(id));
            } else {
                reject(new NotFound("You cannot request another user other than your own, with your privileges"));
            }
        });
    }
}

export async function getUtenteByUsername(username: string, usernameUtente: string, scopes: string[]) {
    if (oauthScopes.getScopesForType(1).every(scope => scopes.includes(scope))) {
        return datamodel.getUtenteByUsername(username);
    } else {
        return new Promise((resolve, reject) => {
            if (username === usernameUtente) {
                resolve(datamodel.getUtenteByUsername(username));
            } else {
                reject(new NotFound("You cannot request another user other than your own, with your privileges"));
            }
        });
    }
}
