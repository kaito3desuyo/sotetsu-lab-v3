const express = require("express")
const path = require("path")
const http = require("http")
const bodyParser = require("body-parser")
const passport = require("passport")
const cors = require("cors")

const api = require("./server/routes/index.js")

const app = express()

// ミドルウェア読み込み
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
require("./server/middlewares/passport")(passport)

// CORSを許可する
app.use(cors())

app.use("/api", api)

app.use(express.static(path.join(__dirname, "dist/sotetsu-lab-v3")))
app.use("*", express.static(path.join(__dirname, "dist/sotetsu-lab-v3")))

const port = process.env.port || "3000"
app.set("port", port)

const server = http.createServer(app)

server.listen(port, () => console.log(`API running on localhost:${port}`))
