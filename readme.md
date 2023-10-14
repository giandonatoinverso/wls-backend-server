The project is a TypeScript application that serves as both a local OAuth authentication server and a backend for a wholesale system, which allows you to manage simple CRUD operations on products and sales based on different access privileges.

## Overview

The software is structured to ensure security and flexibility in authentication, allowing users to access different features based on their privileges. The key features of the system are listed below:

- **OAuth Authentication**: The application acts as an OAuth authentication server, allowing users to authenticate and obtain access tokens to protect sensitive resources.

- **User Management**: Users can access their specific information and privileges. Two-level authentication (Simple Auth and JWT Auth) ensures the security of operations.

- **Sales Management**: Users can perform CRUD operations on sales, view specific sales for sellers, customers or products, and edit or delete existing sales.

- **Product Management**: Users can perform CRUD operations on products, access specific product information, and make changes or delete them.

## Middleware

The application uses middleware to provide authentication and authorization based on user roles. The key middlewares are listed below:

- `simpleAuthMiddleware`: Requires basic authentication (CLIENT_ID and CLIENT_SECRET credentials of applications connecting to the backend) for operations requiring a minimum level of security.

- `jwtAccessTokenAuthMiddleware`: Requires the use of single-use JWT access tokens for authentication, ensuring secure access to resources.

## Access privileges

- Level 0
    - CRUD products
    - CRUD sales

- Level 1
    - R products
    - CRUD sales of own account

- Level 2
    - R products
    - R sales of own account

## Local setup

```bash
git clone <repository>
yarn install
npm install
npm start
```

## Docker setup

```bash
docker compose build --no-cache && docker compose -p wslStack up -d
```

## Publication

```bash
task build publish-docker
```

## Separate Use of the OAuth Authentication Part and the Backend

This project offers the possibility to separately use the OAuth authentication part and the backend part for the wholesale service. 

For both cases provided below the requirements are a private/public 4096 bit RSA pair keys and a MySQL database to store and manage data: https://github.com/giandonatoinverso/wsl-db

- OAuth authentication
    - The OAuth authentication part can be tested yourself by creating a custom client or using an application like Postman.

- Backend of the Wholesailing Service
    - The backend part of the wholesale service can be tested with a sample client that authenticates with the OAuth authentication server and uses the backend APIs:
https://github.com/giandonatoinverso/wls-productsales-app
