FROM node:16.18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV NODE_ENV=production

RUN npm ci

USER node

CMD npm start