"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Vehicles", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            vehicleNumber: {
                type: Sequelize.STRING
            },
            vehicleDescription: {
                type: Sequelize.TEXT
            },
            isScrapped: {
                type: Sequelize.BOOLEAN
            },
            scrappedDate: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Vehicles")
}
