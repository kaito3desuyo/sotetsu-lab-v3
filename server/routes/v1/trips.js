const express = require("express")
const router = express.Router()

const db = require("../../models")

const Sequelize = require("sequelize")
const Op = Sequelize.Op

router.get("/", (req, res, next) => {
    // 列車取得
    const params = {
        dia: req.query.dia,
        day: req.query.day,
        direction: req.query.direction,
        start: req.query.start,
        max: req.query.max
    }

    const output = []
    db.Trip.findAll({
        where: {
            tripDirectionId: params.direction === "up" ? 0 : 1
        },
        include: [
            {
                model: db.Time,
                required: true,
                include: [
                    {
                        model: db.Stop,
                        required: true,
                        include: [
                            {
                                model: db.Station,
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                model: db.Calender,
                required: true,
                where: {
                    calenderName: params.day === "weekday" ? "平日" : "土休日",
                    startDate: "2017-03-18"
                }
            },
            {
                model: db.TripClass,
                required: false
            }
        ],
        order: [
            [db.Trip.associations.Times, "stopSequence", "ASC"],
            [db.Trip.associations.Times, "departureTime", "ASC"]
        ]
    }).then(result => {
        if (!params.start || !params.max) {
            for (const data of result) {
                output.push(data)
            }
        } else {
            for (let i = params.start; i < params.max; i++) {
                output.push(result[i])
            }
        }

        res.json(output)
    })
})

router.get("/mock", (req, res) => {
    const data = require("./../../mock-data/operation_table_20170318.json")
    const output = []
    //路線判別
    for (const num of data) {
        output.push({
            serviceId: "bbfee27b-36cf-4754-90ed-711adf882964",
            tripNumber: num.train_id,
            tripClassId: classchecker(num.class, "本線"),
            tripName: null,
            tripDirectionId: num.train_id % 2 !== 0 ? 1 : 0,
            blockId: num.train_id,
            calenderId:
                num.day === "weekday"
                    ? "ec3a5a6b-5b1a-4986-8e9c-0b6aa24b2e45"
                    : "4d6d9208-7dec-4670-8e2e-a82d24f4c5a4",
            extraCalenderId: null,
            Times: [{ stopId: "b3bce179-cd3b-49af-8ef9-15877048de91" }]
        })
    }

    db.Trip.bulkCreate(output, {}).then(createdInstances => {
        console.log(createdInstances)
        res.json("done")
    })
})

module.exports = router

function classchecker(classname, route) {
    if (route === "本線") {
        switch (classname) {
            case "特急":
                return "549c0f22-13c7-4cb8-995d-07974948e32f"
            case "急行":
                return "27af15c4-3f8a-4832-b7dd-1018ac8b232c"
            case "快速":
                return "6bc97568-293a-4706-8499-0a02ed6e72d7"
            case "各停":
                return "516bcc66-399d-4cf2-92b9-d30db2be2fff"
            case "回送":
                return "9408995f-3b18-4c1d-815c-a15197053e2e"
        }
    } else if (route === "いずみ野線") {
        switch (classname) {
            case "特急":
                return "eee17309-550a-4545-9f7b-63e4dc5cbd47"
            case "快速":
                return "e9cf55dd-5a0c-49a4-94d7-24bc2e4211c4"
            case "各停":
                return "b148ab73-cf8f-40e7-969d-e87d20b94e60"
            case "回送":
                return "e24c2ab2-56e0-4720-892f-278e615ccf92"
        }
    } else if (route === "厚木線") {
        switch (classname) {
            case "回送":
                return "7df78dc2-dbbf-4457-94ac-f345f34871ab"
        }
    }
}
