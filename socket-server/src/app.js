const express = require('express');
const app = express();
const routes = require('./routes');

// sendFile will go here
app.get('/',function(req,res){
    res.sendFile('index.html', { root: __dirname });
});

app.use(routes);


module.exports = app;