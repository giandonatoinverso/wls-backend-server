Il backend (typescript) avrà una sezione separata con API che hanno funzionalità di authentication server locale, 
il quale gestirà l'autenticazione e l'autorizzazione con privilegi diversi.

Il client (php) avrà un login in cui gli utenti, già registrati e con privilegi diversi, si autenticheranno chiedendo 
un authorization code al server, che successivamente scambieranno per un access token che servirà come bearer token per 
le chiamate ad altri endpoint del backend. Inoltre sarà fornito un refresh token che consentirà di richiedere altri 
access token senza una nuova autenticazione (con un limite di tempo).

Gli utenti, in base al proprio livello di privilegio, saranno abilitati a chiamare determinati endpoint del backend, 
che avranno semplici funzionalità CRUD in un database.

---

Primo access token da usare per ottenere gli scopes dell’utente

API:

Livello 0
CRUD prodotti
CRUD vendite

Livello 1
CRUD vendite

Livello 2
R prodotti
R vendite solo proprio username

# Installazione
Utilizzare Docker per creare uno stack con una immagine pubblicata.

```
docker compose -f docker-compose_dev.yaml up -d
```

# Pubblicazione
Incrementare la versione a mano in package.json e package_dist.json

```
yarn install
npm install
task build publish-docker
```
