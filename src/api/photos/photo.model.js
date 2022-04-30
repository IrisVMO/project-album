const { DataTypes } = require('sequelize')
const postgres = require('../../configs/postgres')
const { Album } = require('../albums/album.model')
const { User } = require('../users/user.model')

const Photo = postgres.define(
  'photos',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Public', 'Private'],
      allowNull: false,
      defaultValue: 'Public'
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)
Photo.belongsTo(Album, { as: 'albums', foreignKey: 'albumId' })
Album.hasMany(Photo, { as: 'photos', foreignKey: 'albumId' })
Photo.belongsTo(User, { as: 'users', foreignKey: 'userId' })
User.hasMany(Photo, { as: 'photos', foreignKey: 'userId' })

Photo.sync({ alter: true })
  .catch(Error)

module.exports = { Photo }
