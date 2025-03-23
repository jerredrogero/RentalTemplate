// Log request headers to debug authentication issues
const mongoose = require('/movinin/api/node_modules/mongoose');
const express = require('/movinin/api/node_modules/express');

const app = express();

// Middleware to log headers
app.use((req, res, next) => {
  console.log('Request headers:');
  console.log(JSON.stringify(req.headers, null, 2));
  next();
});

// Catch all route
app.all('*', (req, res) => {
  res.status(200).send('Headers logged');
});

// Start server
const server = app.listen(9999, () => {
  console.log('Debug server running on port 9999');
});

// Keep server running for a while
setTimeout(() => {
  console.log('Shutting down debug server');
  server.close();
}, 60000); // Run for 1 minute 