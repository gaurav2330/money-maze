'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBudget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBudget.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      UserBudget.belongsTo(models.Budget, {
        foreignKey: 'budgetId',
        as: 'budget'
      });
    }
  }
  UserBudget.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    budgetId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'budgets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'UserBudget',
  });
  return UserBudget;
};