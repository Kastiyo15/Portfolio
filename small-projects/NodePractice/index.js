console.log('hello world');

// process is a global variable. like console and global.
console.log(process.platform);


// run a callback function on exit
process.on('exit', function() {
    //do something!
})

// or build your own version of this
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('lunch', () => {
    console.log('yum')
})
eventEmitter.emit('lunch');


// Sync is a 'blocking' code, need to finish it before it can move on
const { readFile, readFileSync } = require('fs');
const txt = readFileSync('.hello.txt', 'utf8');
console.log(txt);