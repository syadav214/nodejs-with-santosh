'use strict';

require('dotenv').config();

const koa = require('koa'),
    app = new koa(),
    router = require('./router'),
    koaBodyParser = require('koa-bodyparser'),
    config = require('../config/' + process.env.NODE_ENV);

app.context.config = config;

app.use(koaBodyParser());

app.use(router.routes())
    .listen(config.port, () => {
        console.log(`server started at ${config.port} on ${config.host}`)
    });

module.exports = app;