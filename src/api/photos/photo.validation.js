const { Joi } = require('express-validation')

const createValidation = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required()
  })
}

const updateValidation = {
  params: Joi.object({
    id: Joi.string()
      .required
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string()
  })
}

const getAllAlbumValidate = {
  params: Joi.object({
    id: Joi.string()
      .required
  }),
  query: Joi.object({
    page: Joi.number(),
    filter: Joi.string()
  })
}

module.exports = {
  createValidation,
  updateValidation,
  getAllAlbumValidate,
  
}
