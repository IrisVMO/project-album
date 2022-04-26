const { DataTypes } = require('sequelize')

const postgres = require('../../configs/postgres')
const Album = require('../albums/album.model')

const User = postgres.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    current_status: {
      type: DataTypes.ENUM,
      values: ['Available', 'Busy', 'Offline'],
      allowNull: true,
      defaultValue: 'Available'
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)

module.exports = User
