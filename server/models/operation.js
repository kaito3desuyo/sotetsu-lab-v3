"use strict"
module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define(
        "Operation",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            serviceId: DataTypes.UUID,
            calenderId: DataTypes.UUID,
            operationNumber: DataTypes.STRING,
            tripSequence: DataTypes.INTEGER
        },
        {}
    )
    Operation.associate = function(models) {
        // associations can be defined here
        Operation.belongsTo(models.Service, { foreignKey: "serviceId" })
        Operation.belongsTo(models.Calender, { foreignKey: "calenderId" })
        Operation.hasMany(models.Trip, { foreignKey: "operationId" })
    }
    return Operation
}
