const express = require('express');
const userRouter = require('./user.router');
const profileRouter = require('./profile.router');
const itemRouter = require('./item.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/profiles', profileRouter);
  router.use('/items', itemRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
