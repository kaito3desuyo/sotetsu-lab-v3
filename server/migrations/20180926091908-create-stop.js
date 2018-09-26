"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Stops", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            stationId: {
                type: Sequelize.UUID
            },
            stopName: {
                type: Sequelize.STRING
            },
            stopDescription: {
                type: Sequelize.TEXT
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Stops")
}
