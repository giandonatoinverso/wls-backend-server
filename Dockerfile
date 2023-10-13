FROM node:16-alpine

RUN apk add --no-cache bash

RUN mkdir /opt/wls-backend-server
WORKDIR /opt/wls-backend-server

COPY ./dist/package.json ./
RUN npm install --production

COPY ./dist ./

ENV NODE_ENV=production
EXPOSE 8083

CMD node ./index.js

