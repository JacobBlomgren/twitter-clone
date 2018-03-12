# Twitter clone

A twitter clone I'm building to learn more about modern web development. Uses
React/Redux, Webpack, Express, Postgres, Ramda, and a few other nice
technologies. It's got server side rendering and some code splitting.

## How to build

Run `yarn install` to download all dependencies, `yarn prod:build` to build, and
`yarn prod:start` to start a pm2 process, then navigate to `localhost:8000`. To
run the dev server run `yarn start` and `yarn dev:wds` to start the dev server
and webpack server respectively.

A Postgres server needs to be running with a database named `twitter` and the
schema found in `db/schema.sql`. Configure a `.env` file with `DB_HOST`,
`DB_PORT`, `DB_USER` and `DB_PASSWORD` set.

An Elasticsearch server needs to be running for text search. Set `ELASTIC_HOST`
and `ELASTIC_PORT` in the `.env` file. To setup the indices, run
`yarn elastic:setup`. All elastic scripts require `yarn prod:build` to be run.

The Elasticsearch server is updated by a script that is started with
`yarn elastic:sync`. It uses a RabbitMQ queue to store all the updates published
by the main server, which are then sent in bulk to the Elasticsearch server.
Therefore a RabbitMQ server needs to be running. Set `RABBIT_HOST`,
`RABBIT_PORT`, `RABBIT_USER` and `RABBIT_PASSWORD` in the `.env` file.

Lastly, a secret key needs to be set in `.env` as `SECRET_KEY` to sign the
session id cookie. It can be anything, e.g. generated with python's
`os.urandom`.

## How to test

The simplest form of testing is to run `yarn jest unit`, this runs the bulk of
the testing. I also made an attempt at some integration testing, which can be
run with `yarn test-integration` but that requires a database with the name
`twitter_test` and the same schema as above.

## Documentation

The api documentation can be found in the `api` directory. To generate the rest
of the docs, run `yarn docs`, which will generate a `docs` directory. Note that
JSDocs has only been used for exported functions.

## Screenshots

![Profile page](https://raw.githubusercontent.com/JacobBlomgren/twitter-clone/master/screenshots/profile.png)
![Replies page](https://raw.githubusercontent.com/JacobBlomgren/twitter-clone/master/screenshots/replies.png)
