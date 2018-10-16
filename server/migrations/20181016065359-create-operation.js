"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Operations", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            serviceId: {
                type: Sequelize.UUID
            },
            calenderId: {
                type: Sequelize.UUID
            },
            operationNumber: {
                type: Sequelize.STRING
            },
            tripSequence: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Operations")
}
