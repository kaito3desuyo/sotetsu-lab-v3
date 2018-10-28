const express = require("express")
const router = express.Router()

const passport = require("passport")

const db = require("../../models")

router.get("/", (req, res, next) => {
    db.User.findAll().then(result => {
        res.send(result)
    })
})

router.get(
    "/auth",
    passport.authenticate("local-login", {
        session: false,
        failureFlash: true
    }),
    (req, res, next) => {
        res.json(req.user)
    }
)

module.exports = router
