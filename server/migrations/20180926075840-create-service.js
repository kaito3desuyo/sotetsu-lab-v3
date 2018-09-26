"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Services", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            serviceName: {
                type: Sequelize.TEXT
            },
            serviceDescription: {
                type: Sequelize.TEXT
            },
            routeId: {
                type: Sequelize.UUID
            },
            routeSequence: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Services")
}
