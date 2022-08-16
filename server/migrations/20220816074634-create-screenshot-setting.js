'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('screenshot_settings', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            organization: {
                type: Sequelize.STRING,
            },
            teams: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            takeTime: {
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
        await queryInterface.dropTable('screenshot_settings')
    },
}
