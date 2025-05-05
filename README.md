# Furia - Desafio Técnico

## Experiência conversacional - Desenvolver um caso conversacional relacionado à FURIA (Telegram, web chat ou mobile chat)

### Backend

* [NodeJS](https://nodejs.org/docs/latest/api/)

### Dependências

#### [npm](https://docs.npmjs.com/) - Gerenciador de pacotes para facilitação do desenvolvimento em nodejs

* Inicialização: npm init -y

#### [ws](https://www.npmjs.com/package/ws) - Websocket para comunicação de mensagens para servidor e client

* Instalação: npm i ws

#### [dotenv](https://www.npmjs.com/package/dotenv) - Para criação de variáveis de ambiente

* Instalação: npm i dotenv

### Frontend

#### HTML5 semântico

#### CSS

* Responsividade
* Flexbox

#### Javascript

* Javascript puro no Frontend
* NodeJS no backend

### Como utilizar?

* Pode utilizar a url gerada pelo deploy na ferramenta render: [Aplicação](https://furia-frontend.onrender.com)

* Caso não utilize, o servidor após a instalação do npm deve rodar o comando: `npm run dev`
* Ele vai abrir o servidor e se houver quaisquer atualizações, não seria necessário rodar npm novamente

* O chat pode ser utilizado em diversas telas, cada uma simulando um usuário diferente

### Arquivos auxiliares

* .env para guardar as informações de endereços e mais informações sensíveis que não precisam ser compartilhadas no código

### Deploy

#### [Render](https://render.com/)

* Integração com github
* Possibilidade de subir backend e frontend no mesmo local
* Possibilidade de banco no plano free

#### [Github Actions](https://github.com/features/actions)

* CI/CD Automatizado

#### Features para implementação futura

* Reação dos membros no chat
* Estilizar corretamente as mensagens do bot para reclames do plim plim, redes sociais e propagandas da marca
* Implementação de fotos para os usuários ou svgs voltado para os usuários terem suas fotos de perfil
