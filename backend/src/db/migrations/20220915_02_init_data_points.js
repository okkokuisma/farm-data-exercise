const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('data_points', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'farms', key: 'id' },
        onDelete: 'CASCADE'
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      metric_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metric_value: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('data_points')
  },
}