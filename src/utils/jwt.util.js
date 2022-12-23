const jwt = require('jsonwebtoken');
const { config } = require('../config');

const secret = config.jwtSecret;

function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
