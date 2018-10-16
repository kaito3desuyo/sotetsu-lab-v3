const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    res.send("operation")
})

router.get("/mock", (req, res) => {
    const serviceId = "c50a2afc-5e30-450a-b030-f9e66c4dec35"
    const weekday = "65c733b5-3996-481f-8c5b-e503bf3c708a"
    const holiday = "4cbfa40a-91e7-4fd5-8373-77b2b72d2e01"

    const data = []
    for (let i = 11; i <= 69; i++) {
        if ((20 <= i && i <= 40) || i === 50 || i === 60) {
            continue
        }
        data.push({
            serviceId,
            calenderId: weekday,
            operationNumber: i,
            tripSequence: null
        })
        data.push({
            serviceId,
            calenderId: holiday,
            operationNumber: i,
            tripSequence: null
        })
        console.log(data)
    }

    db.Operation.bulkCreate(data).then(result => {
        res.json("done")
    })
})

module.exports = router
