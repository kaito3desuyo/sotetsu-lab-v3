const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("sa-ba-dayo ")
})

module.exports = router
