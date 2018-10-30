"use strict"
module.exports = (sequelize, DataTypes) => {
    const Formation = sequelize.define(
        "Formation",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            vehicleType: DataTypes.STRING,
            formationNumber: DataTypes.STRING,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY
        },
        {}
    )
    Formation.associate = function(models) {
        // associations can be defined here
        Formation.belongsToMany(models.Vehicle, { through: "VehicleFormation" })
    }
    return Formation
}
