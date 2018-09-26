const express = require("express")
const router = express.Router()

const apiV1 = require("./v1/index.js")

router.use("/v1", apiV1)

module.exports = router
