const { create, Client } = require('@open-wa/wa-automate')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')
const gradient = require('gradient-string');
const figlet = require('figlet')
// const {con} = require('./test/console')  // ! For console bot command
const tes = require('./test/console')

// console.log(gradient.instagram(figlet.textSync('RIZQY\nSTUDIO', { font: 'Epic', horizontalLayout: 'default' })))
// console.log(con.dev, color('Made by R-Dev Studio', 'magenta'))
// console.log(con.bot, color('Have a nice day Rizqy :)', 'yellow'))
// console.log(con.bot, color("I'm ready for my Jobs", 'yellow'))

console.log(tes("bot"))