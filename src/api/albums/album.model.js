const { DataTypes } = require('sequelize')
const postgres = require('../../configs/postgres')
const Album = postgres.define(
  'albums',
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
    description: {
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

Album.sync({ alter: true })
  .catch(Error)

module.exports = { Album }
