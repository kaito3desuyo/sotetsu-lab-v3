const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    res.send("calender")
})

router.get("/mock", (req, res) => {
    const data = [
        {
            calenderName: "平日",
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            startDate: new Date("2009, 11, 1"),
            endDate: new Date("2012, 4, 28")
        },
        {
            calenderName: "土休日",
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            startDate: new Date("2009, 11, 1"),
            endDate: new Date("2012, 4, 28")
        },
        {
            calenderName: "平日",
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            startDate: new Date("2012, 4, 29"),
            endDate: new Date("2014, 4, 26")
        },
        {
            calenderName: "土休日",
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            startDate: new Date("2012, 4, 29"),
            endDate: new Date("2014, 4, 26")
        },
        {
            calenderName: "平日",
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            startDate: new Date("2014, 4, 27"),
            endDate: new Date("2015, 5, 30")
        },
        {
            calenderName: "土休日",
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            startDate: new Date("2014, 4, 27"),
            endDate: new Date("2015, 5, 30")
        },
        {
            calenderName: "平日",
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            startDate: new Date("2015, 5, 31"),
            endDate: new Date("2017, 3, 17")
        },
        {
            calenderName: "土休日",
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            startDate: new Date("2015, 5, 30"),
            endDate: new Date("2017, 3, 17")
        },
        {
            calenderName: "平日",
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            startDate: new Date("2017, 3, 18"),
            endDate: null
        },
        {
            calenderName: "土休日",
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            startDate: new Date("2017, 3, 18"),
            endDate: null
        }
    ]

    for (const num of data) {
        db.Calender.create(num)
    }

    res.json("done")
})

module.exports = router
