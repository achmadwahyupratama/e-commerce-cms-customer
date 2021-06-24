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
            return queryInterface.bulkInsert('Products',[
                {
                    productName: 'Product 1', 
                    price: 10, 
                    stock: 10, 
                    imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-12349485/samsung_samsung_full01.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date()

                },
                {
                    productName: 'Product 2', 
                    price: 10, 
                    stock: 10, 
                    imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-12349485/samsung_samsung_full01.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date()

                },
                {
                    productName: 'Product 3', 
                    price: 10, 
                    stock: 10, 
                    imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-12349485/samsung_samsung_full01.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date()

                }
            ], {})
        })
        .then(data => {
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


describe (' Read Product | Success Case', () => {
    test(`Should send array of objects: Product`, (done) => {
        request(app)
            .get('/products')
            .set('access_token', adminToken)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            productName: 'Product 1'
                        })
                    ])
                )
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            productName: 'Product 2'
                        })
                    ])
                )
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            productName: 'Product 3'
                        })
                    ])
                )
                done()
            })
    })
})
