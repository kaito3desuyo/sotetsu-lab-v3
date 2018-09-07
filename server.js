const express = require("express")
const path = require("path")
const http = require("http")

const api = require("./server/routes/index.js")

const app = express()

app.use("/api", api)

app.use(express.static(path.join(__dirname, "dist/sotetsu-lab-v3")))
app.use("*", express.static(path.join(__dirname, "dist/sotetsu-lab-v3")))

const port = process.env.port || "3000"
app.set("port", port)

const server = http.createServer(app)

server.listen(port, () => console.log(`API running on localhost:${port}`))
