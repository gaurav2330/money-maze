const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.authenticate = (req, res, next) => {
  console.log('Authentication middleware called');

  // Allow signup and login routes to pass through
  if(req.path === '/signup' || req.path === '/login') {
    return next();
  }

  // Check if token is provided
  const bearerToken = req.headers['authorization'];
  if(!bearerToken) {
    return res.status(401).json({ status: 'fail', message: 'No token provided' });
  }
  // Extract token from bearer token
  const token = bearerToken.split(' ')[1];
  jwt.verify(token, 'gauri21', (err, decoded) => {
    if(err) {
      return res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  })
}