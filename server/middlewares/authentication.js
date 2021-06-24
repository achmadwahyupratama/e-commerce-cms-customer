const { verify } = require('../helpers/jwt')
const { User } = require('../models')

async function authenticate(req, res, next){
    try {
        if (!req.headers.access_token) {
            next({name: 'No access token'})
        } else {
            const access_token = req.headers.access_token
            // console.log('masuk authenticate', access_token);
            const inputUser = verify(access_token)
            const validateUser = await User.findByPk(inputUser.id)
            if (validateUser) {
                req.activeUser = {id: validateUser.id, username: validateUser.username, email: validateUser.email, role: validateUser.role}
                next()
            } else {
                next({name: 'Invalid access token'})            
            }
        }
    } catch (error) {
        // console.log(error);
        next(error)        
    }
}

module.exports = authenticate