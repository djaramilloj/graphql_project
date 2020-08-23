'use strict'

const db = require('mongodb').MongoClient
let connection

async function connect(url){
    if (connection) return connection
    
    let client 
    try {
        client = await db.connect(url, {
          useNewUrlParser: true, 
          useUnifiedTopology: true
        })
        connection = client.db(process.env.DB_NAME)
    } catch (error) {
        console.error('Could not connect to db', error)
        process.exit(1)
    }
    
      return connection
}

module.exports = connect;