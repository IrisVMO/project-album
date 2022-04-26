const { DataTypes } = require('sequelize')
const User = require('../users/user.model')
const Album = require('../albums/album.model')
const postgres = require('../../configs/postgres')

const Photo = postgres.define(
  'photos',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primarykey: true,
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
    current_status:{
      type: DataTypes.ENUM,
      values: ['Public', 'Private'],
      allowNull: true,
      defaultValue: 'Public'
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)

Photo.belongsTo(User, { foreignKey: 'userId' })
Photo.belongsTo(Album, { foreignKey: 'albumId' })

module.exports = Photo
