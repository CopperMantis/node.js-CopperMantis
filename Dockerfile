FROM node:0.12.7

MAINTAINER Jossemar Cordero <hello@jossemargt.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 1337
VOLUME ["/usr/src/app"]

CMD ["/usr/local/bin/npm", "start"]
