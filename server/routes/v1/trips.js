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

    for (const num of data) {
        output.push(columnPussher(num))
    }
    /*
    //路線判別
    for (const num of data) {
        const day =
            num.day === "weekday"
                ? "65c733b5-3996-481f-8c5b-e503bf3c708a"
                : "4cbfa40a-91e7-4fd5-8373-77b2b72d2e01"

        output.push({
            serviceId: "c50a2afc-5e30-450a-b030-f9e66c4dec35",
            operationId: operationChecker(day, num.operation_id),
            tripNumber: num.train_id,
            tripClassId: classchecker(num.class, "本線"),
            tripName: null,
            tripDirectionId: num.train_id % 2 !== 0 ? 1 : 0,
            blockId: num.train_id,
            calenderId:
                num.day === "weekday"
                    ? "65c733b5-3996-481f-8c5b-e503bf3c708a"
                    : "4cbfa40a-91e7-4fd5-8373-77b2b72d2e01",
            extraCalenderId: null
        })
    }
    */

    Promise.all(output).then(results => {
        db.Trip.bulkCreate(results, {}).then(createdInstances => {
            console.log(createdInstances)
            res.json("done")
        })
    })
    /*
    db.Trip.bulkCreate(output, {}).then(createdInstances => {
        console.log(createdInstances)
        res.json("done")
    })
    */
})

module.exports = router

function columnPussher(data) {
    return new Promise((resolve, reject) => {
        const day =
            data.day === "weekday"
                ? "65c733b5-3996-481f-8c5b-e503bf3c708a"
                : "4cbfa40a-91e7-4fd5-8373-77b2b72d2e01"
        db.Operation.findOne({
            where: {
                serviceId: "c50a2afc-5e30-450a-b030-f9e66c4dec35",
                calenderId: day,
                operationNumber: data.operation_id
            }
        }).then(result => {
            const resultArray = {
                serviceId: "c50a2afc-5e30-450a-b030-f9e66c4dec35",
                operationId: result ? result.id : null,
                tripNumber: data.train_id,
                tripClassId: classchecker(data.class, "本線"),
                tripName: null,
                tripDirectionId: data.train_id % 2 !== 0 ? 1 : 0,
                blockId: data.train_id,
                calenderId: day,
                extraCalenderId: null
            }

            resolve(resultArray)
        })
    })
}

function classchecker(classname, route) {
    if (route === "本線") {
        switch (classname) {
            case "特急":
                return "4c3e75cb-37ce-40be-9ebd-fc58b3360962"
            case "急行":
                return "4440feea-5f1c-4d21-b17b-b770760ed53a"
            case "快速":
                return "ad60076f-1fdb-48af-adc6-f7bcbffd14a9"
            case "各停":
                return "50f47e69-0189-43bc-9223-975529c07ba0"
            case "回送":
                return "df7bdacd-a6ed-460f-82aa-5174008b67f8"
        }
    } else if (route === "いずみ野線") {
        switch (classname) {
            case "特急":
                return "562435e4-5397-4698-a92c-8f87c809f245"
            case "快速":
                return "46b90102-b9f2-46eb-b334-b51095b85752"
            case "各停":
                return "452a51b6-4ccb-4fec-90a7-4dce464bb7d5"
            case "回送":
                return "a3b15ad3-b45c-431f-ad68-b23407201a68"
        }
    } else if (route === "厚木線") {
        switch (classname) {
            case "回送":
                return "21e612c3-21e1-46ec-b2f9-b0f0dc0f5cfe"
        }
    }
}
