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
    req.connection.setTimeout(1500000000)
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
                            ? "ec3a5a6b-5b1a-4986-8e9c-0b6aa24b2e45"
                            : "4d6d9208-7dec-4670-8e2e-a82d24f4c5a4"
                }
            }).then(results => {
                for (const result of results) {
                    if (
                        result.serviceId ===
                        "bbfee27b-36cf-4754-90ed-711adf882964"
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
            return "2476f3d5-f0f9-45f0-931d-51a806a5ddcc"
        case "SO02":
            return "cf5f0208-65fa-4dd6-8356-4142b5d40f0c"
        case "SO03":
            return "f9800e20-32fb-4ec5-af60-4f61f8c6afdd"
        case "SO04":
            return "a11a615f-f5c1-40bd-9ac9-8f52ad1b958f"
        case "SO05":
            return "9f60fa62-bccf-4968-9b7f-7ab92c21cab3"
        case "SO06":
            return "2d91c2a3-c9ca-4ba9-abf0-3e29d7f1ba11"
        case "SO07":
            return "6a4d58be-52a2-4cfb-8cf4-87bd190128b2"
        case "SO08":
            return "517355fe-9ca0-4f5e-aaa7-aebb21a18889"
        case "SO09":
            return "7e8435cc-af85-4d5c-b82f-076290967832"
        case "SO10":
            return "effacec9-fe42-40b0-b214-3e080c2170f3"
        case "SO11":
            return "87e8eb2b-8d76-406e-b16b-48c7d88ffbef"
        case "SO12":
            return "c5cf3e04-f6d5-46fc-8c0c-724a1f57563a"
        case "SO13":
            return "3b6fcf46-6143-4f92-971a-90a26d5b080d"
        case "SO14":
            return "a9db5ffa-021f-44a6-8188-fc369810d23e"
        case "SO15":
            return "a7f9ecc1-14f7-471f-8097-21d613f93a5b"
        case "SO16":
            return "97823292-ca85-4719-8fef-dc1280b7e82a"
        case "SO17":
            return "fb6e262e-326a-47a4-bd27-946c224223ea"
        case "SO18":
            return "1c3af72a-d842-4310-b497-93541d0e58f3"
        case "SO31":
            return "f3507729-643b-45a8-a66c-d7e36e139ac6"
        case "SO32":
            return "92e4b666-c6d8-4ad1-8870-6bf19a3721d4"
        case "SO33":
            return "bb6ef8b7-52b6-426b-9d56-d7e5e56f0df4"
        case "SO34":
            return "8b3ee684-c572-48de-a967-6e17f5925794"
        case "SO35":
            return "b4d91c22-5fba-4659-aa2c-612f05a407b8"
        case "SO36":
            return "36d96a19-bdcc-44bc-90b3-6320915e25a6"
        case "SO37":
            return "dea41ea6-734b-43f3-a89e-c62639ca6bd8"
        case "SO41":
            return "e76a2da5-6d53-4621-9eec-50d7515f5a67"
    }
}

function stationchecker(str) {
    switch (str) {
        case "SO01":
            return "04afe3da-26a5-42a2-8d5e-8ae034cf734f"
        case "SO02":
            return "b7317532-4703-404a-8059-83d9d11c1fb4"
        case "SO03":
            return "d921b60e-e7aa-4ff0-b04f-4dd9af4bae6a"
        case "SO04":
            return "18cf54f1-5614-49f3-9f43-be145a6ef5a7"
        case "SO05":
            return "0a2ad5b9-00e3-4130-a0d8-11453dd5cf95"
        case "SO06":
            return "f0eec974-0c3c-4291-93d7-77ff526e3cea"
        case "SO07":
            return "d3d05815-0b84-4069-a4fa-63d1aee9a125"
        case "SO08":
            return "38ba87df-7ead-43e1-ba20-95521339216c"
        case "SO09":
            return "16bfe90a-935a-4332-9897-e65d29393a21"
        case "SO10":
            return "37a0bddb-959d-4a8e-80e2-71fff53836a2"
        case "SO11":
            return "ccc4bece-d04f-4815-9ba5-06a883e5a2a2"
        case "SO12":
            return "8227cc83-fb55-41e8-a48b-a3e41fe1feb7"
        case "SO13":
            return "34b7b5fa-c3ea-4c2b-94bf-f8acc271af07"
        case "SO14":
            return "d75e1e65-9948-40d4-a38b-dda49557f17f"
        case "SO15":
            return "a919da84-e609-4984-961d-13bc394ac280"
        case "SO16":
            return "a102b9a6-b03e-46bb-a2df-63282501085e"
        case "SO17":
            return "b90be173-f4da-49a2-9622-05bbe61af884"
        case "SO18":
            return "c759a566-535f-46fa-9192-72e64b7a4882"
        case "SO31":
            return "d7a1be6c-82ad-4576-9a19-a33398e409e6"
        case "SO32":
            return "5e4633e2-fe9c-4182-918b-aad0f71fee84"
        case "SO33":
            return "4179988a-4e8f-48b9-a9a4-d7ab294e7605"
        case "SO34":
            return "5ba6bffd-8264-4305-8957-e9e67d06d08e"
        case "SO35":
            return "5679d547-ba3a-4d72-9bb4-59e265a624b8"
        case "SO36":
            return "09f056c2-5ad2-4054-b419-61f91478f35c"
        case "SO37":
            return "f07d9508-d08e-4aae-a1e3-d81b9443840a"
        case "SO41":
            return "f3d5f94a-2166-4c71-89a8-b1f496a5ea51"
    }
}
