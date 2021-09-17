'use strict';

const koaRouter = require('koa-router')(),
  //calling partner function from index.js file
  //index.js is the default file of access if specific file not mentioned
  partner = require('./data/partner'),
  api = require('./data/apis');

koaRouter
  .get('/', ctx => {
    return (ctx.body = partner('ICICI'));
  })
  .get('/cost', async ctx => {
    await api()
      .then(function(parsedBody) {
        ctx.body = parsedBody;
      })
      .catch(function(err) {
        console.log(err);
      });
  });

module.exports = koaRouter;
