const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    res.send("trip-class")
})

router.get("/mock", (req, res) => {
    const data = [
        {
            routeId: "db745f3f-f20c-46c4-a410-9435d7ae8a86",
            tripClassName: "特急",
            tripClassColor: "#ff8000"
        },
        {
            routeId: "db745f3f-f20c-46c4-a410-9435d7ae8a86",
            tripClassName: "急行",
            tripClassColor: "#ff0000"
        },
        {
            routeId: "db745f3f-f20c-46c4-a410-9435d7ae8a86",
            tripClassName: "快速",
            tripClassColor: "#000080"
        },
        {
            routeId: "db745f3f-f20c-46c4-a410-9435d7ae8a86",
            tripClassName: "各停",
            tripClassColor: "#000000"
        },
        {
            routeId: "db745f3f-f20c-46c4-a410-9435d7ae8a86",
            tripClassName: "回送",
            tripClassColor: "#808080"
        },
        {
            routeId: "7aac6609-9f7f-4991-bff6-34f8f462f03f",
            tripClassName: "特急",
            tripClassColor: "#ff8000"
        },
        {
            routeId: "7aac6609-9f7f-4991-bff6-34f8f462f03f",
            tripClassName: "快速",
            tripClassColor: "#000080"
        },
        {
            routeId: "7aac6609-9f7f-4991-bff6-34f8f462f03f",
            tripClassName: "各停",
            tripClassColor: "#000000"
        },
        {
            routeId: "7aac6609-9f7f-4991-bff6-34f8f462f03f",
            tripClassName: "回送",
            tripClassColor: "#808080"
        },
        {
            routeId: "b3bce179-cd3b-49af-8ef9-15877048de91",
            tripClassName: "回送",
            tripClassColor: "#808080"
        }
    ]

    for (const num of data) {
        db.TripClass.create(num)
    }

    res.json("done")
})

module.exports = router
