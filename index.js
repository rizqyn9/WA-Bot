const{create, Client} = require('@open-wa/wa-automate')
const{color} = require('./utils')
const messageHandler = require('./message/handler');
const options = require('./utils/options');



const start = (client = new Client()) => {
    console.log('[Rizqy]', color ('Rizqy - Bot', 'yellow'))
    console.log('[CLIENT] Client Running')
    
    client.onStateChanged((state) => {
        console.log('[CLIENT] State', state)
        if (state ==='CONFLICT') client.forceRefocus()
    })

    client.onMessage((message) => {
        client.getAmountOfLoadedMessages()  //* Clear message cache if cache more than blablabla (default == 3000)
        .then((msg) => {
            if (msg >= 4000){
                console.log('[CLIENT]', color(`Load message ${msg}, message cache`, 'yellow'))
                client.cutMsgCache()
            }
        })
    messageHandler(client,message)
    })

    //For Group invitation
    client.onAddedToGroup(({groupMetadata: {id}, contact: {name}}) =>
        client.getGroupMembersId(id)
            .then((ids) =>{
                console.log('[CLIENT]', color(`You invited to group [${name} members ${ids.length}]`, 'yellow'))

                // ? Note : Minimum menber for joinning
                if(ids.length <= 5){
                    client.sendText(id, 'Sorry, the minimum group is 5 user to use this bot. Bye '). then(() =>
                    client.leaveGroup(id))
                    }else{
                        client.sendText(id, `Hello group members ${name}, thank you for inviting this bot, to see the bot menu send *#menu*`)
                    }
                    
                }))
}

create('Imperial', options(true,start))
.then((client) => start(client))
.then((error) => new Error(error))


