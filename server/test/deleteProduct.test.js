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
let idToDelete = ''


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
            return Product.create(newProduct)
        })
        .then(createdProduct => {
            idToDelete = createdProduct.id
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

describe (' Delete Product | Success Case ', () => {
    test(`Should send an object with key: success`, (done) => {
        request(app)
            .delete('/products/'+idToDelete)
            .set('access_token', adminToken)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('success', expect.any(Object))
                expect(res.body.success).toHaveProperty('message', `success delete product with id ${idToDelete}`)
                done()
            })
    })
})

describe (' Delete Product | Failed Case : no access_token ', () => {
    test(`Should send an object with keys: errors`, (done) => {
        request(app)
            .delete('/products/'+idToDelete)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(403)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'Need login user')
                done()
            })
    })
})


describe ('Delete Product | Fail case: access_token not belong to admin', () => {
    test('Should send an object with keys: errors', (done) => {
        request(app)
            .delete('/products/'+idToDelete)
            .set('access_token', userToken)
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
