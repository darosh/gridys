const uniqueRandomArray = require('unique-random-array')
const superheroes = require('@gridy/app-heroes')

exports.all = superheroes
exports.random = uniqueRandomArray(superheroes)
