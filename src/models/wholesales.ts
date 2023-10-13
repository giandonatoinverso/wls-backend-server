import * as db from "../lib/db";
import * as SqlString from "sqlstring";
import { InternalServerError, NotFound } from "http-errors";

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

export function getVendite() {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite ORDER BY id DESC`,
            [],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function newVendita(idCliente: number, idVenditore: number, idProdotto: number, quantita: number, importo: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `INSERT INTO vendite (id_cliente, id_venditore, id_prodotto, quantita, importo) VALUES (?, ?, ?, ?, ?)`,
            [idCliente, idVenditore, idProdotto, quantita, importo],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getVendita(idVendita: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id = ?`,
            [idVendita],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            if (results.length === 0) {
                reject(new NotFound("Sale with id: " + idVendita + " not found"));
                return;
            }

            resolve(results);
        });
    });
}

export function getVenditaVenditore(idVendita: number, idVenditore: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id = ? AND id_venditore = ?`,
            [idVendita, idVenditore],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            if (results.length === 0) {
                reject(new NotFound("Sale with id: " + idVendita + " not found"));
                return;
            }

            resolve(results);
        });
    });
}

export function getVenditeVenditore(idVenditore: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id_venditore = ? ORDER BY data_vendita DESC`,
            [idVenditore],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getVenditeCliente(idCliente: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id_cliente = ? ORDER BY data_vendita DESC`,
            [idCliente],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getVenditeClienteVenditore(idCliente: number, idVenditore: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id_cliente = ? AND id_venditore = ? ORDER BY data_vendita DESC`,
            [idCliente, idVenditore],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getVenditeProdotto(idProdotto: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id_prodotto = ? ORDER BY data_vendita DESC`,
            [idProdotto],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getVenditeProdottoVenditore(idProdotto: number, idVenditore: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM vendite WHERE id_prodotto = ? AND id_venditore = ? ORDER BY data_vendita DESC`,
            [idProdotto, idVenditore],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function editVendita(idVendita: number, idCliente: number, idVenditore: number, idProdotto: number, quantita: number, importo: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `UPDATE vendite SET id_cliente = ?, id_venditore = ?, id_prodotto = ?, quantita = ?, importo = ? WHERE id = ?`,
            [idCliente, idVenditore, idProdotto, quantita, importo, idVendita],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function deleteVendita(idVendita: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `DELETE FROM vendite WHERE id = ?`,
            [idVendita],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getProdotti() {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM prodotti ORDER BY id DESC`,
            [],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function newProdotto(sku: string, nome: string, disponibilita: number, prezzo: number, fornitore: string) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `INSERT INTO prodotti (sku, nome, disponibilita, prezzo, fornitore) VALUES (?, ?, ?, ?, ?)`,
            [sku, nome, disponibilita, prezzo, fornitore],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function getProdotto(idProdotto: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `SELECT * FROM prodotti WHERE id = ?`,
            [idProdotto],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            if (results.length === 0) {
                reject(new NotFound("Product with id: " + idProdotto + " not found"));
                return;
            }

            resolve(results);
        });
    });
}

export function editProdotto(idProdotto: number, sku: string, nome: string, disponibilita: number, prezzo: number, fornitore: string) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `UPDATE prodotti SET sku = ?, nome = ?, disponibilita = ?, prezzo = ?, fornitore = ? WHERE id = ?`,
            [sku, nome, disponibilita, prezzo, fornitore, idProdotto],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}

export function deleteProdotto(idProdotto: number) {
    // tslint:disable-next-line:typedef
    return new Promise<any[]>(function (resolve, reject) {
        const query = SqlString.format(
            `DELETE FROM prodotti WHERE id = ?`,
            [idProdotto],
        );


        db.db.query(query, function (err: Error | null, results: any) {
            if (err) {
                return reject(new InternalServerError(err.message));
            }

            resolve(results);
        });
    });
}
