const chalk = require('chalk')


// ! For console bot command

const bot=(chalk.yellow('[BOT]\t'))
const dev=(chalk.magenta('[DEV]\t'))
const exc=(chalk.blueBright('[EXC]\t'))
const spam=(chalk.red('[SPAM]\t'))

exports.tes = (e) => {
    if(e=="bot") (chalk.yellow('[BOT]\t'));
}

// module.exports = {
//     con: {
//         bot,
//         dev,
//         exc,
//         spam
//     }
// }
