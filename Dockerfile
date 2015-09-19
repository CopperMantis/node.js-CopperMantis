FROM node:0.12.7-slim

MAINTAINER Jossemar Cordero <hello@jossemargt.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]

ENV NODE_ENV 'production'
ENV PORT 1337

EXPOSE $PORT

COPY package.json /usr/src/app/package.json
RUN npm install --production
COPY . /usr/src/app

CMD ["/usr/local/bin/npm", "start"]
