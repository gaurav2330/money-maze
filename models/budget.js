'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Budget.belongsToMany(models.User, {
        through: 'user_budgets',
        foreignKey: 'budgetId',
        otherKey: 'userId',
        as: 'users'
      });

      Budget.hasMany(models.Transaction, {
        foreignKey: 'budgetId',
        as: 'transactions'
      });
    }
  }
  Budget.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    frequency: DataTypes.STRING,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Budget',
    tableName: 'budgets',
    timestamps: true,
  });
  return Budget;
};