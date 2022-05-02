const customer_router = require('./customer');
const health_router = require('./health');

module.exports = [
    health_router,
    customer_router
]