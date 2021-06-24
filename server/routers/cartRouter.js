const cartController = require('../controllers/cartController')
const { authorizeCustomer } = require('../middlewares/authorization')

const cartRouter = require('express').Router()
cartRouter.use( authorizeCustomer )
cartRouter.get('/', cartController.getCart)
cartRouter.post('/:productId', cartController.addToCart)
cartRouter.patch('/:productId', cartController.patchCart )
cartRouter.delete('/:productId', cartController.deleteCart)

module.exports = cartRouter