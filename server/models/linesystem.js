"use strict"
module.exports = (sequelize, DataTypes) => {
    const LineSystem = sequelize.define(
        "LineSystem",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            RouteId: DataTypes.UUID,
            ServiceId: DataTypes.UUID,
            sequence: DataTypes.INTEGER
        },
        {}
    )
    LineSystem.associate = function(models) {
        // associations can be defined here
    }
    return LineSystem
}
