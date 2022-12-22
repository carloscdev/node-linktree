const express = require('express');
const userRouter = require('./user.router');
const profileRouter = require('./profile.router');
const itemRouter = require('./item.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/profiles', profileRouter);
  router.use('/items', itemRouter);
}

module.exports = routerApi;
