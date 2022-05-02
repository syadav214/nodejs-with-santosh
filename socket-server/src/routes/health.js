const { Router } = require('express');
const health_router = Router();

health_router.get('/health', (req, res) => {
    res.send('healthy');
});

module.exports = health_router;