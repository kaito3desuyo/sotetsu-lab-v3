const express = require("express")
const router = express.Router()

const db = require("../../models/index")

router.get("/", (req, res) => {
    db.Route.findAll({
        include: [
            {
                model: db.Station,
                required: true
            }
        ]
    }).then(result => {
        res.json(result)
    })
})

router.get("/mock", (req, res) => {
    const data = [
        {
            routeName: "本線",
            sortOrder: 1
        },
        {
            routeName: "いずみ野線",
            sortOrder: 2
        },
        {
            routeName: "厚木線",
            sortOrder: 3
        }
    ]

    for (const num of data) {
        db.Route.create(num)
    }

    res.json("done")
})

module.exports = router
