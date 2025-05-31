const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('money_maze_development', 'postgres', 'zsefvgyjm', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
});

// Load models without setting associations
const models = {
  User: require('./models/user')(sequelize, Sequelize.DataTypes),
  Budget: require('./models/budget')(sequelize, Sequelize.DataTypes),
  Transaction: require('./models/transaction')(sequelize, Sequelize.DataTypes),
  UserBudget: require('./models/userbudget')(sequelize, Sequelize.DataTypes),
};

// Set associations after all models are loaded
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
  }
})();

module.exports = { sequelize, models };
