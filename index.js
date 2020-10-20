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
                const minMember = 2;
                if (ids.length <= minMember) {
                    client.sendText(id, `Maaf member grup harus lebih dari *${minMember}*, pamit dulu sob :(`).then(() =>
                        client.leaveGroup(id))
                } else {
                    client.sendText(id, `Hai *${name}*, terimakasih sudah menambahkan bot kedalam grup. \n ketik aja *#menu* untuk melihat perintah 🤗\n Aku sayang kalian xixixi`)
                }
            }))
    
    client.onRemovedFromGroup((data) =>
            console.log(data)
    )

    client.onGlobalParicipantsChanged((event)=>{
            if(event.action === 'add') client.sendTextWithMentions(event.chat, `Hai ${event.who.replace('@c.us','')} selamat bergabung, sapa dong teman-temannya`)
    })

    client.onIncomingCall((call) =>{
        client.contactBlock(call.peerJid)
    })
}


create('Imperial', options(true, start))
    .then((client) => start(client))
    .then((error) => new Error(error))


