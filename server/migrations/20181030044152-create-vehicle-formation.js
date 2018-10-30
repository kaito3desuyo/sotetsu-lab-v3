"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("VehicleFormations", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            FormationId: {
                type: Sequelize.UUID
            },
            VehicleId: {
                type: Sequelize.UUID
            },
            carNumber: {
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
    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable("VehicleFormations")
}
