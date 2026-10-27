const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const logger = require('./middleware/logger');
const rateLimit = require('./middleware/rateLimit');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.disable('x-powered-by');
app.use(cors({ origin: config.clientOrigin }));
app.use(express.json({ limit: '100kb' }));
app.use(logger);

// Limit only form submissions
const formLimiter = rateLimit({ max: 30 });
app.use(['/api/appointments', '/api/contact', '/api/newsletter'], (req, res, next) =>
  req.method === 'POST' ? formLimiter(req, res, next) : next()
);

app.use('/api', routes);

// Serve the built React app in production (client/dist)
const clientDist = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
