const { create, Client } = require('@open-wa/wa-automate')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')
const gradient = require('gradient-string');
const figlet = require('figlet')
const con = require('./test/console')  // ! For console bot command


const start = (bocilClient = new Client()) => {
    console.log(gradient.instagram(figlet.textSync('RIZQY\nSTUDIO', { font: 'Epic', horizontalLayout: 'default' })))
    console.log(con.dev, color('Made by R-Dev Studio', 'blue'))
    console.log(con.bot, color('Have a nice day Rizqy :)', 'yellow'))
    console.log(con.bot, color("I'm ready for my Jobs", 'yellow'))

    // Mempertahankan sesi agar tetap nyala
    bocilClient.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') bocilClient.forceRefocus()
    })

    // ketika bot diinvite ke dalam group
    bocilClient.onAddedToGroup(async (chat) => {
	const groups = await bocilClient.getAllGroups()
	// kondisi ketika batas group bot telah tercapai,ubah di file settings/setting.json
	if (groups.length > groupLimit) {
	await bocilClient.sendText(chat.id, `Sorry, the group on this bot is full\nMax Group is: ${groupLimit}`).then(() => {
	      bocilClient.leaveGroup(chat.id)
	      bocilClient.deleteChat(chat.id)
	  }) 
	} else {
	// kondisi ketika batas member group belum tercapai, ubah di file settings/setting.json
	    if (chat.groupMetadata.participants.length < memberLimit) {
	    await bocilClient.sendText(chat.id, `Sorry, BOT comes out if the group members do not exceed ${memberLimit} people`).then(() => {
	      bocilClient.leaveGroup(chat.id)
	      bocilClient.deleteChat(chat.id)
	    })
	    } else {
        await bocilClient.simulateTyping(chat.id, true).then(async () => {
          await bocilClient.sendText(chat.id, `Hai minna~, Im bocilClient BOT. To find out the commands on this bot type ${prefix}menu`)
        })
	    }
	}
    })

    // ketika seseorang masuk/keluar dari group
    bocilClient.onGlobalParicipantsChanged(async (event) => {
        const host = await bocilClient.getHostNumber() + '@c.us'
        // kondisi ketika seseorang diinvite/join group lewat link
        if (event.action === 'add' && event.who !== host) {
            await bocilClient.sendTextWithMentions(event.chat, `Hello, Welcome to the group @${event.who.replace('@c.us', '')} \n\nHave fun with us✨`)
        }
        // kondisi ketika seseorang dikick/keluar dari group
        if (event.action === 'remove' && event.who !== host) {
            await bocilClient.sendTextWithMentions(event.chat, `Good bye @${event.who.replace('@c.us', '')}, We'll miss you✨`)
        }
    })

    bocilClient.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await bocilClient.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n-bot')
        .then(async () => {
            // bot akan memblock nomor itu
            await bocilClient.contactBlock(callData.peerJid)
        })
    })

    // ketika seseorang mengirim pesan
    bocilClient.onMessage(async (message) => {
        bocilClient.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[bocilClient]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    bocilClient.cutMsgCache()
                }
            })
        HandleMsg(bocilClient, message)    
    
    })
	
    // Message log for analytic
    bocilClient.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
}

//create session
create(options(true, start))
    .then((bocilClient) => start(bocilClient))
    .catch((err) => new Error(err))
