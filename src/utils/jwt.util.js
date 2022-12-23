const jwt = require('jsonwebtoken');
const { config } = require('../config');

const secret = config.jwtSecret;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
