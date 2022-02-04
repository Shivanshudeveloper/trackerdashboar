'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      reportTitle: {
        type: Sequelize.STRING,
      },
      reportCategory: {
        type: Sequelize.STRING,
      },
      reportPeriod: {
        type: Sequelize.JSON,
      },
      sharePeriod: {
        type: Sequelize.STRING,
      },
      shareTime: {
        type: Sequelize.DATE,
      },
      shareWith: {
        type: Sequelize.STRING,
      },
      team: {
        type: Sequelize.STRING,
      },
      user: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('reports')
  },
}
