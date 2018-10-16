"use strict"
module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define(
        "Trip",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            serviceId: DataTypes.UUID,
            operationId: DataTypes.UUID,
            tripNumber: DataTypes.STRING,
            tripClassId: DataTypes.UUID,
            tripName: DataTypes.STRING,
            tripDirectionId: DataTypes.INTEGER,
            blockId: DataTypes.STRING,
            calenderId: DataTypes.UUID,
            extraCalenderId: DataTypes.UUID
        },
        {}
    )
    Trip.associate = function(models) {
        // associations can be defined here
        Trip.belongsTo(models.Service, { foreignKey: "serviceId" })
        Trip.belongsTo(models.Calender, { foreignKey: "calenderId" })
        Trip.hasMany(models.Time, { foreignKey: "tripId" })
        Trip.belongsTo(models.TripClass, { foreignKey: "tripClassId" })
        Trip.belongsTo(models.Operation, { foreignKey: "operationId" })
    }
    return Trip
}
