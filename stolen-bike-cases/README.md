# stolen-bike-cases

A system to report stolen bike cases and assign officer to resolved it

### Install

```bash
    # Clone the repo
    git clone https://github.com/syadav214/stolen-bike-cases.git

    # Install dependencies
    cd stolen-bike-cases
    npm i

    # Setup .env file (ref: .env.dist)
```

### Set up database

```bash
    mysql -u root -p
    # create a db and create table as per file(s) in folder mysql-tables
    # insert officers' name in tblOfficer
```

### Running locally

```bash
    npm start
```

### Test with mocha and nyc

```bash
    npm run test
```
