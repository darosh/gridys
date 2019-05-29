var uniqueRandomArray = require('unique-random-array')
var superheroes = require('@gridy/games-heroes')

exports.all = superheroes
exports.random = uniqueRandomArray(superheroes)
