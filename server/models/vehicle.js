"use strict"
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define(
        "Vehicle",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            vehicleNumber: DataTypes.STRING,
            vehicleDescription: DataTypes.TEXT,
            isScrapped: DataTypes.BOOLEAN,
            scrappedDate: DataTypes.DATEONLY
        },
        {}
    )
    Vehicle.associate = function(models) {
        // associations can be defined here
        Vehicle.belongsToMany(models.Formation, { through: "VehicleFormation" })
    }
    return Vehicle
}
