"use strict"
module.exports = (sequelize, DataTypes) => {
    const Stop = sequelize.define(
        "Stop",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            stationId: DataTypes.UUID,
            stopName: DataTypes.STRING,
            stopDescription: DataTypes.TEXT
        },
        {}
    )
    Stop.associate = function(models) {
        // associations can be defined here
        Stop.belongsTo(models.Station, { foreignKey: "stationId" })
        Stop.hasMany(models.Time, { foreignKey: "stopId" })
    }
    return Stop
}
