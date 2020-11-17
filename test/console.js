const chalk = require('chalk')

exports.bot = (string) => {
    return chalk.yellow(`[BOT]\t`+`${string}`)
}
exports.dev = (string) => {
    return chalk.magenta(`[DEV]\t`+`${string}`)
}
exports.exc = (string) => {
    return chalk.blueBright(`[EXC]\t`+`${string}`)
}
exports.spam = (string) => {
    return chalk.red(`[SPAM]\t`+`${string}`)
}
exports.warn = (string) => {
    return chalk.bgRedBright.whiteBright(`[WARN]\t`+`${string}`)
}
exports.group = (string) => {
    return chalk.bgRedBright.whiteBright(`[GROUP]\t`+`${string}`)
}

