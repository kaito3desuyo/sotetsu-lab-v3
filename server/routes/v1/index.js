const express = require("express")
const router = express.Router()

const stations = require("./stations.js")
const routes = require("./routes.js")

router.use("/stations", stations)
router.use("/routes", routes)

module.exports = router
