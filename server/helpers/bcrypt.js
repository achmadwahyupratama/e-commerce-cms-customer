const bcrypt = require('bcryptjs')

function encode (password){
    return bcrypt.hashSync(password, 10)
}

function decode (password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {encode, decode}