const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('money_maze_development', 'postgres', 'zsefvgyjm', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
})

module.exports = sequelize;