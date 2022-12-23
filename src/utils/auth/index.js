const passport = require('passport');

const { LocalLoginStrategy, LocalSignupStrategy } = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use('login', LocalLoginStrategy);
passport.use('signup', LocalSignupStrategy);
passport.use(JwtStrategy);
