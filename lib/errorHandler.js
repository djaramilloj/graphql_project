'use strict'

function errorHandler(error) {
    console.error(error);
    throw new Error ('internal server error')
}

module.exports = {
    errorHandler
}