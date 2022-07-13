const users = require('../users')

const x = users.find(elem => elem.email === "f20211725@pilani.bits-pilani.ac.in")

console.log(x)