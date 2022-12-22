const express = require('express');
const router = express.Router();

const ItemService = require('../services/item.service');
const service = new ItemService();

const { validateHandler } = require('../middlewares/validate.handler');
const {
  createItemSchema,
  updateItemSchema,
  getItemByIdSchema,
  getItemByUserIdSchema,
} = require('../schemas/item.schema');

router.get(
  '/list/:userId',
  validateHandler(getItemByUserIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const item = await service.findAll(userId);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id',
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
  validateHandler(createItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const item = await service.create(body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
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
