'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const cors = require('cors')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'prod'

// define first schema
// types of data: string, int, bool
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({typeDefs, resolvers})

// configure cors
app.use(cors())

// using graphql in web with express middleware
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => console.log('app running at: ' + 'http://localhost:' + port))
