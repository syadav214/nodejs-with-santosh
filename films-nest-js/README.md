# films-nest-js
backend application for films in nest.js


## To Start Mongo Server 
Make sure that docker is running

``` cli
docker-compose up -d
```
Create 'filmsDB' database in Mongo

Put mongo db connection string in .env file.

## Installation

```bash
$ npm install
```

## DB Seeding

```bash
$ node data-seeding
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# API Doc

Browse to http://localhost:3000/api/

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```