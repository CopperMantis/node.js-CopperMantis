# CopperMantis

Simple but powerful Programming Contest Management System, based on [SimplePCMS](https://github.com/jossemarGT/SimplePCMS).

## Make it run!
If you only want to make it work just install `docker` and `docker-compose`, then in your terminal change to the repo dir and do a `docker-compose up`.

**Note**: The admin credentials **ARE** provisioned via env variables, that means
that you need to change  the `PCMS_ADMIN_USERNAME` and
`PCMS_ADMIN_PASSWORD` values in the `docker/env/secret.env` file (you have to create that file with the same path).

## Contribute
This repo comes with `docker-compose.yml` file to make the deployment process easier,
but, for development we strongly suggest to work locally with just `mongo` docker container,
otherwise you'll have to restart the whole stack for every change, hence the way that
sails.js lift up.

### Dev dependencies
- docker
	- mongo db container
- node 0.12.7 or greater

### How to spin up the development stack

First run the `mongo 3.0` docker [container](https://registry.hub.docker.com/_/mongo/)

```bash
$ docker run --name pcms-mongo --volume $(pwd)/docker/tmp:/data/db  -p 27017:27017 -d mongo:3.0.4
```

Then just type

```bash
PCMS_ADMIN_USERNAME=<username> PCMS_ADMIN_PASSWORD=<password> npm start
```

## FAQ

- *Why do I need to use docker containers?* Just because... Kidding, the most painful part of any distributed system is the deployment! Having everything containerized makes it a little bit easier.
