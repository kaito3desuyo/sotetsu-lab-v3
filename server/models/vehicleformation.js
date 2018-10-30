"use strict"
module.exports = (sequelize, DataTypes) => {
    const VehicleFormation = sequelize.define(
        "VehicleFormation",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            FormationId: DataTypes.UUID,
            VehicleId: DataTypes.UUID,
            carNumber: DataTypes.INTEGER
        },
        {}
    )
    VehicleFormation.associate = function(models) {
        // associations can be defined here
    }
    return VehicleFormation
}
