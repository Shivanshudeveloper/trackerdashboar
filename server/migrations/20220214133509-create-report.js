'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      team: {
        type: Sequelize.STRING,
      },
      organization: {
        type: Sequelize.STRING,
      },
      users: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      reportTitle: {
        type: Sequelize.STRING,
      },
      reportCategory: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      type: {
        type: Sequelize.STRING,
      },
      time: {
        primaryKey: true,
        type: Sequelize.DATE,
      },
      createdBy: {
        type: Sequelize.STRING,
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
