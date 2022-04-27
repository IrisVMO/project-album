const UserAlbum = require('./useralbum.model')

const createUserAlbum = async (albumId, userId, role) => {
  const useralbum = await UserAlbum.create({ userId, albumId, role })
  return useralbum
}

const getOneUserAlbum = async (albumId) => {
  const useralbum = await UserAlbum.findOne({ where: albumId })
  return useralbum
}

const getAllUserAlbum = async () => {
  const useralbum = await UserAlbum.findAll()
  return useralbum
}

module.exports = {
  createUserAlbum,
  getAllUserAlbum,
  getOneUserAlbum
}