Il progetto è un'applicazione TypeScript che funge sia da server di autenticazione OAuth locale che da backend per un sistema di vendita all'ingrosso, il quale permette di gestire semplici operazioni CRUD su prodotti e vendite in base a diversi privilegi d'accesso.

## Panoramica

Il software è strutturato in modo da garantire sicurezza e flessibilità nell'autenticazione, consentendo agli utenti di accedere a diverse funzionalità in base ai loro privilegi. Di seguito vengono elencate le funzionalità chiave del sistema:

- **Autenticazione OAuth**: L'applicazione funge da server di autenticazione OAuth, consentendo agli utenti di autenticarsi e ottenere token di accesso per proteggere le risorse sensibili.

- **Gestione Utenti**: Gli utenti possono accedere alle proprie informazioni e ai loro privilegi specifici. L'autenticazione a due livelli (Simple Auth e JWT Auth) garantisce la sicurezza delle operazioni.

- **Gestione Vendite**: Gli utenti possono eseguire operazioni CRUD sulle vendite, visualizzare vendite specifiche per venditori, clienti o prodotti, e modificare o eliminare vendite esistenti.

- **Gestione Prodotti**: Gli utenti possono eseguire operazioni CRUD sui prodotti, accedere a informazioni specifiche sui prodotti e apportare modifiche o eliminarli.

## Middleware

L'applicazione utilizza middleware per garantire l'autenticazione e l'autorizzazione in base ai ruoli degli utenti. Di seguito vengono elencati i middleware chiave:

- `simpleAuthMiddleware`: Richiede l'autenticazione di base (credenziali CLIENT_ID e CLIENT_SECRET delle applicazioni che si connettono al backend) per le operazioni che richiedono un livello minimo di sicurezza.

- `jwtAccessTokenAuthMiddleware`: Richiede l'utilizzo di access token JWT monouso per l'autenticazione, garantendo un accesso sicuro alle risorse.

## Privilegi

- Livello 0
    - CRUD prodotti
    - CRUD vendite

- Livello 1
    - R prodotti
    - CRUD vendite del proprio account

- Livello 2
    - R prodotti
    - R vendite del proprio account

## Setup locale

Per installare e avviare l'applicazione localmente, seguire le istruzioni seguenti

```bash
git clone <URL_del_repository>
yarn install
npm install
npm start
```

## Setup con docker

```bash
docker compose -f docker-compose_dev.yaml up -d
```

## Pubblicazione

```bash
task build publish-docker
```

## Utilizzo Separato della Parte di Autenticazione OAuth e del Backend

Questo progetto offre la possibilità di utilizzare separatamente la parte di autenticazione OAuth e la parte del backend per il servizio all'ingrosso. Di seguito sono fornite istruzioni per entrambi i casi:

- Autenticazione OAuth
    - La parte di autenticazione OAuth può essere testata autonomamente creando un client personalizzato o utilizzando un'applicazione come Postman.

- Backend del Servizio Wholesailing

La parte del backend del servizio all'ingrosso richiede l'utilizzo di un database MySQL per archiviare e gestire i dati:
https://github.com/giandonatoinverso/wsl-db

Inoltre, è disponibile un client d'esempio che si autentica con il server di autenticazione OAuth e utilizza le API del backend:
https://github.com/giandonatoinverso/wls-productsales-app
