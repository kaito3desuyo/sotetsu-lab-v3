"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("TripClasses", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            routeId: {
                type: Sequelize.UUID
            },
            tripClassName: {
                type: Sequelize.STRING
            },
            tripClassColor: {
                type: Sequelize.STRING
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("TripClasses")
}
