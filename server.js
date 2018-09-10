const express = require("express")
const path = require("path")
const http = require("http")

const api = require("./server/routes/index.js")

const app = express()

// CORSを許可する
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
    )
    next()
})

app.use("/api", api)

app.use(express.static(path.join(__dirname, "dist/sotetsu-lab-v3")))
app.use("*", express.static(path.join(__dirname, "dist/sotetsu-lab-v3")))

const port = process.env.port || "3000"
app.set("port", port)

const server = http.createServer(app)

server.listen(port, () => console.log(`API running on localhost:${port}`))
