const {describe, it} = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API suite test', () => {
  describe('/contact', () => {
    it('should the request the contact page and return http status 200', async() => {
      const response = await request(app).get('/contact').expect(200);
      assert.deepStrictEqual(response.text, 'contact page...');
    });
  })

  describe('/hello', () => {
    it('should request a inexistent route /hi and reridrect to /hello', async() => {
      const response = await request(app).get('/hi').expect(200);
      assert.deepStrictEqual(response.text, 'o/  hello...')
    });
  })

  describe('/login', () => {
    it('should login sucessfully on the login route and return http status 200', async() => {
      const response = await request(app).post('/login').send({
        username: 'Lord', password:'123'
      }).expect(200);
      assert.deepStrictEqual(response.text, 'success!')
    });
  })

  describe('/login', () => {
    it('should unauthorize a resquest when requesting it using invalid username or password and return http stats 401', async() => {
      const response = await request(app).post('/login').send({
        username: 'Zeus', password: '456'
      }).expect(401)
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'login failed!')
    })
  })
})