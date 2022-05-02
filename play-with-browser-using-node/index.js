const app  = require('./app');
const log = require('./utils/logger');
const port = process.env.PORT || 8900;

app.listen(port, () => log.info(`Server is running at ${port}`))