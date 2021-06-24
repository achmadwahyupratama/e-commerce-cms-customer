const request = require('supertest')
const app = require('../app.js')
const { sign } = require('../helpers/jwt.js')
const {User, Product} = require('../models')
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    "username": "postgres",
    "password": "postgres",
    "database": "ecommerce_test",
    "host": "localhost",
    "dialect": "postgres"});
const queryInterface = sequelize.getQueryInterface();

const adminData = {
    username: 'Admin',
    email: 'admin@mail.com',
    password: '1234'
}
const testCustomer = {
    username: 'testCustomer',
    email: 'test@customer.com',
    password: '1234567'
}
let userToken = ''
let adminToken = ''


const newProduct = {
    productName: 'Samsung A72', 
    price: 5999999, 
    stock: 100, 
    imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-12349485/samsung_samsung_full01.jpg'
}

const productPreEdit = {
    id: 0,
    productName: '',
    price: 0,
    stock: 0,
    imageUrl: ''
}

const productPascaEdit = {
    productName: 'Samsung A72 EDITED',
    price: 9,
    stock: 9,
    imageUrl: 'editedURL.com'
}

beforeAll((done)=>{
    User.create({
        username: testCustomer.username,
        email: testCustomer.email,
        password: testCustomer.password
    })
        .then(userTest => {
            const payload = {
                id: userTest.id,
                username: userTest.username,
                email: userTest.email,
                role: userTest.role
            }
            userToken = sign(payload)
            return User.findOne({where: {email: adminData.email}})
        })
        .then(foundAdmin => {
            const payload = {
                id: foundAdmin.id,
                username: foundAdmin.username,
                email: foundAdmin.email,
                role: foundAdmin.role
            }
            adminToken = sign(payload)
            return Product.create(newProduct)
        })
        .then(createdProduct => {
            productPreEdit.id = createdProduct.id
            productPreEdit.productName = createdProduct.productName
            productPreEdit.price = createdProduct.price
            productPreEdit.stock = createdProduct.stock
            productPreEdit.imageUrl = createdProduct.imageUrl
            done()
        })
        .catch((err)=>{
            done(err)
        })
})


afterAll((done)=>{
        User.destroy({ where: { email: testCustomer.email } })
            .then((data)=> {
                return queryInterface.bulkDelete('Products', null, {});
            })
            .then((data)=>{
                done()
            })
            .catch((error) => {
                done(error)
            })
})



describe ('Edit Product | Success Case', () => {
    test('Should send an object with keys: productName, price, stock, imageUrl', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .set('access_token', adminToken)
            .send(productPascaEdit)
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('id', productPreEdit.id)
                expect(res.body).toHaveProperty('productName', productPascaEdit.productName)
                expect(res.body).toHaveProperty('price', productPascaEdit.price)
                expect(res.body).toHaveProperty('imageUrl', productPascaEdit.imageUrl)
                done()
            })
    })
})

         
describe ('Edit Product | Fail Case: no access_token', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .send(productPascaEdit)
            .end((err, res) => {
                // console.log(res.body);
                // console.log(err);
                if (err) return done(err)
                expect(res.status).toBe(403)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'Need login user')
                done()
            })
    })
})


describe ('Edit Product | Fail case: access_token not belong to admin', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .set('access_token', userToken)
            .send(productPascaEdit)
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'You are not authorized')
                done()
            })
    })
})


describe ('Edit Product | Fail Case: empty requirement field', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .set('access_token', adminToken)
            .send({productName:'', price:1000, stock:3, imageUrl:'' })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                      expect.objectContaining({
                        message: `Product's name required`
                      })
                    ])
                )
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                      expect.objectContaining({
                        message: `Image url required`
                      })
                    ])
                )
                done()
            })
    })
})


describe ('Edit Product | Fail Case: minus number on price field', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .set('access_token', adminToken)
            .send({productName:'Samsung A72', price:-1000, stock:3, imageUrl:'dummyurl.com' })
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                      expect.objectContaining({
                        message: `Price can not be negative`
                      })
                    ])
                )
                done()
            })
    })
})


describe ('Edit Product | Fail Case: minus number on stock field', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .set('access_token', adminToken)
            .send({productName:'Samsung A72', price:1000, stock:-3, imageUrl:'dummyUrl.com' })
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(
                    expect.arrayContaining([
                      expect.objectContaining({
                        message: `Stock minimum is 1`
                      })
                    ])
                )
                done()
            })
    })
})


describe ('Edit Product | Fail Case: non number input on price and stock', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .put('/products/'+productPreEdit.id)
            .set('access_token', adminToken)
            .send({productName:'Samsung A72', price:true, stock:'abcd', imageUrl:'dummyUrl.com' })
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'Required number format for price and stock')
                done()
            })
    })
})