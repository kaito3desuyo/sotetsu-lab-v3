"use strict"
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            userId: DataTypes.STRING,
            password: DataTypes.STRING,
            authority: DataTypes.INTEGER
        },
        {
            hooks: {
                beforeCreate: hashPasswordHook,
                beforeUpdate: hashPasswordHook
            }
        }
    )
    User.associate = function(models) {
        // associations can be defined here
    }
    return User
}

function hashPasswordHook(user, options) {
    if (
        user.password != undefined &&
        user.password != "" &&
        user.password != user.previous("password")
    ) {
        return bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash
        })
    }
}
