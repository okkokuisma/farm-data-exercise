module.exports = (sequelize, DataTypes) => {
  return sequelize.define('farm', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    timestamps: true,
    tableName: 'farms',
    underscored: true
  })
}