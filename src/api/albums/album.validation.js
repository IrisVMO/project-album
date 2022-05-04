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
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required()
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string()
  })
}

const getOneValidation = {
  params: Joi.object({
    id: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required()
  })
}

const getAllValidation = {
  query: Joi.object({
    page: Joi.number(),
    filter: Joi.string()
  })
}

const inviteContributeValidation = {
  body: Joi.object({
    userIdInvite: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required()
  })

}

const replyValidation = {
  query: Joi.object({
    albumid: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required(),
    status: Joi.string()
      .required()
  })
}

const deleteValidation = {
  params: Joi.object({
    id: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required()
  })
}

module.exports = {
  createValidation,
  updateValidation,
  getOneValidation,
  getAllValidation,
  inviteContributeValidation,
  replyValidation,
  deleteValidation

}
