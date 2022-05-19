require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const Note = require('./models/Note')

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello worlds</h1>')
})

app.get('/api/notes', async (request, response) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = request.body

  const updatedNote = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, updatedNote, { new: true }) // property new returns the updated note, not the original one
    .then(result => {
      response.json(result)
    })
})

app.delete('/api/notes/:id', async (request, response) => {
  const id = request.params.id

  Note.findByIdAndDelete(id)
    .then(res => console.log(res))
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  const newNote = new Note({
    content: note.content,
    important: note.important ? note.important : false
  })

  newNote.save()
    .then(savedNote => {
      response.json(savedNote)
    })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
