module.exports = (sequelize, DataTypes) => {
  return sequelize.define("DataPoint", {
    farm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metric_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metric_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    updatedAt: false,
    tableName: "data_points",
  })
}