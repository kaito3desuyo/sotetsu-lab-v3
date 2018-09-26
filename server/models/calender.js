"use strict"
module.exports = (sequelize, DataTypes) => {
    const Calender = sequelize.define(
        "Calender",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            calenderName: DataTypes.STRING,
            sunday: DataTypes.BOOLEAN,
            monday: DataTypes.BOOLEAN,
            tuesday: DataTypes.BOOLEAN,
            wednesday: DataTypes.BOOLEAN,
            thursday: DataTypes.BOOLEAN,
            friday: DataTypes.BOOLEAN,
            saturday: DataTypes.BOOLEAN,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY
        },
        {}
    )
    Calender.associate = function(models) {
        // associations can be defined here
        Calender.hasMany(models.Trip, { foreignKey: "calenderId" })
    }
    return Calender
}
