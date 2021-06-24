const {Product} = require('../models')

class ProductController{
    static createProduct(req, res, next){
        const newProduct = {
            productName: req.body.productName,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl
        }
        Product.create(newProduct)
            .then(data => {
                // console.log(data);
                const createdProduct = {
                    id: data.id,
                    productName: data.productName,
                    price: data.price,
                    stock: data.stock,
                    imageUrl: data.imageUrl
                }
                // console.log(createdProduct);
                res.status(201).json(createdProduct)
            })
            .catch(err => {
                next(err)
            })
    }

    static putProduct(req, res, next){
        const updateId =  Number(req.params.productId)
        const updateProduct = {
            productName: req.body.productName,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl
        }
        Product.update( updateProduct, {where : { id: updateId }, returning: true} )
            .then(result=>{
                // res.status(200).json(result[1][0])
                if (result[0] === 0) {
                    next({name: "Not Found", message:`Data with id ${updateId} not found`})
                } else {
                    res.status(200).json(result[1][0])
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static getProducts(req, res, next){
        Product.findAll({order: [['id','ASC']]})
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                next(err)
            })
    }

    static getProductById(req, res, next){
        const productId = +req.params.productId
        Product.findByPk( productId )
            .then((product) => {
                if (product) {
                    res.status(200).json(product)
                } else {
                    next({name: "Not Found", message: "Product not found"})
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        const idToDelete = +req.params.productId
        Product.destroy({where: {id: idToDelete}})
            .then((data) => {
                if (data) {
                    res.status(200).json({success: { message: `success delete product with id ${idToDelete}`}})
                } else {
                    next({name: "Not Found", message: "Product not found"})
                }
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = ProductController