const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('money_maze_development', 'postgres', 'zsefvgyjm', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
})

const models = {
  User: require('./models/user')(sequelize, Sequelize.DataTypes),
  // Add other models here
};

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  }
  catch (error) {
    console.error('Unable to synchronize models:', error);
  }
})()

module.exports = { sequelize, models };