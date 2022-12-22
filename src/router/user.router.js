const express = require('express');
const router = express.Router();

const { validateHandler } = require('../middlewares/validate.handler');
const {
  createUserSchema,
  updateUserPasswordSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const UserService = require('../services/user.service');
const service = new UserService();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const userList = await service.findAll();
      res.json(userList);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id',
  validateHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/register',
  validateHandler(createUserSchema, 'body'),
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
  '/password/:id',
  validateHandler(getUserSchema, 'params'),
  validateHandler(updateUserPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      await service.updatePassword(id, body)
      res.json({
        statusCode: 200,
        message: 'Password actualizado'
      })
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
