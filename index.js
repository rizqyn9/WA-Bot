const { create, Client } = require('@open-wa/wa-automate')
const { color } = require('./utils')
const messageHandler = require('./message/handler/index.js~');
const options = require('./utils/options');



const start = (client = new Client()) => {
    console.log('[BOT]', color('RIZQY - BOT', 'yellow'))
    console.log('[CLIENT] Client started!')

    //*FORCE CURRENT SESSION
    client.onStateChanged((state) => {
        console.log('[CLIENT] State', state)
        if (state === 'CONFLICT') client.forceRefocus()
    })
        

    //*LISTENING ON MESSAGE 
    client.onMessage((message) => {
        client.getAmountOfLoadedMessages()  //* Clear message cache if cache more than blablabla (default == 3000)
            .then((msg) => {
                if (msg >= 4000) {
                    console.log('[CLIENT]', color(`Load message ${msg}, message cache`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        messageHandler(client, message)
    })

//! For Group invitation
    client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) =>
        client.getGroupMembersId(id)
            .then((ids) => {
                console.log('[CLIENT]', color(`You invited to group [${name} members ${ids.length}]`, 'yellow'))

//! Note : Minimum menber for joinning
                if (ids.length <= 2) {
                    client.sendText(id, 'Sorry, the minimum group is 2 user to use this bot. Maaf Sob,, ').then(() =>
                        client.leaveGroup(id))
                } else {
                    client.sendText(id, `Hello ${name}, thank you for inviting this bot, to see the bot menu send *#menu*`)
                }
            }))
    
    client.onRemovedFromGroup((data) =>
            console.log(data)
    )

    client.onGlobalParicipantsChanged((event)=>{
            if(event.action === 'add') client.sendTextWithMentions(event.chat, `Hai selamat datang digrup ${event.who.replace('@c.us','')}`)
    })

    client.onIncomingCall((call) =>{
        client.contactBlock(call.peerJid)
    })
}


create('Imperial', options(true, start))
    .then((client) => start(client))
    .then((error) => new Error(error))


