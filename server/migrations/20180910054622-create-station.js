"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Stations", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            stationName: {
                type: Sequelize.STRING
            },
            stationNumbering: {
                type: Sequelize.STRING
            },
            routeId: {
                type: Sequelize.UUID
            },
            operatingKilometers: {
                type: Sequelize.DECIMAL(10, 1)
            },
            sortOrder: {
                type: Sequelize.INTEGER
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Stations")
}
