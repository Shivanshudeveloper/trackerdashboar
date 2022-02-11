'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      customDomain: {
        type: Sequelize.STRING,
      },
      timezone: {
        type: Sequelize.STRING,
      },
      trackingMode: {
        type: Sequelize.STRING,
      },
      trackOn: {
        type: Sequelize.DATE,
      },
      trackBetween: {
        type: Sequelize.JSON,
      },
      time: {
        primaryKey: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organizations')
  },
}
