'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
            "SELECT create_hypertable('application_ids', 'time');"
        )
    },

    down: (queryInterface, Sequelize) => {},
}
