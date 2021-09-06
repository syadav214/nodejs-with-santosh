# parking-reservations-api
a node js api for parking reservations

## DB Setup
Find scripts in db-scripts folder. Run the script on mongo client.

## Install

``` cli
npm install
```

Keep mongo server running.

You can edit port and mongo db connection string in config/default.js file.

## Run

``` cli
npm start
```

Server will run at 4000 (or the port specified by you in config).

Import Parking_Reservations.postman_collection.json on postman to test the api.