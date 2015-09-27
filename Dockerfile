FROM node:0.12.7

MAINTAINER Jossemar Cordero <hello@jossemargt.com>

ENV NODE_ENV 'production'
ENV PORT 1337
EXPOSE $PORT

COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]

RUN npm install --production
COPY . /usr/src/app

CMD npm start
