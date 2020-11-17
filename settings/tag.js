const {ownerNumber} = require('./setting.json')

// https://wa.me/628985665498?text=%23menu%0A
// https://wa.me/628985665498?text=Feedback%20%3A%20
// https://wa.me/628985665498
//

const owner = `\nSelengkapnya bisa hubungi owner : @${ownerNumber.replace(
    "@c.us",
    ""
  )} as Developer`;

const ownerLink = `\nSelengkapnya bisa hubungi owner : https://wa.me/628985665498?text=Feedback%20%3A%20 as Developer`;

  module.exports = {
      owner,
      ownerLink
  }
  
