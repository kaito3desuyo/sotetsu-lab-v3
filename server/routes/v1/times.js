const express = require("express")
const router = express.Router()

const db = require("../../models")

router.get("/", (req, res, next) => {
    db.Time.findAll({
        include: [
            {
                model: db.Trip,
                required: true,
                include: [{ model: db.TripClass }]
            },
            {
                model: db.Stop,
                required: true,
                include: [{ model: db.Station }]
            }
        ]
    }).then(result => {
        res.json(result)
    })
})

router.get("/mock", (req, res) => {
    req.connection.setTimeout(
        150000000000000000000000000000000000000000000000000000000
    )
    const data = require("./../../mock-data/operation_table_20170318.json")
    const exec = []
    const output = []

    for (const num of data) {
        exec.push(
            db.Trip.findAll({
                where: {
                    tripNumber: num.train_id,
                    calenderId:
                        num.day === "weekday"
                            ? "65c733b5-3996-481f-8c5b-e503bf3c708a"
                            : "4cbfa40a-91e7-4fd5-8373-77b2b72d2e01"
                }
            }).then(results => {
                for (const result of results) {
                    if (
                        result.serviceId ===
                        "c50a2afc-5e30-450a-b030-f9e66c4dec35"
                    ) {
                        let count = 0
                        if (result.tripDirectionId === 0) {
                            //上り
                            for (let i = 41; i >= 1; i--) {
                                let str = null

                                str = `SO${1 <= i && i <= 9 ? `0${i}` : i}`
                                if (
                                    i === 10 &&
                                    num[`${str}_arr`] &&
                                    num[`${str}_dep`]
                                ) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: num[`${str}_arr`],
                                        departureDays: 0,
                                        departureTime: num[`${str}_dep`]
                                    })
                                    count++
                                } else if (
                                    i === 10 &&
                                    num[`${str}_arr`] &&
                                    !num[`${str}_dep`]
                                ) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: num[`${str}_arr`],
                                        departureDays: 0,
                                        departureTime: null
                                    })
                                    count++
                                } else if (
                                    i === 10 &&
                                    !num[`${str}_arr`] &&
                                    num[`${str}_dep`]
                                ) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: null,
                                        departureDays: 0,
                                        departureTime: num[`${str}_dep`]
                                    })
                                    count++
                                } else if (num[str]) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: i === 1 ? num[str] : null,
                                        departureDays: 0,
                                        departureTime: i !== 1 ? num[str] : null
                                    })
                                    count++
                                }
                            }
                        } else if (result.tripDirectionId === 1) {
                            //下り
                            for (let i = 1; i <= 41; i++) {
                                let str = null

                                str = `SO${1 <= i && i <= 9 ? `0${i}` : i}`
                                if (
                                    i === 10 &&
                                    num[`${str}_arr`] &&
                                    num[`${str}_dep`]
                                ) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: num[`${str}_arr`],
                                        departureDays: 0,
                                        departureTime: num[`${str}_dep`]
                                    })
                                    count++
                                } else if (
                                    i === 10 &&
                                    num[`${str}_arr`] &&
                                    !num[`${str}_dep`]
                                ) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: num[`${str}_arr`],
                                        departureDays: 0,
                                        departureTime: null
                                    })
                                    count++
                                } else if (
                                    i === 10 &&
                                    !num[`${str}_arr`] &&
                                    num[`${str}_dep`]
                                ) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime: null,
                                        departureDays: 0,
                                        departureTime: num[`${str}_dep`]
                                    })
                                    count++
                                } else if (num[str]) {
                                    // console.log(`${str}=>${num[str]}`)
                                    output.push({
                                        tripId: result.id,
                                        stationId: stationchecker(str),
                                        stopId: stopchecker(str),
                                        stopSequence: count,
                                        pickupType: 0,
                                        dropoffType: 0,
                                        arrivalDays: 0,
                                        arrivalTime:
                                            i === 18 || i === 37 || i === 41
                                                ? num[str]
                                                : null,
                                        departureDays: 0,
                                        departureTime:
                                            i !== 18 && i !== 37 && i !== 41
                                                ? num[str]
                                                : null
                                    })
                                    count++
                                }
                            }
                        }
                    }
                }
                return results
            })
        )
    }

    Promise.all(exec).then(result => {
        db.Time.bulkCreate(output).then(then => {
            res.send("done")
        })
    })
})

module.exports = router

function stopchecker(str) {
    switch (str) {
        case "SO01":
            return "17d19e51-b027-496e-9693-7c2c2692864a"
        case "SO02":
            return "0b6bbce1-4f03-45ae-9686-2dda32797bde"
        case "SO03":
            return "ca7cb87d-d8aa-40cd-a9f0-3acf695682be"
        case "SO04":
            return "0a8f9d72-1160-4fe9-9721-b3109874fda1"
        case "SO05":
            return "d1b51663-adc5-4866-8815-529904e84f00"
        case "SO06":
            return "5da62c7d-f799-4c6f-badb-3bfcf614fe71"
        case "SO07":
            return "87b51c11-3a07-4a80-91e2-b7ffcaaa14a1"
        case "SO08":
            return "362bbf05-eff0-4628-9384-dbc425b95692"
        case "SO09":
            return "8f4aa2de-aff7-4d0a-a888-d340c6bb60db"
        case "SO10":
            return "d131408b-2330-437f-a241-3dccdb8d9620"
        case "SO11":
            return "91304a94-5cdb-404a-8bc9-d62e1df72a94"
        case "SO12":
            return "8d3d8b61-9a41-4ad3-93a3-ce6bdb9e0130"
        case "SO13":
            return "67732676-12c9-43c7-90fe-f01027c21a88"
        case "SO14":
            return "75567194-d116-438d-b554-ea8ee2101a47"
        case "SO15":
            return "56c3fccc-d345-4477-9db0-653c8673ef81"
        case "SO16":
            return "074cde38-d1fb-4bf3-b613-9e7c63a29a2f"
        case "SO17":
            return "46eee1d2-138f-48a8-b31e-6227c11e3e88"
        case "SO18":
            return "ef798431-3966-4f84-898c-f1c4298a1de5"
        case "SO31":
            return "5ccd4e40-3472-4b12-92d2-c6b517b1da99"
        case "SO32":
            return "b33bb4a6-97cd-4c9e-ae64-e0f2f92f924e"
        case "SO33":
            return "d055ac9c-255d-47e5-be60-be5dd0f684fc"
        case "SO34":
            return "40787c40-84d1-4b44-841e-30b448e5da95"
        case "SO35":
            return "dfc46b9c-8456-4253-b5dc-8fae1b5ecd5d"
        case "SO36":
            return "5ea738bb-7b0d-4ae2-9d3c-f8d52a68fbab"
        case "SO37":
            return "3c779edd-0e4e-4723-9395-5ec1062ed623"
        case "SO41":
            return "af8b7a78-fc37-4402-8082-bbd2f7be0168"
    }
}

function stationchecker(str) {
    switch (str) {
        case "SO01":
            return "b25757b8-b68f-4454-9349-38519acf9273"
        case "SO02":
            return "1da7db48-1a45-4834-9d42-3b7efd8a517c"
        case "SO03":
            return "f003f7fc-83f3-4bfd-b48f-f06f3603db59"
        case "SO04":
            return "4aedf169-536f-431b-b170-529eaf99ba02"
        case "SO05":
            return "c9978334-bb8f-403b-be36-9480aaefa7b0"
        case "SO06":
            return "4b973f6d-b59f-4b9b-9b22-3428ee31e9c3"
        case "SO07":
            return "835edc58-ff72-4095-99fa-01f1fee70830"
        case "SO08":
            return "c3637f6f-045d-4d3c-af68-b2c413a7754e"
        case "SO09":
            return "0a4e8a84-9ca4-4098-af6b-d6ce32e56fdf"
        case "SO10":
            return "f064ab35-a3cd-4007-9d02-f823206de63f"
        case "SO11":
            return "e7fea0cd-a8c6-4e89-b1f6-0feec731162c"
        case "SO12":
            return "0fd50022-93ef-4d24-871c-d7ea3471e133"
        case "SO13":
            return "8d833a01-e5f0-4821-a789-b1d5b3ffdcbd"
        case "SO14":
            return "6603048e-5119-4f67-a528-9bb7b285496b"
        case "SO15":
            return "cee419e6-5c6f-4fa5-a070-fb93ebab0255"
        case "SO16":
            return "9a1b6a71-bdcb-46b5-94e2-36ef7625a7bf"
        case "SO17":
            return "1061684a-235d-4bd7-b24c-6015c1ace0bc"
        case "SO18":
            return "d34e2bf8-ef31-4a7b-96ec-4844d8c8135e"
        case "SO31":
            return "61008030-3e1f-42b3-aa1d-c242b220d170"
        case "SO32":
            return "9fe83c63-bfcb-43b4-820e-98290543fea6"
        case "SO33":
            return "217e404b-4d92-4550-83cb-64f89aa0e0ad"
        case "SO34":
            return "e1bff868-1786-4aa1-9efc-720614491657"
        case "SO35":
            return "6960fcf8-adb7-43eb-9b3a-ee529501f7fe"
        case "SO36":
            return "7595fc58-bae8-49df-bdc7-3dd061d6f597"
        case "SO37":
            return "7ee1b666-9859-4a41-bc67-6a429dd64c8a"
        case "SO41":
            return "01b403a8-c165-40f4-8f73-9a923f6cbb2a"
    }
}
