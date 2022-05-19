const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URL

main().catch(err => console.log(err))

async function main () {
  await mongoose.connect(connectionString)
}
