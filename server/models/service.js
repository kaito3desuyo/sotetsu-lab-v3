"use strict"
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define(
        "Service",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            serviceName: DataTypes.TEXT,
            serviceDescription: DataTypes.TEXT,
            routeId: DataTypes.UUID,
            routeSequence: DataTypes.INTEGER
        },
        {}
    )
    Service.associate = function(models) {
        // associations can be defined here
        Service.belongsToMany(models.Route, { through: "LineSystem" })
        Service.hasMany(models.Trip, { foreignKey: "serviceId" })
        Service.hasMany(models.Operation, { foreignKey: "serviceId" })
    }
    return Service
}
