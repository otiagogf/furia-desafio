const login = document.querySelector('.login')
const loginForm = login.querySelector('.login-form')
const loginName = login.querySelector('.login-name')

const chat = document.querySelector('.chat')
const chatEnvios = chat.querySelector('.chat-envios')
const chatMensagem = chat.querySelector('.chat-mensagem')
const chatGeralMensagens = chat.querySelector('.chat-mensagens')

const logoff = document.querySelector('.logoff')
const deslogar = logoff.querySelector('.button-logoff')

const usuarioChat = { id: "", name: "", color: "" }

let websocket;

const cores = [
    "#FF6B6B", 
    "#FFA07A", 
    "#FFD93D", 
    "#FFB347", 
    "#FF9CEE", 
    "#FFCBF2", 
    "#E0BBE4", 
    "#A0E7E5", 
    "#B5F2EA", 
    "#AFF8DB", 
    "#C1FBA4", 
    "#F3FFBD", 
    "#D3F8E2", 
    "#BDE0FE", 
    "#A2D2FF"
];

// randomizando a escolha do array de cores para a cor do usuário escrevendo no chat
const getColor = () => {
    const random = Math.floor(Math.random() * cores.length)
    return cores[random]
}


const iniciaConexao = () => {
    websocket = new WebSocket('wss://furia-backend-ytgv.onrender.com')
}

const handleLogin = (event) => {
    event.preventDefault()

    usuarioChat.id = crypto.randomUUID()
    usuarioChat.name = loginName.value 
    usuarioChat.color = getColor()

    // transição do login para o chat
    login.style.display = 'none'
    chat.style.display = 'flex'

    deslogar.style.display = 'block'

    iniciaConexao()
    websocket.onmessage = coreMessages
}

// Métodos chat
const coreMessages = ({ data }) => {
    const { usuarioId, usuarioName, usuarioColor, conteudo } = JSON.parse(data) 

    let mensagem;

    if (usuarioId === "sistema") {
        mensagem = criarMensagemDoSistema(conteudo)
    } else if (usuarioId === usuarioChat.id) {
        mensagem = criarPropriaMensagem(conteudo)
    } else {
        mensagem = criarOutrasMensagens(conteudo, usuarioName, usuarioColor)
    }

    chatGeralMensagens.appendChild(mensagem)

    scroll()
}

const criarMensagemDoSistema = (conteudo) => {
    const div = document.createElement("div") 
    div.classList.add("mensagem-sistema")
    div.innerHTML = `<i>${conteudo}</i>` // itálico pra dar um destaque

    return div;
}



const criarPropriaMensagem = (conteudo) => {
    const div = document.createElement("div") 

    div.classList.add("minha-mensagem-enviada")
    div.innerHTML = conteudo

    return div;
}

const criarOutrasMensagens = (conteudo, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
     

    div.classList.add("outras-mensagens")
    span.classList.add("message-sender")

    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += conteudo

    return div;
}

const enviaMensagem = (event) => {
    event.preventDefault()

    const mensagem = {
        usuarioId: usuarioChat.id,
        usuarioName: usuarioChat.name,
        usuarioColor: usuarioChat.color,
        conteudo: chatMensagem.value
    }

    websocket.send(JSON.stringify(mensagem))

    chatMensagem.value = ""
    
}

// enviar mensagem com enter 
chatMensagem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        chatEnvios.requestSubmit()
    }
})

// Controle de scrollagem
const scroll = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

// Desconectar 
const sairDoChat = () => {
    deslogar.addEventListener("click", () => {
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            websocket.close(1000, "Usuário saiu do chat") 
        }

        alert("Você saiu do chat.")
        location.reload() 
    })

    document.body.appendChild(deslogar)
}

window.addEventListener("load", sairDoChat)
loginForm.addEventListener('submit', handleLogin)
chatEnvios.addEventListener('submit', enviaMensagem)
