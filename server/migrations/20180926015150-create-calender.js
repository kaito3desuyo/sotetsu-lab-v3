"use strict"
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Calenders", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            calenderName: {
                type: Sequelize.STRING
            },
            sunday: {
                type: Sequelize.BOOLEAN
            },
            monday: {
                type: Sequelize.BOOLEAN
            },
            tuesday: {
                type: Sequelize.BOOLEAN
            },
            wednesday: {
                type: Sequelize.BOOLEAN
            },
            thursday: {
                type: Sequelize.BOOLEAN
            },
            friday: {
                type: Sequelize.BOOLEAN
            },
            saturday: {
                type: Sequelize.BOOLEAN
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable("Calenders")
}
