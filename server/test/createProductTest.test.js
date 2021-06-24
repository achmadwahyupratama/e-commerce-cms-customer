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


describe ('Create Product | Success Case', () => {
    test('Should send an object with keys: productName, price, stock, imageUrl', (done) => {
        request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send(newProduct)
            .end((err, res) => {
                // console.log(res.body);
                if (err) return done(err)
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('id', expect.any(Number))
                expect(res.body).toHaveProperty('productName', newProduct.productName)
                expect(res.body).toHaveProperty('price', newProduct.price)
                expect(res.body).toHaveProperty('imageUrl', newProduct.imageUrl)
                done()
            })
    })
})

         
describe ('Create Product | Fail Case: no access_token', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .post('/products')
            .send(newProduct)
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


describe ('Create Product | Fail case: access_token not belong to admin', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .post('/products')
            .set('access_token', userToken)
            .send(newProduct)
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


describe ('Create Product | Fail Case: empty requirement field', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({productName:'', price:1000, stock:3, imageUrl:'' })
            .end((err, res) => {
                // console.log(res.body);
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


describe ('Create Product | Fail Case: minus number on price field', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .post('/products')
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


describe ('Create Product | Fail Case: minus number on stock field', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .post('/products')
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


describe ('Create Product | Fail Case: non number input on price and stock', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .post('/products')
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