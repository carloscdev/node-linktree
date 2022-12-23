const express = require('express');
const router = express.Router();

const ItemService = require('../services/item.service');
const service = new ItemService();

const { validatePassportAuth } = require('../middlewares/auth.handler');
const { validateHandler } = require('../middlewares/validate.handler');
const {
  createItemSchema,
  updateItemSchema,
  getItemByIdSchema,
} = require('../schemas/item.schema');

router.get(
  '/my-list',
  validatePassportAuth('jwt'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const item = await service.findAll(userId);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id',
  validatePassportAuth('jwt'),
  validateHandler(getItemByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await service.findOne(id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatePassportAuth('jwt'),
  validateHandler(createItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      body['userId'] = req.user.sub;
      const item = await service.create(body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  validatePassportAuth('jwt'),
  validateHandler(getItemByIdSchema, 'params'),
  validateHandler(updateItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const item = await service.updateOne(id, body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/delete/:id',
  validatePassportAuth('jwt'),
  validateHandler(getItemByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.deleteOne(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
