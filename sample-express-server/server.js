const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/', (req, res) => {
  res.json(req.body);
});

// searching on query
app.get('/search/:index/:type', async (req, res) => {
  const { phraseSearch } = require('./SearchEngine');
  const data = await phraseSearch(req.params.index, req.params.type, req.query.q);
  res.json(data);
});

// provides unique values of a given facet
app.get('/facets/:index/:type/:facet', async (req, res) => {
  const { facets } = require('./SearchEngine');
  const data = await facets(req.params.index, req.params.type, req.params.facet);
  res.json(data);
});

// searching on query for a given facet
app.get('/facetSearch/:index/:type/:facet', async (req, res) => {
  const { facetSearch } = require('./SearchEngine');
  const data = await facetSearch(req.params.index, req.params.type, req.params.facet, req.query.q);
  res.json(data);
});

// indexing data
app.post('/save/:index/:type/:id', async (req, res) => {
  const { indexDocument } = require('./SearchEngine');
  const data = await indexDocument(req.params.index, req.params.type, req.params.id, req.body);
  res.json(data);
});

app.listen(3333, () => console.log('server running at 3333'));
