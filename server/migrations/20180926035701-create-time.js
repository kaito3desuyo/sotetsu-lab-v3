"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Times", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            tripId: {
                type: Sequelize.UUID
            },
            stopId: {
                type: Sequelize.UUID
            },
            stopSequence: {
                type: Sequelize.INTEGER
            },
            pickupType: {
                type: Sequelize.INTEGER
            },
            dropoffType: {
                type: Sequelize.INTEGER
            },
            arrivalDays: {
                type: Sequelize.INTEGER
            },
            arrivalTime: {
                type: Sequelize.TIME
            },
            departureDays: {
                type: Sequelize.INTEGER
            },
            departureTime: {
                type: Sequelize.TIME
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Times")
}
