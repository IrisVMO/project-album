const { DataTypes } = require('sequelize')
const User = require('../users/user.model')
const Album = require('../albums/album.model')
const postgres = require('../../configs/postgres')

const UserAlbum = postgres.define(
  'useralbums',
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    role: {
      type: DataTypes.ARRAY,
      allowNull: false
    }
  }
)

Photo.belongsTo(UserAlbum, { foreignKey: 'userId' })
Photo.belongsTo(UserAlbum, { foreignKey: 'albumId' })

module.exports = UserAlbum
