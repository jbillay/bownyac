const server = require('../../lib/koa')
const config = require('../../config')
const request = require('supertest')

const configWrong = {
  mode: 'secure',
  secret: 'S€cr€tB0wnY@c',
  db: 'mongodb://test/error',
  redis: 'bownyac-session'
}

describe('routes: index', () => {
  test('should respond as expected', async () => {
    const app = await server.create(config)
    const response = await request(app.callback()).get('/')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.data).toEqual('Hello World')
  })
})

describe('routes: not Found', () => {
  test('should respond as expected', async () => {
    const app = await server.create(config)
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
    const app = await server.create(config)
    const response = await request(app.callback()).get('/home')
    expect(response.status).toEqual(401)
    expect(response.type).toEqual('application/json')
    expect(response.body.error).toEqual('Not authorized')
  })
})

describe('routes: Error with Database', () => {
  test('should respond as expected', async () => {
    await expect(server.create(configWrong)).rejects.toThrow(
      'Unable to connect to the database'
    )
  })
})
