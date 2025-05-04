const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    // repasse de mensagens de algum usuário para todo o server
    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log("Um furiano novo conectado")
})

