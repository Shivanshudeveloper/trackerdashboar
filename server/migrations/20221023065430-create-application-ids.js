'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('application_ids', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            applicationid: {
                type: Sequelize.STRING,
            },
            organization: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.STRING,
            },
            time: {
                type: Sequelize.DATE,
                primaryKey: true,
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
        await queryInterface.dropTable('application_ids')
    },
}
