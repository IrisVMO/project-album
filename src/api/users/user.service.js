const { User } = require('./user.model')
const { Op } = require('sequelize');
const APIError = require('../../configs/APIError');
const { StatusCodes } = require('http-status-codes');
const e = require('express');

const createUser = async (email, username, password) => {
  const user = User.create({ username, email, password });
  return user
}

const getOneUser = async (filter) => {
  let { email, username, id } = filter

  if (!email) {
    email = ''
  }
  if (!username) {
    username = ''
  }
  if(!id) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { username }
        ]
      }
    })
  
    return user
  }
  console.log({id});
  const user = await User.findByPk(id)

  return user

}

const getAllUser = async (query) => {
  const { page, records, filter } = query
  const [totalRecords, users] = await Promise.all([
    User.count(),
    User.findAll({
      where: filter,
      offset: ((page - 1) * records),
      limit: records
    })
  ])

  return {
    users,
    totalRecords
  }
}

const updateInforService = async (email, username, id) => {
  const user = await User.update({ where: { id } }, { email, username })
  return user
}

const upPathfile = async (userId, link) => {
  const user = await User.update({ where: userId }, { linkImage: link })
  return user
}

const deleteUserService = async (id) => {
  const user = await User.destroy({ where: id })
  return user
}

module.exports = {
  createUser,
  getOneUser,
  getAllUser,
  updateInforService,
  upPathfile,
  deleteUserService
}
