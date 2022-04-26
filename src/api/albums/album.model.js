const { DataTypes } = require('sequelize')

const postgres = require('../../configs/postgres')

const Album = postgres.define(
  'albums',
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
    description: {
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

module.exports = Album
