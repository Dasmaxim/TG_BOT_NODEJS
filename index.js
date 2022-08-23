const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5599127129:AAGDPJsDjGXQPK1WF3GmBaUfLRiXlABY4j8'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Угадай цифру от 0 до 9')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber
            await bot.sendMessage(chatId,'Отгадывай', gameOptions)
        }

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Hello, world!'},
        {command: '/info', description: 'Get user info!'},
        {command: '/game', description: 'Numbers'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendMessage(chatId, 'you wrote' + text)
            return bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/147/1bc/1471bc7c-a3ba-4adc-89cd-0d326b883f2e/192/1.webp')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, 'Тебя зовут' + {msg.from.first_name} + {msg.from.last_name})
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'dont understand this')
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again'){
           return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, 'Right! #' + chats[chatId], againOptions)
        } else {
            return bot.sendMessage(chatId, 'Wrong! #' + chats[chatId], againOptions) 
        }
        
            bot.sendMessage(chatId, data)
    })
}

start()