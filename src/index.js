const TelegramBot = require('node-telegram-bot-api');
const ENV = require('dotenv').config();
const port = process.env.PORT || 3000;
const token = (process.env.TOKEN || ENV.parsed.TOKEN);
const robo = require('./controllers/RoboController');
const helper = require('./helpers/functions');
const emoji = require('node-emoji');
const express = require('express');
const app = express();

const bot = new TelegramBot(token);
bot.setWebHook(process.env.HEROKU_URL + bot.token);

const routes = {
    start: {
        route: /\/start/,
        description: "/start: Primeira interação!!"
    },
    help: {
        route: /\/help/,
        description: "/help: Ajuda listando todos comandos."
    },
    echo: {
        route: /\/echo (.+)/,
        description: "/echo <frase>: Devolve o que vc escreveu."
    },
    // subscribe: {
    //     route: /\/subscribe/,
    //     description: "/subscribe: Se inscreve para receber informações do bot."
    // },
    // unsubscribe: {
    //     route: /\/unsubscribe/,
    //     description: "/unsubscribe: Se inscreve para receber informações do bot."
    // },
    link: {
        route: /\/link (.+)/,
        description: "/link <frase>: Retorna primeiro link pesquisado no google."
    },
    print: {
        route: /\/print (.+)/,
        description: "/print <frase>: Retorna print da pesquisa no google."
    }
};

function sentMsg (chatId, msg) {
    bot.sendMessage(chatId, msg);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!helper.validate(msg.text, routes)) {
        sentMsg(chatId, `${emoji.get('x')} Comando inválido, cheque todos com seus parametros em em /help`);
    }
});

bot.onText(routes.echo.route, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    sentMsg(chatId, resp);
});

bot.onText(routes.link.route, async (msg, match) => {
    const chatId = msg.chat.id;
    const termo = match[1];
    console.log(termo);
    const resp = await robo.link(termo);

    sentMsg(chatId, resp);
});

bot.onText(routes.print.route, async (msg, match) => {
    const chatId = msg.chat.id;
    const termo = match[1];
    const resp = await robo.print(termo);

    bot.sendPhoto(chatId, resp);
});

bot.onText(routes.start.route, (msg) => {
    const chatId = msg.chat.id;
    sentMsg(chatId, `Meu nome é Luan ${emoji.get('male_mage')}, todos os comandos estão em /help.`);
});

bot.onText(routes.help.route, (msg) => {
    const chatId = msg.chat.id;
    const array = Object.values(routes);

    const description = array.map(item => {
        return item.description;
    });

    let routeDescription = ` ${emoji.get('male_mage')} Comandos disponíveis:`;
    for (let i = 0; i < description.length; i++) {
        routeDescription += `\n` + description[i];
    }

    sentMsg(chatId, routeDescription);
});

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.listen(port);

app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.redirect('https://luanloose.github.io/');
});