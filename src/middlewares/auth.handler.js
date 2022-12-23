const boom = require('@hapi/boom');
const { config } = require('../config');
const passport = require('passport');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['authorization'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('No estás autorizado para realizar esta petición'));
  }
}

function validateRoleHandler(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('No tienes permisos para realizar esta acción'));
    }
  };
}

function validatePassportAuth(name) {
    return passport.authenticate(name, { session: false });
}

module.exports = { checkApiKey, validateRoleHandler, validatePassportAuth };
