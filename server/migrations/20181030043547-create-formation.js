"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Formations", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            vehicleType: {
                type: Sequelize.STRING
            },
            formationNumber: {
                type: Sequelize.STRING
            },
            formationDescription: {
                type: Sequelize.TEXT
            },
            startDate: {
                type: Sequelize.DATEONLY
            },
            endDate: {
                type: Sequelize.DATEONLY
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Formations")
}
