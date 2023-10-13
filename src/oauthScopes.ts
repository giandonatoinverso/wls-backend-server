import { NotFound, InternalServerError } from "http-errors";

const scopes = [
    [
        "c_all_prodotti",
        "r_all_prodotti",
        "u_all_prodotti",
        "d_all_prodotti",
        "c_self_vendite",
        "r_self_vendite",
        "u_self_vendite",
        "d_self_vendite",
        "c_all_vendite",
        "r_all_vendite",
        "u_all_vendite",
        "d_all_vendite",
    ],
    [
        "r_all_prodotti",
        "c_self_vendite",
        "r_self_vendite",
        "u_self_vendite",
        "d_self_vendite",
    ],
    [
        "r_all_prodotti",
        "r_self_vendite",
    ],
];

export function getScopesForType(type: number): string[] {
    switch (type) {
        case 0:
            return scopes[0];
        case 1:
            return scopes[1];
        case 2:
            return scopes[2];
        default:
            throw new InternalServerError("Invalid type");
    }
}

export function checkScopesInToken(token: any, type: number, customRule: ((scopes: string[], tokenScopes: string[]) => boolean) | null = null) {
    const requiredScopes = scopes[type];
    const foundScopes = [];

    if (customRule !== null) {
        for (const scope of requiredScopes) {
            if (token.scopes.includes(scope)) {
                foundScopes.push(scope);
            }
        }
        return {
            result: customRule(requiredScopes, token.scopes),
            foundScopes: foundScopes,
        };
    }

    for (const scope of requiredScopes) {
        if (token.scopes.includes(scope)) {
            foundScopes.push(scope);
        } else {
            return {
                result: false,
                foundScopes: foundScopes,
            };
        }
    }

    return {
        result: true,
        foundScopes: foundScopes,
    };
}


