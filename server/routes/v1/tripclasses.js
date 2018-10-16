const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    res.send("trip-class")
})

router.get("/mock", (req, res) => {
    const data = [
        {
            routeId: "732f2e56-c7d0-44f7-b0e0-5a7cddecb37c",
            tripClassName: "特急",
            tripClassColor: "#ff8000"
        },
        {
            routeId: "732f2e56-c7d0-44f7-b0e0-5a7cddecb37c",
            tripClassName: "急行",
            tripClassColor: "#ff0000"
        },
        {
            routeId: "732f2e56-c7d0-44f7-b0e0-5a7cddecb37c",
            tripClassName: "快速",
            tripClassColor: "#000080"
        },
        {
            routeId: "732f2e56-c7d0-44f7-b0e0-5a7cddecb37c",
            tripClassName: "各停",
            tripClassColor: "#000000"
        },
        {
            routeId: "732f2e56-c7d0-44f7-b0e0-5a7cddecb37c",
            tripClassName: "回送",
            tripClassColor: "#808080"
        },
        {
            routeId: "29fc1fb5-d5dd-4aeb-bee3-0ea6c837d5f7",
            tripClassName: "特急",
            tripClassColor: "#ff8000"
        },
        {
            routeId: "29fc1fb5-d5dd-4aeb-bee3-0ea6c837d5f7",
            tripClassName: "快速",
            tripClassColor: "#000080"
        },
        {
            routeId: "29fc1fb5-d5dd-4aeb-bee3-0ea6c837d5f7",
            tripClassName: "各停",
            tripClassColor: "#000000"
        },
        {
            routeId: "29fc1fb5-d5dd-4aeb-bee3-0ea6c837d5f7",
            tripClassName: "回送",
            tripClassColor: "#808080"
        },
        {
            routeId: "b6ebb496-ce39-4520-898e-61db4a331b84",
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
