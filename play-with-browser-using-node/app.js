const express = require('express');
const body_parser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(routes);
module.exports = app;
