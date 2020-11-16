const figlet = require('figlet')
const gradient = require('gradient-string');
const chalkAnimation = require('chalk-animation');

const rainbow = chalkAnimation.rainbow('Lorem ipsum').stop(); // Don't start the animation
 

 
const frame = rainbow.frame(); // Get the second frame
    console.log(frame);


console.log(gradient.instagram(figlet.textSync('RIZQY\nSTUDIO', { font: 'Epic', horizontalLayout: 'default' })))