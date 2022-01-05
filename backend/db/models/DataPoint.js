module.exports = (sequelize, DataTypes) => {
  return sequelize.define('dataPoint', {
    farmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metricType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metricValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    updatedAt: false,
    tableName: 'data_points',
  })
}