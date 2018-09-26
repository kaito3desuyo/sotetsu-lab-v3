"use strict"
module.exports = (sequelize, DataTypes) => {
    const Time = sequelize.define(
        "Time",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            tripId: DataTypes.UUID,
            stopId: DataTypes.UUID,
            stopSequence: DataTypes.INTEGER,
            pickupType: DataTypes.INTEGER,
            dropoffType: DataTypes.INTEGER,
            arrivalDays: DataTypes.INTEGER,
            arrivalTime: DataTypes.TIME,
            departureDays: DataTypes.INTEGER,
            departureTime: DataTypes.TIME
        },
        {}
    )
    Time.associate = function(models) {
        // associations can be defined here
        Time.belongsTo(models.Trip, { foreignKey: "tripId" })
        Time.belongsTo(models.Stop, { foreignKey: "stopId" })
    }
    return Time
}
