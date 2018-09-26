"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Trips", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            serviceId: {
                type: Sequelize.UUID
            },
            tripNumber: {
                type: Sequelize.STRING
            },
            tripClassId: {
                type: Sequelize.UUID
            },
            tripName: {
                type: Sequelize.STRING
            },
            tripDirectionId: {
                type: Sequelize.INTEGER
            },
            blockId: {
                type: Sequelize.STRING
            },
            calenderId: {
                type: Sequelize.UUID
            },
            extraCalenderId: {
                type: Sequelize.UUID
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Trips")
}
