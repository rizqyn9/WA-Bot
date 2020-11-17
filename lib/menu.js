const fs = require('fs-extra')
const { 
    prefix,
    WA_Owner,
    botVersion
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

exports.textTnC = () => {
    return 
`Syarat dan ketentuan :

- Dilarang melakukan spam pada bot, terutama menggunakan fiur download
- Dilarang telepon ke nomor bot, langsung *BLOCK OTOMATIS*
- Jangan lupa donasi agar bot tetap berjalan (*${prefix}donasi*)

Bila terjadi kerusakan atau masalah pada bot bisa hubungi : ${WA_Owner}`
}

exports.textMenu = (pushname) => {
    return `
Hai ${pushname} 🥰!
Selamat menggunakan bot dari R-Dev ${botVersion} 🥳

Donasi jika RDP mati
Open jasa pembuatan Bot WA : ${WA_Owner}
JASA = [*NOT FREE*]

Kirim perintah dibawah ini untuk menggunakan bot ini

Sticker creator :
➵ *${prefix}sticker*
➵ *${prefix}stickergif*

Tentang Bot:
➵ *${prefix}tnc*
➵ *${prefix}donasi*
➵ *${prefix}ownerbot*

Menu buat bos R-Dev
➵ *${prefix}ban* 
➵ *${prefix}bc* 
➵ *${prefix}leaveall* 
➵ *${prefix}clearall* 

Jangan lupa react dan donasi ya sob,
*${prefix}donasi*`
}


exports.textAdmin = () => {
    return `
[ *Hanya untuk Admin Grup* ]  

➵ *${prefix}add*
➵ *${prefix}kick* @tag
➵ *${prefix}promote* @tag
➵ *${prefix}demote* @tag
➵ *${prefix}tagall*
➵ *${prefix}del*


Menu buat bos R-Dev
➵ *${prefix}kickall*
`
}


exports.textDonasi = () => {
    return `
Terimakasih telah menggunakan bot ini, jika RDP mati maka bot tidak dapat digunakan, support developer sewa RDP mahal sob

Direct Donasi
OVO 08985665498
Dana 08985665498
GoPay 08985665498
Link Aja 08985665498

Donasi yang masuk akan digunakan untuk pengembangan dan pengoperasian bot R-Bot.
Terimakasih - Rizqy as DEV`
}
