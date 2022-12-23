const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const { comparePassword } = require('../../bcrypt.util');

const UserService = require('../../../services/user.service');
const service = new UserService();

const LocalLoginStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user || !user.isActive) {
        done(boom.unauthorized('Email o password incorrecto'), false);
      }
      const isMatchPassword = await comparePassword(password, user.password);
      if (!isMatchPassword){
        done(boom.unauthorized('Email o password incorrecto'), false);
      }
      delete user.dataValues['password'];
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

const LocalSignupStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      console.log(req.body);
      const body = req.body;
      const user = await service.create(body);
      return done(null, user);
    } catch (error) {
      done(error, false)
    }
  }
);

module.exports = { LocalLoginStrategy, LocalSignupStrategy };
