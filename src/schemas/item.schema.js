const Joi = require('joi');

const id = Joi.number().integer().messages({
  'any.required': 'ID es requerido',
  'number.integer': 'ID debe ser un número entero',
  'number.base': 'ID debe ser un número',
});
const title = Joi.string().messages({
  'any.required': 'Título es requerido',
});
const type = Joi.string().valid('LINK', 'HEAD').messages({
  'any.valid': 'Tipo solo debe ser LINK o HEAD',
  'any.required': 'Tipo es requerido',
});
const url = Joi.string().uri().messages({
  'string.uri': 'Url debe ser una url válida',
});
const position = Joi.number().integer().messages({
  'any.required': 'Posición es requerida',
  'number.integer': 'Posición debe ser un número entero',
  'number.base': 'Posición debe ser un número',
});
const isActive = Joi.boolean();
const userId = Joi.string().messages({
  'any.required': 'Username es requerido',
});

const createItemSchema = Joi.object({
  title: title.required(),
  type: type.required(),
  url,
  position: position.required(),
  isActive: isActive.required(),
  userId: userId.required(),
}).messages({ 'object.unknown': '{#label} no está permitido' });;

const updateItemSchema = Joi.object({
  title,
  type,
  url,
  position,
  isActive,
}).messages({ 'object.unknown': '{#label} no está permitido' });;

const getItemByIdSchema = Joi.object({
  id: id.required(),
}).messages({ 'object.unknown': '{#label} no está permitido' });;

const getItemByUserIdSchema = Joi.object({
  userId: userId.required(),
}).messages({ 'object.unknown': '{#label} no está permitido' });;

module.exports = {
  createItemSchema,
  updateItemSchema,
  getItemByIdSchema,
  getItemByUserIdSchema,
};
