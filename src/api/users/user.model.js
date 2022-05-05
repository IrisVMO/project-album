const { DataTypes } = require('sequelize')
const { Album } = require('../albums/album.model')
const postgres = require('../../configs/postgres')
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
    tokenVerify: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    linkImageAvatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Available', 'Busy', 'Offline'],
      allowNull: false,
      defaultValue: 'Available'
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)

const AlbumUser = postgres.define('album_user', {
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Active', 'Inactive'],
    allowNull: false,
    defaultValue: 'Active'
  }
},
{ timestamps: false }
)

Album.belongsToMany(User, { through: AlbumUser, as: 'users', foreignKey: 'albumId' })
User.belongsToMany(Album, { through: AlbumUser, as: 'albums', foreignKey: 'userId' })

AlbumUser.sync({ alter: true })
  .catch(Error)

User.sync({ alter: true })
  .catch(Error)

module.exports = { User, AlbumUser }
