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
exports.warn = (string) => {
    return chalk.bgRedBright.whiteBright(`[WARN]\t`+`${string}`)
}
exports.group = (string) => {
    return chalk.green(`[GROUP]\t`+`${string}`)
}


//! For other Setting
exports.spam = () => {
    return chalk.red(`[SPAM]\t`)
}
    
//!No console
exports.msg = (string) => {
    return chalk.cyan(`${string}`)
}
exports.time = (string) => {
    return chalk.yellow(`${string}`)
}

//! For Spam Console
/**
 * 
 * @param  {Function} date function
 * @param  {string} command
 */

exports.spamChat = (date,command,string,name) => {
    return console.log(chalk.red(`[SPAM]\t`),chalk.yellowBright(date),chalk.red(command),chalk.white(string),chalk.cyan(name))
}

exports.spamGroup = (date,command,string,name,string2,grupName) => {
    return console.log(chalk.red(`[SPAM]\t`),chalk.yellowBright(date),chalk.red(command),chalk.white(string),chalk.cyan(name),chalk.white(string2),chalk.cyan(grupName))
}

//! For Execution
exports.exeChat = (date,command,string,name) => {
    return console.log(chalk.blueBright(`[EXEC]\t`),chalk.yellowBright(date),chalk.blueBright(command),chalk.white(string),chalk.cyan(name))
}
exports.exeGroup = (date,command,string,name,string2,grupName) => {
    return console.log(chalk.blueBright(`[EXEC]\t`),chalk.yellowBright(date),chalk.blueBright(command),chalk.white(string),chalk.cyan(name),chalk.white(string2),chalk.cyan(grupName))
}

//! For Bad Words 
exports.badWord = (date,command,string,name,string2,grupName) =>{
    return console.log(chalk.green(`[BADW]\t`),chalk.yellowBright(date),chalk.green(command),chalk.white(string),chalk.cyan(name),chalk.white(string2),chalk.cyan(grupName))
}

//! For Banned Person
exports.banPerson = (date,command,string,name) => {
    return console.log(chalk.bgGreen.black(`[BAN]\t${date} ${command} ${string} ${name}`))
}


