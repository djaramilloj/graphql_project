'use strict'
const querys = require('./query')
const mutations = require('./mutation')
const types = require('./types')

module.exports = {
    Query: querys,
    Mutation: mutations,
    ...types
}