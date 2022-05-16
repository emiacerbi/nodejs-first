// const { application } = require('express')
const express = require('express')
const app = express()

let notes = [
  {
    "id": 1,
    "content": "Ir al gimnasio",
  },
  {
    "id": 2,
    "content": "Comer mucho",
  },
  {
    "id": 3,
    "content": "Ser groso en javascript",
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
  console.log(id)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})