import * as db from "../lib/db";
import * as SqlString from "sqlstring";
import { InternalServerError, NotFound } from "http-errors";

export function getUtenteById(id: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT id, nome, cognome, username FROM utenti WHERE id = ?`,
            [id],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            if (results.length === 0) {
                reject(new NotFound("User with id: " + id + " not found"));
                return;
            }

            resolve(results);
        });
    });
}

export function getUtenteByUsername(username: string) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT id, nome, cognome, username FROM utenti WHERE username = ?`,
            [username],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            if (results.length === 0) {
                reject(new NotFound("User with username: " + username + " not found"));
                return;
            }

            resolve(results);
        });
    });
}
