const { User, Cart, Product } = require('../models')

class cartController {
    static getCart(req, res, next){
        // console.log('masuk');
        // Cart.findAll({where: {UserId: req.activeUser.id}})
        Cart.findAll({include: Product, where: {UserId: req.activeUser.id}})
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                next(err)
            })
    }

    static async addToCart(req, res, next){
        // console.log('masuuukk');
        try {
            const productId = +req.params.productId
            const productToCart = {
                UserId: req.activeUser.id,
                ProductId: productId,
                quantity: 1
            }
            const foundCart = await Cart.findOne({where: {ProductId : productToCart.ProductId, UserId: req.activeUser.id}}) 
            if (!foundCart) {
                Cart.create(productToCart)
                    .then(createdCart => {
                        res.status(201).json(createdCart)
                    })
                    .catch(err => {
                        next(err)
                    })
            } else {
                Cart.update({quantity: foundCart.quantity + 1}, {where: { ProductId: foundCart.ProductId, UserId: req.activeUser.id}, returning: true})
                    .then(data => {
                        res.status(200).json(data[1][0])
                    })
                    .catch(err => {
                        next(err)
                    })
            }
        } catch (error) {
            next(error)
        }
    }

    static async patchCart(req, res, next){
        try {
            const productId = +req.params.productId
            const foundCart = await Cart.findOne({where: {ProductId : productId, UserId: req.activeUser.id}}) 
            if (req.body.method === 'add') {
                Cart.update({quantity: foundCart.quantity + 1}, {where: { ProductId: foundCart.ProductId, UserId: req.activeUser.id}, returning: true})
                    .then(data => {
                        res.status(200).json(data[1][0])
                    })
                    .catch(err => {
                        next(err)
                    })            
            } else {
                if (foundCart.quantity > 1) {
                    Cart.update({quantity: foundCart.quantity - 1}, {where: { ProductId: foundCart.ProductId, UserId: req.activeUser.id}, returning: true})
                        .then(data => {
                            res.status(200).json(data[1][0])
                        })
                        .catch(err => {
                            next(err)
                        })
                    
                } else {
                    Cart.destroy({where: { ProductId: productId, UserId: req.activeUser.id }})
                        .then(data=> {
                            res.status(200).json({success: {message: `Cart with product ${productId} successfully deleted`}})
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            }
        } catch (error) {
            next(error)
        }
        
    }
    static deleteCart(req, res, next){
        const productId = +req.params.productId
        Cart.destroy({where: { ProductId: productId, UserId: req.activeUser.id }})
            .then(data=> {
                res.status(200).json({success: {message: `Cart with product ${productId} successfully deleted`}})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = cartController