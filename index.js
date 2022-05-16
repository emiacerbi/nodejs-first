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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
