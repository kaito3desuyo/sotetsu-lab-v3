"use strict"
module.exports = (sequelize, DataTypes) => {
    const TripClass = sequelize.define(
        "TripClass",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            routeId: DataTypes.UUID,
            tripClassName: DataTypes.STRING,
            tripClassColor: DataTypes.STRING
        },
        {}
    )
    TripClass.associate = function(models) {
        // associations can be defined here
        TripClass.belongsTo(models.Route, { foreignKey: "routeId" })
    }
    return TripClass
}
