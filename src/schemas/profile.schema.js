const Joi = require('joi');

const regex = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]$/
);

const userId = Joi.string().messages({
  'any.required': 'Username es requerido',
});
const firstName = Joi.string().pattern(regex).messages({
  'string.pattern.base': 'Nombre solo debe contener letras',
  'any.required': 'Nombre es requerido',
});
const lastName = Joi.string().pattern(regex).messages({
  'string.pattern.base': 'Apellido solo debe contener letras',
  'any.required': 'Apellido es requerido',
});
const phone = Joi.string().messages({
  'any.required': 'Teléfono es requerido',
});
const description = Joi.string().messages({
  'any.required': 'Descripción es requerida',
});
const location = Joi.string().messages({
  'any.required': 'Ubicación es requerida',
});
const image = Joi.string().uri().messages({
  'string.uri': 'Imagen debe ser una url válida',
  'any.required': 'Imagen es requerida',
});
const banner = Joi.string().uri().messages({
  'string.uri': 'Banner debe ser una url válida',
  'any.required': 'Banner es requerida',
});
const portfolio = Joi.string().uri().messages({
  'string.uri': 'Portafolio debe ser una url válida',
  'any.required': 'Portafolio es requerido',
});
const isActive = Joi.boolean();

const createProfileSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  description: description.required(),
  location: location.required(),
  image: image.required(),
  banner: banner.required(),
  portfolio: portfolio.required(),
}).messages({ 'object.unknown': '{#label} no está permitido' });;

const updateProfileSchema = Joi.object({
  firstName,
  lastName,
  phone,
  description,
  location,
  image,
  banner,
  portfolio,
  isActive,
}).messages({ 'object.unknown': '{#label} no está permitido' });;

const getProfileByUsername = Joi.object({
  userId: userId.required(),
});

module.exports = {
  createProfileSchema,
  updateProfileSchema,
  getProfileByUsername,
};
