# skCompanyBills
Company Bills project | APIs and UI developed in NodeJs and ReactJs (using material ui)

Keywords : nodejs, expressjs, mocha, chai, supertest, mysql, reactjs, materialui

### Install

```bash
    # Clone the project
    git clone https://github.com/syadav214/skCompanyBills.git

    # Install API project dependencies
    cd skCompanyBills/company-bill-api
    npm i

    # Install UI project dependencies
    cd ../company-bill-ui
    npm i
```

### Create database tables in mysql

- Install mysql server and mysql client. [ Guide to mysql setup => https://github.com/syadav214/How2Configure/blob/master/MySql.txt]
- Create a database using mysql client.
- Copy scripts from mysql-tables folder to mysql client and execute it.

### Set up env files

- Go to company-bill-api folder and create a '.env' file. Copy keys from '.env.dist' file and paste into '.env' file. Put appropriate values against the keys.
- For company-bill-api, make sure that value of PORT key should be other than 3000 (Used by react app in company-bill-ui).
- Go to company-bill-ui folder and follow the same steps to set up '.env' file.

### Run company-bill-api in a terminal

```bash
  cd skCompanyBills/company-bill-api
  npm start
```

### Run company-bill-ui in an another terminal

```bash
  cd skCompanyBills/company-bill-ui
  npm start
```

#### Run Tests

```bash
    npm test
```
