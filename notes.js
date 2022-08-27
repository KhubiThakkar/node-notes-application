const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => note.title === title)
    // const duplicateNotes = notes.filter((note) => note.title === title)

    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })

    if(!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added with title: ' + title))
    }
    else {
        console.log(chalk.bgRed('Title already taken!'))
    }
}

const saveNotes = (notes) => {
    dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notePresent = notes.filter((note) => note.title === title)

    if (notePresent.length === 0) {
        console.log(chalk.bgRed('Title not found!'))
    }
    else {
        const modifiedData = notes.filter((note) => note.title != title)
        saveNotes(modifiedData)
        console.log(chalk.bgGreen('Removed the note with title: ' + title))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgYellow.black.bold('Your Notes!'))
    notes.forEach(note => {
        console.log(chalk.yellow(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const outputNote = notes.find((note) => note.title === title)

    if (outputNote){
        console.log(chalk.inverse(outputNote.title))
        console.log(outputNote.body)
    }
    else {
        console.log(chalk.bgRed('No note found with the title: '+title))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}