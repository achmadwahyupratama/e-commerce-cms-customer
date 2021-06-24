const request = require('supertest')
const app = require('../app.js')

const userData = {
    username: 'Admin',
    email: 'admin@mail.com',
    password: '1234'
}

describe ('Login Admin | Success Case', ()=> {
    test('Should send an object with key: token', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({email: userData.email, password: userData.password})
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })
})

describe ('Login Admin | Failed Case: wrong password', () => {
    test ('Should send an object with key: errors', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({email: userData.email, password: '4321'})
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'Invalid email and password')
                expect(res.body).not.toHaveProperty('access_token')
                done()
            })
    })
})

describe ('Login Admin | Failed Case: wrong email', () => {
    test ('Should send an object with key: errors', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({email: 'amin@mail.com', password: userData.password})
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'Invalid email and password')
                expect(res.body).not.toHaveProperty('access_token')
                done()
            })
    })
})

describe ('Login Admin | Failed Case: empty email and password', () => {
    test ('Should send an object with key: errors', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({email: '', password: ''})
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Object))
                expect(res.body.errors).toHaveProperty('message', 'Invalid email and password')
                expect(res.body).not.toHaveProperty('access_token')
                done()
            })
    })
})