const { sign } = require('../helpers/jwt')
const {decode} = require('../helpers/bcrypt')
const {User} = require('../models')
class UsersController{
    static adminLogin(req, res, next){
        const inputAdmin = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: inputAdmin.email}})
            .then(foundAdmin => {
                // console.log(foundAdmin.role);
                if (!foundAdmin) {
                    next({name: "Invalid email and password"})
                } else if ( foundAdmin.role !== 'admin' ) {
                    next({name: "Invalid email and password"})
                } else if ( decode(inputAdmin.password, foundAdmin.password) ){
                    const payloadAdmin = {id: foundAdmin.id, username: foundAdmin.username, email: foundAdmin.email, role: foundAdmin.role}
                    const token = sign(payloadAdmin)
                    res.status(200).json({access_token: token})
                } else {
                    next({name: "Invalid email and password"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static customerRegister(req, res, next){
        const newCustomer = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        }
        User.create(newCustomer)
        .then(newUser=>{
            res.status(201).json({id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role})
        })
        .catch(err=>{
            if (err.name === "SequelizeUniqueConstraintError") {
                next({name: err.name, message:"This email already exist"})
            } else {
                next(err)
            }
        })
    }

    static customerLogin(req, res, next){
        const inputCustomer = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: inputCustomer.email}})
            .then(foundCustomer => {
                // console.log(foundCustomer.role);
                if (!foundCustomer) {
                    next({name: "Invalid email and password"})
                } else if ( foundCustomer.role !== 'customer' ) {
                    next({name: "Invalid email and password"})
                } else if ( decode(inputCustomer.password, foundCustomer.password) ){
                    const payloadCustomer = {
                        id: foundCustomer.id, 
                        username: foundCustomer.username, 
                        email: foundCustomer.email, 
                        role: foundCustomer.role
                    }
                    const token = sign(payloadCustomer)
                    res.status(200).json({access_token: token})
                } else {
                    next({name: "Invalid email and password"})
                }
            })
            .catch(err => {
                next(err)
            })}
}

module.exports = UsersController