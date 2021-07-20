const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());
// used middleware for db connection
app.use(require('./middleware'));
// routes of the APIs
require('./routes')(app);

app.listen(port, () => {
  console.log('Server listening at port: ', port);
});

module.exports = app;
