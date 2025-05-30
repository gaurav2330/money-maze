'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('budgets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Automatically generates UUIDs
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.INTEGER
      },
      frequency: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('budgets');
  }
};