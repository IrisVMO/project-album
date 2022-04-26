const UserAlbum = require('./useralbum.model')

const getOneUserAlbum = async (albumId) => {
  const album = await UserAlbum.findOne({ where: albumId albumId})
  return album
}

const getAllUserAlbum = async () => {
  const album = await UserAlbum.findAll()
  return album
}

module.exports = {
  getAllUserAlbum,
  getOneUserAlbum
}