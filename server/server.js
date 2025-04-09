const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv").config();
const routes = require('./routes');

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  
  // Capture response data
  const oldSend = res.send;
  res.send = function (data) {
    return oldSend.apply(res, arguments);
  };
  
  next();
});

// Enable CORS for development
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000', 'http://smart-home-backend:5000', 'http://smart-home-frontend:3001'],
  credentials: true
}));

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  console.error('Stack trace:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404 errors for unmatched routes
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
  console.log('Server environment:', process.env.NODE_ENV || 'development');
  console.log('CORS enabled for:', ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000']);
});