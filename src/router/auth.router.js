const express = require('express');

const router = express.Router();

const { signToken } = require('../utils/jwt.util');

const { createUserSchema } = require('../schemas/user.schema');
const { validateHandler } = require('../middlewares/validate.handler');
const { validatePassportAuth } = require('../middlewares/auth.handler');

router.post(
  '/login',
  validatePassportAuth('login'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
      const token = signToken(payload);
      res.json({
        user,
        token,
      });
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
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      }
      const token = signToken(payload);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error)
    }
  },
);

module.exports = router;
