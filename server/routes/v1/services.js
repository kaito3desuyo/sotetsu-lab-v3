const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res) => {
    db.Service.findAll({
        include: [
            {
                model: db.Route,
                required: true
            },
            {
                model: db.Trip,
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
            serviceName: "相鉄本線／いずみ野線",
            serviceDescription: null
        }
    ]

    for (const num of data) {
        db.Service.create(num, {}).then(result => {
            result.addRoute("db745f3f-f20c-46c4-a410-9435d7ae8a86", {
                through: { sequence: 0 }
            })
            result.addRoute("7aac6609-9f7f-4991-bff6-34f8f462f03f", {
                through: { sequence: 1 }
            })
            result.addRoute("b3bce179-cd3b-49af-8ef9-15877048de91", {
                through: { sequence: 2 }
            })
        })
    }

    res.json("done")
})

module.exports = router
