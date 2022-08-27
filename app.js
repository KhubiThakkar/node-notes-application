const chalk = require('chalk')
const { argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    // Using arguments
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, // value is required
            type: 'string'  // input type would be string, even if nothing is provided
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // value is required
            type: 'string'  // input type would be string, even if nothing is provided
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()   // only then will the commands be parsed


// console.log(yargs.argv)

// if (command === 'add') {
//     console.log('Adding note!')
// }else if (command === 'remove') {
//     console.log('Removing note!')
// }