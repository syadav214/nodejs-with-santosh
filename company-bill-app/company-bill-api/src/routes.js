const response = { success: true, body: {} };

function internalServerError(err, res) {
  response.body = err;
  response.success = false;
  res.status(500);
  return res;
}

const router = app => {
  app.get('/', (req, res) => {
    response.success = true;
    response.body = {
      getCompanies: 'GET-> /company',
      getSingleCompany: 'GET-> /company/:id',
      createCompany: 'POST-> /company'
    };
    res.json(response);
  });

  app.get('/company', async (req, res) => {
    try {
      response.body = await require('./company/get')(req);
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.post('/company', async (req, res) => {
    try {
      response.body = await require('./company/create')(req);
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.get('/year', async (req, res) => {
    try {
      response.body = await require('./bill/getYear')(req);
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.get('/bill/:id', async (req, res) => {
    try {
      response.body = await require('./bill/get')(req);
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.get('/bills/:month/:year/:all', async (req, res) => {
    try {
      response.body = await require('./bill/get')(req);
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.post('/bill', async (req, res) => {
    try {
      response.body = await require('./bill/create')(req);
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.put('/bill/:id', async (req, res) => {
    try {
      response.body = await require('./bill/update')(req);      
      response.success = true;
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });
};

module.exports = router;
