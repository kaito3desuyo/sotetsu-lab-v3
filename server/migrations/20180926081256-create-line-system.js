"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("LineSystems", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            RouteId: {
                type: Sequelize.UUID
            },
            ServiceId: {
                type: Sequelize.UUID
            },
            sequence: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("LineSystems")
}
