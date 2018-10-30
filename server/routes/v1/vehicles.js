const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    console.log(req.query)
    const orderArray = []

    if (req.query.sortColumn && req.query.sortDirection) {
        orderArray.push([req.query.sortColumn, req.query.sortDirection])
    }

    db.Vehicle.findAll({
        order: orderArray,
        include: {
            model: db.Formation,
            require: false
        }
    }).then(result => {
        res.json(result)
    })
})

router.post("/", (req, res, next) => {
    console.log(req.body)
    db.Vehicle.bulkCreate(req.body).then(result => {
        res.json({
            status: true,
            message: "データの追加が正常に完了しました。",
            data: result
        })
    })
})

module.exports = router
