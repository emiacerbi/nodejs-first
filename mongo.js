const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main () {
  await mongoose.connect('mongodb+srv://emiacerbi:HQb4OSlEokBps133@cluster0.8q3rk.mongodb.net/?retryWrites=true&w=majority')
}

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

Note.find({})
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => console.error(err))

// const note = new Note({
//   content: 'MongoDB rocks',
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => console.error(err))
