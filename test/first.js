const style = require('./console')
const moment = require('moment-timezone')
const { time } = require('console')
const command = "[HELP]"
const pushname = "Rizqy Nugroho"
const grupName = "Pes"


const timeFormat = moment(1).format('DD/MM/YY HH:mm:ss')
style.spamChat(`${timeFormat}`,command,'from',pushname)

spamChat = (date,command,string,name) => {
    return chalk.red(`[SPAM]\t`),chalk.yellow(date),chalk.cyan(command),chalk.white(string),chalk.cyan(name)
}

style.spamChat(`${timeFormat}`,command,'from',pushname)
style.spamGroup(timeFormat,command,'from',pushname,'in',grupName)
style.exeChat(timeFormat,command,'from',pushname)
style.exeGroup(timeFormat,command,'from',pushname,'in',grupName)
style.badWord(timeFormat,command,'from',pushname,'in',grupName)
style.banPerson(timeFormat,command,'from',pushname)
