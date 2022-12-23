const express = require('express');

const { validatePassportAuth } = require('../middlewares/auth.handler');
const { validateHandler } = require('../middlewares/validate.handler');
const {
  createProfileSchema,
  updateProfileSchema,
} = require('../schemas/profile.schema');

const router = express.Router();

const ProfileService = require('../services/profile.service');
const service = new ProfileService();

router.get(
  '/my-profile',
  validatePassportAuth('jwt'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const user = await service.findOne(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatePassportAuth('jwt'),
  validateHandler(createProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      body['userId'] = req.user.sub;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/',
  validatePassportAuth('jwt'),
  validateHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const body = req.body;
      const user = await service.update(userId, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
