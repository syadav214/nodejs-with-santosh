# race-event-subscriber-application
a subscriber application developed in nodejs, typescript, mongoose

## Install

``` cli
yarn install
```

## Start Mongo Server 
Make sure that docker is running

``` cli
docker-compose up -d
```
Create two database on Mongo i.e. raceDB and testRaceDB

Put mongo db connection string in .env file.

## Check linting

``` cli
yarn run lint
```

## Run

``` cli
yarn start
```

## Test

``` cli
yarn test
```