const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    // repasse de mensagens entre usuários
    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(data.toString())
            }
        })
    })
})

// Função auxiliar para enviar mensagem do "sistema"
const enviarMensagemSistema = (conteudo) => {
    const mensagem = {
        usuarioId: "sistema",
        usuarioName: "Servidor",
        usuarioColor: "#888",
        conteudo
    }

    const mensagemString = JSON.stringify(mensagem)

    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(mensagemString)
        }
    })
}

// Mensagem a cada 1 minuto
setInterval(() => {
    enviarMensagemSistema("⏰ Dica: mantenha o respeito no chat.")
}, 60 * 1000)

setInterval(() => {
    enviarMensagemSistema("⏰ Reclames do plimplim: acesse nossa loja furia.gg .")
}, 90 * 1000)

setInterval(() => {
    enviarMensagemSistema("⏰ Arrasta pra cima: Nos siga nas redes sociais .")
}, 90 * 1000)

// Mensagem a cada 3 minutos
setInterval(() => {
    enviarMensagemSistema("💡 Você sabia? Você pode pressionar Shift + Enter para pular linha.")
}, 180 * 1000)
