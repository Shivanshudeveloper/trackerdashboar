'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      organization: {
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
    await queryInterface.dropTable('admins')
  },
}
