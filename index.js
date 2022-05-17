// const { application } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

app.use((request, response, next) => {
  console.log((request.method))
  console.log((request.path))
  console.log((request.body))
  console.log('------')
})

let notes = [
  {
    id: 1,
    content: 'Ir al gimnasio',
    important: false
  },
  {
    id: 2,
    content: 'Comer mucho',
    important: true
  },
  {
    id: 3,
    content: 'Ser groso en javascript',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello worlds</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log('Note number:', id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'not.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  console.log(maxId)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: note.important ? note.important : false
  }

  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
