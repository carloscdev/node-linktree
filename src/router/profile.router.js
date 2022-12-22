const express = require('express');

const { validateHandler } = require('../middlewares/validate.handler');
const {
  createProfileSchema,
  updateProfileSchema,
  getProfileByUsername,
} = require('../schemas/profile.schema');

const router = express.Router();

const ProfileService = require('../services/profile.service');
const service = new ProfileService();

router.get(
  '/:userId',
  validateHandler(getProfileByUsername, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.findOne(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validateHandler(createProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:userId',
  validateHandler(getProfileByUsername, 'params'),
  validateHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const user = await service.update(userId, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
