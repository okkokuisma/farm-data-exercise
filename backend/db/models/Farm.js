module.exports = (sequelize, DataTypes) => {
  return sequelize.define('farm', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: true,
    updatedAt: false,
    tableName: 'farms',
  })
}