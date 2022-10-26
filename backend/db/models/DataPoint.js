const { makePaginate } = require('sequelize-cursor-pagination')

module.exports = (sequelize, DataTypes) => {
  const DataPoint =  sequelize.define('dataPoint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    farmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'farms', key: 'id' },
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    metricType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metricValue: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'data_points',
    underscored: true,
  })

  DataPoint.paginate = makePaginate(DataPoint)

  return DataPoint
}