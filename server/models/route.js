"use strict"
module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define(
        "Route",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            routeName: DataTypes.STRING,
            sortOrder: DataTypes.INTEGER
        },
        {}
    )
    Route.associate = function(models) {
        // associations can be defined here
        Route.belongsToMany(models.Service, { through: "LineSystem" })
        Route.hasMany(models.Station, { foreignKey: "routeId" })
    }
    return Route
}
