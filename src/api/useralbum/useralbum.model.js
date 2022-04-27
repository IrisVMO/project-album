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
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)

UserAlbum.belongsTo(UserAlbum, { foreignKey: 'userId' })
UserAlbum.belongsTo(UserAlbum, { foreignKey: 'albumId' })

module.exports = UserAlbum
