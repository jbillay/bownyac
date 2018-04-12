const server = require('../../lib/koa')
const config = require('../../config')
const request = require('supertest')
const jsonwebtoken = require('jsonwebtoken')
const logger = require('../../lib/logger')(config)

const db = {}
const sessionStore = {}
let app

beforeAll(async () => {
  app = await server.create(db, config, logger, sessionStore)
})

afterAll(async () => {
  app.close()
})

describe('routes: index', () => {
  test('should respond as expected', async () => {
    const response = await request(app.callback()).get('/user/test')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.msg).toEqual('Hello World')
  })
})

describe('routes: not Found', () => {
  test('should respond as expected', async () => {
    const response = await request(app.callback()).get('/notFound')
    expect(response.status).toEqual(404)
    expect(response.type).toEqual('application/json')
    expect(response.body.message).toEqual(
      'No endpoint matched your request: GET /notFound'
    )
  })
})

describe('routes: Securized route not authorized', () => {
  test('should respond as expected', async () => {
    const response = await request(app.callback()).get('/user')
    expect(response.status).toEqual(401)
    expect(response.type).toEqual('application/json')
    expect(response.body.error).toEqual('Not authorized')
  })
})

describe('routes: Securized route with a token', () => {
  test('should respond as expected', async () => {
    const token = jsonwebtoken.sign(
      { name: 'Jeremy', role: 'Admin' },
      config.secret
    )
    const response = await request(app.callback())
      .get('/user')
      .set('Authorization', 'bearer ' + token)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.name).toEqual('Jeremy')
    expect(response.body.role).toEqual('Admin')
  })
})

describe('routes: Get token', () => {
  test('should respond as expected', async () => {
    const response = await request(app.callback()).post('/auth')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.token).toBeDefined()
  })
})
