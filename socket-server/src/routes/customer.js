const { Router } = require('express');
const customer_router = Router();

customer_router.get('/customer', (req, res) => {
    res.send('customer');
});

module.exports = customer_router;