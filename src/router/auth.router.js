const express = require('express');

const router = express.Router();

const { createUserSchema } = require('../schemas/user.schema');
const { validateHandler } = require('../middlewares/validate.handler');
const { validatePassportAuth } = require('../middlewares/auth.handler');

const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post(
  '/login',
  validatePassportAuth('login'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const response = await service.userToken(user);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/register',
  validateHandler(createUserSchema, 'body'),
  validatePassportAuth('signup'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const response = await service.userToken(user);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/recovery',
  async (req, res, next) => {
    try {
      const body = req.body;
      const response = await service.recoveryPassword(body);
      res.json(response)
    } catch (error) {
      next(error);
    }
  },
);
router.put(
  '/recovery/password',
  async (req, res, next) => {
    try {
      const body = req.body;
      const response = await service.updateRecoveryPassword(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
)

module.exports = router;
