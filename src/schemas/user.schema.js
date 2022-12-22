const Joi = require('joi');

const id = Joi.string()
  .pattern(new RegExp(/^[a-z]+$/))
  .min(5)
  .max(15)
  .required()
  .messages({
    'string.min': 'Username debe contener almenos 5 caracteres',
    'string.max': 'Username debe contener máximo 15 caracteres',
    'any.required': 'Username es requerido',
    'string.pattern.base': 'Username solo debe contener letras en minúscula',
  });
const email = Joi.string()
  .email()
  .required()
  .messages({
    'string.email': 'Email contiene un formato inválido',
    'any.required': 'Email es requerido',
  });
const password = Joi.string().strip().min(8).required().messages({
  'string.min': 'Password debe contener almenos 8 caracteres',
  'any.required': 'Password es requerido',
});

const createUserSchema = Joi.object({
  id,
  email,
  password,
}).messages({ 'object.unknown': '{#label} no está permitido' });

const updateUserPasswordSchema = Joi.object({
  password,
  confirmPassword: password,
}).messages({ 'object.unknown': '{#label} no está permitido' });

const getUserSchema = Joi.object({
  id,
});

module.exports = {
  createUserSchema,
  updateUserPasswordSchema,
  getUserSchema,
};
