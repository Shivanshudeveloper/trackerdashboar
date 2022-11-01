'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('team_users', {
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
            password: {
                type: Sequelize.STRING,
            },
            organization: {
                type: Sequelize.STRING,
            },
            team: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.STRING,
            },
            trackingMode: {
                type: Sequelize.STRING,
            },
            trackOn: {
                type: Sequelize.STRING,
            },
            trackBetween: {
                type: Sequelize.STRING,
            },
            profilePicture: {
                type: Sequelize.STRING,
            },
            sharableLink: {
                type: Sequelize.STRING,
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
            },
            visibility: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('team_users')
    },
}
