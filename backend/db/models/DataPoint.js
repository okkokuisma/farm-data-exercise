module.exports = (sequelize, DataTypes) => {
  return sequelize.define('dataPoint', {
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
    tableName: 'data_points',
    underscored: true,
  })
}