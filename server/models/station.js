"use strict"
module.exports = (sequelize, DataTypes) => {
    const Station = sequelize.define(
        "Station",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            stationName: DataTypes.STRING,
            stationNumbering: DataTypes.STRING,
            routeId: DataTypes.UUID,
            operatingKilometers: DataTypes.DECIMAL(10, 1),
            sortOrder: DataTypes.INTEGER
        },
        {}
    )
    Station.associate = function(models) {
        // associations can be defined here
        Station.belongsTo(models.Route, { foreignKey: "routeId" })
        Station.hasMany(models.Stop, { foreignKey: "stationId" })
    }
    return Station
}
