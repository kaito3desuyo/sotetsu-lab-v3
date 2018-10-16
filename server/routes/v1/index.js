const express = require("express")
const router = express.Router()

const stations = require("./stations.js")
const routes = require("./routes.js")
const services = require("./services.js")
const calenders = require("./calenders.js")
const trips = require("./trips.js")
const tripClasses = require("./tripclasses.js")
const times = require("./times.js")
const operations = require("./operations.js")

router.use("/stations", stations)
router.use("/routes", routes)
router.use("/services", services)
router.use("/calenders", calenders)
router.use("/trips", trips)
router.use("/trip-classes", tripClasses)
router.use("/times", times)
router.use("/operations", operations)

module.exports = router
