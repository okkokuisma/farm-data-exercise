const { makePaginate } = require('sequelize-cursor-pagination')

module.exports = (sequelize, DataTypes) => {
  const Farm = sequelize.define('farm', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'farms',
    underscored: true
  })

  Farm.paginate = makePaginate(Farm)

  return Farm
}