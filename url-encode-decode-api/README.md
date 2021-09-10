# the-shortest-url-santosh
ShortLink - the URL shortening service developed in nodejs, typescript, express

## Install

``` cli
npm install
```

Put PORT and SHORT_URL_DOMAIN in .env file.

## Run

``` cli
npm start
```

## Test

``` cli
npm test
```

## Build

``` cli
npm run build
```

## Run Prod Server

``` cli
npm run start:prod
```

## Error Codes if INTERNAL_SERVER_ERROR occurred
Code | Desc
-- | --
100  | Exception in encodeUrl
101  | uniqueIdGenerator provided duplicate id 3 times
200  | Exception in decodeUrl

## POSTMAN
Import Shortest_URL_API.postman_collection.json on postman to test the api.

## Needed
- Logging
- Linting
- Swagger Documentation
- TypeScript usage
- Docker setup
- Code consistency
