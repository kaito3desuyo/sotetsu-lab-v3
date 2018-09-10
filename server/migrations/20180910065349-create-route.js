"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Routes", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            routeName: {
                type: Sequelize.STRING
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Routes")
}
