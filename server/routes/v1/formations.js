const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    db.Formation.findAll({
        include: {
            model: db.Vehicle,
            require: true
        }
    }).then(result => {
        res.json(result)
    })
})

module.exports = router
