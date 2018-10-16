const express = require("express")
const router = express.Router()

const db = require("../../models/index")

router.get("/test", (req, res) => {
    console.log(req.query.order)
    //オーダー部
    const orders = []
    if (req.query.order) {
        for (const order of req.query.order) {
            const separatedOrder = order.split(",")

            const secondSeparatedOrder = separatedOrder[0].split(".")

            const secondOrders = []
            for (const str of secondSeparatedOrder) {
                switch (str) {
                    case "Station":
                        break
                    case "Route":
                        secondOrders.push(db.Station.associations.Route)
                        break
                    case "Time":
                        secondOrders.push(db.Station.associations.Times)
                        break
                    case "Trip":
                        secondOrders.push(db.Time.associations.Trip)
                        break
                    case "Calender":
                        secondOrders.push(db.Trip.associations.Calender)
                        break
                    case "Operation":
                        secondOrders.push(db.Trip.associations.Operation)
                        break
                    case "TripTimes":
                        secondOrders.push(db.Trip.associations.Times)
                        break
                    case "Stop":
                        secondOrders.push(db.Station.associations.Stops)
                        break
                }
            }
            secondOrders.push(
                secondSeparatedOrder[secondSeparatedOrder.length - 1],
                separatedOrder[1]
            )
            orders.push(secondOrders)
        }
        console.log(orders)
    }

    //アソシエーション部
    const includes = []
    const secondIncludes = []
    const thirdIncludes = []

    if (req.query.include) {
        if (
            req.query.include.Route &&
            req.query.include.Route.status === "true"
        ) {
            includes.push({
                model: db.Route,
                required: true,
                where: req.query.include.Route.where
            })
        }

        if (
            req.query.include.Time &&
            req.query.include.Time.status === "true"
        ) {
            if (
                req.query.include.Time.Trip &&
                req.query.include.Time.Trip.status === "true"
            ) {
                if (
                    req.query.include.Time.Trip.Calender &&
                    req.query.include.Time.Trip.Calender.status === "true"
                ) {
                    thirdIncludes.push({
                        model: db.Calender,
                        required: true,
                        where: req.query.include.Time.Trip.Calender.where
                    })
                }
                if (
                    req.query.include.Time.Trip.Operation &&
                    req.query.include.Time.Trip.Operation.status === "true"
                ) {
                    thirdIncludes.push({
                        model: db.Operation,
                        required: false,
                        where: req.query.include.Time.Trip.Operation.where,
                        include: {
                            model: db.Calender,
                            required: true
                        }
                    })
                }
                if (
                    req.query.include.Time.Trip.Time &&
                    req.query.include.Time.Trip.Time.status === "true"
                ) {
                    thirdIncludes.push({
                        model: db.Time,
                        required: true,
                        include: {
                            model: db.Station,
                            required: true
                        }
                    })
                }
                if (
                    req.query.include.Time.Trip.tripClass &&
                    req.query.include.Time.Trip.tripClass.status === "true"
                ) {
                    thirdIncludes.push({
                        model: db.TripClass,
                        required: true
                    })
                }

                secondIncludes.push({
                    model: db.Trip,
                    required: true,
                    where: req.query.include.Time.Trip.where,
                    include: thirdIncludes
                })
            }

            includes.push({
                model: db.Time,
                required: true,
                where: req.query.include.Time.where,
                include: secondIncludes
            })
        }

        if (
            req.query.include.Stop &&
            req.query.include.Stop.status === "true"
        ) {
            includes.push({
                model: db.Stop,
                required: true,
                where: req.query.include.Stop.where
            })
        }
    }

    db.Station.findAll({
        order: orders,
        include: includes,
        where: req.query.where ? req.query.where : null
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get("/", (req, res) => {
    console.log(req.query.direction)
    // 駅情報の取得

    const params = {
        direction: req.query.direction
    }
    db.Station.findAll({
        order: [
            ["sortOrder", params.direction === "down" ? "ASC" : "DESC"],
            [db.Station.associations.Times, "departureTime", "ASC"]
        ],
        include: [
            {
                model: db.Route,
                required: true
            },
            {
                model: db.Time,
                required: false,
                include: {
                    model: db.Trip,
                    required: true,
                    where: {
                        tripDirectionId: 1 //上下線選択
                    },
                    include: {
                        model: db.Calender,
                        required: true,
                        where: {
                            calenderName: "土休日" //曜日選択
                        }
                    }
                }
            },
            {
                model: db.Stop,
                required: true
            }
        ]
    }).then(result => {
        res.json(result)
    })
})

router.get("/mock", (req, res) => {
    const data = [
        {
            stationName: "横浜",
            stationNumbering: "SO01",
            routeId: "本線",
            operatingKilometers: 0.0,
            sortOrder: 1,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                }
            ]
        },
        {
            stationName: "平沼橋",
            stationNumbering: "SO02",
            routeId: "本線",
            operatingKilometers: 0.9,
            sortOrder: 2,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "西横浜",
            stationNumbering: "SO03",
            routeId: "本線",
            operatingKilometers: 1.8,
            sortOrder: 3,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "天王町",
            stationNumbering: "SO04",
            routeId: "本線",
            operatingKilometers: 2.4,
            sortOrder: 4,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "星川",
            stationNumbering: "SO05",
            routeId: "本線",
            operatingKilometers: 3.3,
            sortOrder: 5,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                },
                {
                    stopName: "4番線"
                }
            ]
        },
        {
            stationName: "和田町",
            stationNumbering: "SO06",
            routeId: "本線",
            operatingKilometers: 4.3,
            sortOrder: 6,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "上星川",
            stationNumbering: "SO07",
            routeId: "本線",
            operatingKilometers: 5.0,
            sortOrder: 7,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "西谷",
            stationNumbering: "SO08",
            routeId: "本線",
            operatingKilometers: 6.9,
            sortOrder: 8,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                },
                {
                    stopName: "4番線"
                }
            ]
        },
        {
            stationName: "鶴ヶ峰",
            stationNumbering: "SO09",
            routeId: "本線",
            operatingKilometers: 8.5,
            sortOrder: 9,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "二俣川",
            stationNumbering: "SO10",
            routeId: "本線",
            operatingKilometers: 10.5,
            sortOrder: 10,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                },
                {
                    stopName: "4番線"
                }
            ]
        },
        {
            stationName: "希望ヶ丘",
            stationNumbering: "SO11",
            routeId: "本線",
            operatingKilometers: 12.2,
            sortOrder: 18,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "三ツ境",
            stationNumbering: "SO12",
            routeId: "本線",
            operatingKilometers: 13.6,
            sortOrder: 19,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "瀬谷",
            stationNumbering: "SO13",
            routeId: "本線",
            operatingKilometers: 15.5,
            sortOrder: 20,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                },
                {
                    stopName: "4番線"
                }
            ]
        },
        {
            stationName: "大和",
            stationNumbering: "SO14",
            routeId: "本線",
            operatingKilometers: 17.4,
            sortOrder: 21,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "相模大塚",
            stationNumbering: "SO15",
            routeId: "本線",
            operatingKilometers: 19.3,
            sortOrder: 22,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "さがみ野",
            stationNumbering: "SO16",
            routeId: "本線",
            operatingKilometers: 20.5,
            sortOrder: 23,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "かしわ台",
            stationNumbering: "SO17",
            routeId: "本線",
            operatingKilometers: 21.8,
            sortOrder: 24,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                },
                {
                    stopName: "4番線"
                }
            ]
        },
        {
            stationName: "海老名",
            stationNumbering: "SO18",
            routeId: "本線",
            operatingKilometers: 24.6,
            sortOrder: 25,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "南万騎が原",
            stationNumbering: "SO31",
            routeId: "いずみ野線",
            operatingKilometers: 12.1,
            sortOrder: 11,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "緑園都市",
            stationNumbering: "SO32",
            routeId: "いずみ野線",
            operatingKilometers: 13.6,
            sortOrder: 12,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "弥生台",
            stationNumbering: "SO33",
            routeId: "いずみ野線",
            operatingKilometers: 15.4,
            sortOrder: 13,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "いずみ野",
            stationNumbering: "SO34",
            routeId: "いずみ野線",
            operatingKilometers: 16.5,
            sortOrder: 14,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                },
                {
                    stopName: "3番線"
                },
                {
                    stopName: "4番線"
                }
            ]
        },
        {
            stationName: "いずみ中央",
            stationNumbering: "SO35",
            routeId: "いずみ野線",
            operatingKilometers: 18.7,
            sortOrder: 15,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "ゆめが丘",
            stationNumbering: "SO36",
            routeId: "いずみ野線",
            operatingKilometers: 19.8,
            sortOrder: 16,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "湘南台",
            stationNumbering: "SO37",
            routeId: "いずみ野線",
            operatingKilometers: 21.8,
            sortOrder: 17,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        },
        {
            stationName: "厚木",
            stationNumbering: "SO41",
            routeId: "厚木線",
            operatingKilometers: 26.0,
            sortOrder: 26,
            Stops: [
                {
                    stopName: "1番線"
                },
                {
                    stopName: "2番線"
                }
            ]
        }
    ]

    for (const num of data) {
        if (num.routeId === "本線") {
            num.routeId = "732f2e56-c7d0-44f7-b0e0-5a7cddecb37c"
        } else if (num.routeId === "いずみ野線") {
            num.routeId = "29fc1fb5-d5dd-4aeb-bee3-0ea6c837d5f7"
        } else if (num.routeId === "厚木線") {
            num.routeId = "b6ebb496-ce39-4520-898e-61db4a331b84"
        }
        db.Station.create(num, {
            include: [
                {
                    model: db.Stop
                }
            ]
        })
    }

    res.json("done")
})

module.exports = router
