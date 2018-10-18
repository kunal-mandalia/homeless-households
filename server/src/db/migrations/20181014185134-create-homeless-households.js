'use strict';
module.exports = {
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HomelessHouseholds');
  },
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HomelessHouseholds', {
      age: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      decision: {
        type: Sequelize.STRING
      },
      decisionCode: {
        type: Sequelize.INTEGER
      },
      decisionDate: {
        type: Sequelize.DATE
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nationality: {
        type: Sequelize.STRING
      },
      need: {
        type: Sequelize.STRING
      },
      publisherLabel: {
        type: Sequelize.STRING
      },
      publisherUri: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      registrationDate: {
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
};