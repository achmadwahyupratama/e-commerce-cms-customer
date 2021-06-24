const ProductController = require('../controllers/productsController')
const UsersController = require('../controllers/usersController')
const authenticate = require('../middlewares/authentication')
const {authorizeAdmin, authorizeCustomer} = require('../middlewares/authorization')
const cartRouter = require('./cartRouter')
const router = require('express').Router()

router.post('/loginAdmin', UsersController.adminLogin )
router.post('/register', UsersController.customerRegister)
router.post('/login', UsersController.customerLogin)

router.use( authenticate )
router.get('/products', ProductController.getProducts)
router.get('/products/:productId', ProductController.getProductById)
router.use('/carts', cartRouter)

router.use( authorizeAdmin )
router.post('/products', ProductController.createProduct )
router.put('/products/:productId', ProductController.putProduct)
router.delete('/products/:productId', ProductController.deleteProduct)



module.exports = router