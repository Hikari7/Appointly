const mongoose = require('mongoose')
require('dotenv').config()

const runDB = async () => {
  return await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DBNAME })
}

const connect = runDB()
connect.then(() => console.log("Connected to DB")).catch(err => console.error(err))



