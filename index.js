const { create, Client } = require("@open-wa/wa-automate");
const options = require("./utils/options");
const { color, messageLog } = require("./utils");
const HandleMsg = require("./HandleMsg");
const gradient = require("gradient-string");
const figlet = require("figlet");
const style = require("./test/console"); // ! For console bot command
const {memberLimit,groupLimit,prefix} = require("./settings/setting.json"); //! For Bot Settings
const tag = require('./settings/tag') //! For message template

const start = (bocilClient = new Client()) => {
  console.log(
    gradient.instagram(
      figlet.textSync("RIZQY\nSTUDIO", {
        font: "Epic",
        horizontalLayout: "default",
      })
    )
  );
  console.log(style.dev("Made by R-Dev Studio"));
  console.log(style.bot("Have a nice day Rizqy :)"));
  console.log(style.bot("I'm ready for my Jobs"));

  // Mempertahankan sesi agar tetap nyala
  bocilClient.onStateChanged((state) => {
    console.log(style.warn(state));
    if (state === "CONFLICT" || state === "UNLAUNCHED")
      bocilClient.forceRefocus();
  });

  // ketika bot diinvite ke dalam group
  bocilClient.onAddedToGroup(async (chat) => {
    const groups = await bocilClient.getAllGroups();
    // kondisi ketika batas group bot telah tercapai,ubah di file settings/setting.json

    if (groups.length > groupLimit) {
      await bocilClient
        .sendText(
          chat.id,
            `Maaf, bot melebihi kapastias didalam grup\nMaksimal Group : ${groupLimit}`+ tag.ownerLink
        )
        .then(() => {
          bocilClient.leaveGroup(chat.id);
          bocilClient.deleteChat(chat.id);
        });
    } else {
      // kondisi ketika batas member group belum tercapai, ubah di file settings/setting.json
      if (chat.groupMetadata.participants.length < memberLimit) {
        await bocilClient
          .sendText(
            chat.id,
            `Maaf, minimal member grup adalah ${memberLimit}`, tag.owner
          )
          .then(() => {
            bocilClient.leaveGroup(chat.id);
            bocilClient.deleteChat(chat.id);
          });
      } else {
        await bocilClient.simulateTyping(chat.id, true).then(async () => {
          const groupName = chat.contact.name
          console.log(style.bot(`Added to group ${color(groupName,"white")}`))
          await bocilClient.sendText(
            chat.id,
            `Hai member ${groupName}\nUntuk melihat perintah pada bot ketik ${prefix}menu`
          );
        });
      }
    }
  });

  // ketika seseorang masuk/keluar dari group
  bocilClient.onGlobalParicipantsChanged(async (event) => {
    const host = (await bocilClient.getHostNumber()) + "@c.us";
    // kondisi ketika seseorang diinvite/join group lewat link
    if (event.action === "add" && event.who !== host) {
      await bocilClient.sendTextWithMentions(
        event.chat,
        `Hai, @${event.who.replace(
          "@c.us",
          ""
        )} \nSelamat datang digrup. Semoga menikmati unch`
      );
    }
    // kondisi ketika seseorang dikick/keluar dari group
    if (event.action === "remove" && event.who !== host) {
      await bocilClient.sendTextWithMentions(
        event.chat,
        `Jangan rindu @${event.who.replace("@c.us", "")}, Semoga tenang`
      );
    }
  });

  bocilClient.onIncomingCall(async (callData) => {
    // ketika seseorang menelpon nomor bot akan mengirim pesan
    await bocilClient
      .sendText(
        callData.peerJid,
        "Dilarang menelepon pada nomor ini, maaf anda terkena hukuman", tag.ownerLink
      )
      .then(async () => {
        // bot akan memblock nomor itu
        await bocilClient.contactBlock(callData.peerJid);
        console.log(style.spam("Blocked Someone"))
      });
  });

  // ketika seseorang mengirim pesan
  bocilClient.onMessage(async (message) => {
    bocilClient
      .getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
      .then((msg) => {
        if (msg >= 3000) {
          console.log(
            style.bot(`Loaded Message reach ${msg}, deleting message cache...`),
          );
          bocilClient.cutMsgCache();
        }
      });
    HandleMsg(bocilClient, message);
  });

  // Message log for analytic
  bocilClient.onAnyMessage((anal) => {
    messageLog(anal.fromMe, anal.type);
  });
};

//create session
create(options(true, start))
  .then((bocilClient) => start(bocilClient))
  .catch((err) => new Error(err));
