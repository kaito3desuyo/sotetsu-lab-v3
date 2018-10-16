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
            result.addRoute("732f2e56-c7d0-44f7-b0e0-5a7cddecb37c", {
                through: { sequence: 0 }
            })
            result.addRoute("29fc1fb5-d5dd-4aeb-bee3-0ea6c837d5f7", {
                through: { sequence: 1 }
            })
            result.addRoute("b6ebb496-ce39-4520-898e-61db4a331b84", {
                through: { sequence: 2 }
            })
        })
    }

    res.json("done")
})

module.exports = router
