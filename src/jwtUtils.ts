import * as filepath from "path";
import * as jwt from "jsonwebtoken";
import { InternalServerError, NotFound } from "http-errors";
import { Request } from "express";
import * as oauthScopes from "./oauthScopes";


const uniqueAccessTokenMap: Record<string, string[]> = {};

export function addUniqueAccessToken(clientId: string, token: string) {
    if (!uniqueAccessTokenMap[clientId]) {
        uniqueAccessTokenMap[clientId] = [];
    }
    uniqueAccessTokenMap[clientId].push(token);
}

export function removeTokenFromUniqueTokenMap(clientId: string, token: string) {
    const tokens = uniqueAccessTokenMap[clientId];

    if (tokens) {
        const tokenIndex = tokens.indexOf(token);
        if (tokenIndex !== -1) {
            tokens.splice(tokenIndex, 1);
        } else {
            throw new InternalServerError("jwt access token already used");
        }
    } else {
        throw new NotFound("clientId not found");
    }
}

export function checkTokenExpiration(token: any) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) {
        throw new InternalServerError("Token has expired");
    }
}

export function checkTokenType(token: any, type: string) {
    if (token.tokenType !== type) {
        throw new InternalServerError("Wrong token type");
    }
}

/*
Encrypt the payload for the JWT token with the public key for authenticity and confidentiality.
Sign the jwt token with the private key for authenticity
 */
export function getEncryptedToken(payloadInput: any, expiresIn: string, options?: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {

        const fs = require("fs");

        // tslint:disable-next-line:no-shadowed-variable
        const crypto = require("crypto");
        const encryptionOptions = {
            key: fs.readFileSync(filepath.join(__dirname, "key", "public-key.pem"), "utf8"),
            format: "pem",
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        };

        const encryptedPayload = crypto.publicEncrypt(encryptionOptions, Buffer.from(JSON.stringify(payloadInput)));
        const base64EncryptedPayload = encryptedPayload.toString("base64");

        const payload = {
            data: base64EncryptedPayload,
        };

        const Jwtoptions: jwt.SignOptions = {
            algorithm: "RS256",
            expiresIn,
        };

        if (options) {
            Object.assign(Jwtoptions, options);
        }

        const privateKeyPEM = fs.readFileSync(filepath.join(__dirname, "key", "private-key.pem"), "utf8");
        const privateKey = crypto.createPrivateKey({
            key: privateKeyPEM,
            format: "pem",
            passphrase: process.env.OPENSSL_PASSPHRASE,
        });

        jwt.sign(payload, privateKey, Jwtoptions, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token || "");
            }
        });
    });
}

/*
Get the token decrypted
 */
export async function getDecryptedToken(inputToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:no-shadowed-variable
        const crypto = require("crypto");
        const privateKeyPath = filepath.join(__dirname, "key", "private-key.pem");
        const publicKeyPath = filepath.join(__dirname, "key", "public-key.pem");

        const fs = require("fs");
        const privateKeyPEM = fs.readFileSync(privateKeyPath, "utf8");

        try {
            const publicKey = fs.readFileSync(publicKeyPath, "utf8");
            const verifiedToken: any = jwt.verify(inputToken, publicKey, { algorithms: ["RS256"] });

            const base64EncryptedPayload = verifiedToken.data;

            const encryptionOptions = {
                key: privateKeyPEM,
                format: "pem",
                passphrase: process.env.OPENSSL_PASSPHRASE,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            };

            const decryptedPayloadBuffer = crypto.privateDecrypt(encryptionOptions, Buffer.from(base64EncryptedPayload, "base64"));
            const decryptedPayload = JSON.parse(decryptedPayloadBuffer.toString("utf8"));

            resolve(decryptedPayload);
        } catch (err) {
            reject(err);
        }
    });
}

/*
Get the token decrypted and the scopes contained
 */
export async function getDecryptedTokenAndScopes(req: Request, type: number, customRule: ((scopes: string[], tokenScopes: string[]) => boolean) | null = null) {
    const decryptedAccessToken: any = await getDecryptedToken(req.header("Authorization").split(" ")[1]);
    const result = oauthScopes.checkScopesInToken(decryptedAccessToken, type, customRule);

    if (!result.result) {
        throw new InternalServerError("Invalid scopes for endpoint called");
    }

    const foundScopes = result.foundScopes;

    return {
        decryptedAccessToken: decryptedAccessToken,
        foundScopes: foundScopes,
    };
}

export function clearUniqueAccessTokens() {
    // tslint:disable-next-line:forin
    for (const clientId in uniqueAccessTokenMap) {
        delete uniqueAccessTokenMap[clientId];
    }
}

/*
Clears the map of used jwts every hour
 */
export function startTokenCleanupInterval() {
    setInterval(clearUniqueAccessTokens, 3600000);
}
