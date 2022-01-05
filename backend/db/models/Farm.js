module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Farm", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: true,
    updatedAt: false,
    tableName: "farms",
  })
}