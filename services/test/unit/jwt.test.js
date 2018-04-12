const jwt = require('../../lib/jwt')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../../config')
const logger = require('../../lib/logger')(config)

function fakeNext() {
  return true
}

describe('unit JWT: Jwt functions', () => {
  test('Should not split the authorization token', async () => {
    const ctx = {
      header: {
        authorization: 'FAKE2TOKEN'
      },
      logger: logger,
      config: {
        secret: 'test'
      }
    }
    await jwt.jwt(ctx, fakeNext)
    expect(ctx.status).toEqual(401)
    expect(ctx.body.error).toEqual('Not authorized')
  })

  test('Should not use Bearer authorization', async () => {
    const ctx = {
      header: {
        authorization: 'Auth FAKE2TOKEN'
      },
      logger: logger,
      config: {
        secret: 'test'
      }
    }
    await jwt.jwt(ctx, fakeNext)
    expect(ctx.status).toEqual(401)
    expect(ctx.body.error).toEqual('Not authorized')
  })

  test('Should work with Bearer authorization', async () => {
    const token = jsonwebtoken.sign({ name: 'Jeremy', role: 'Admin' }, 'test')
    const ctx = {
      header: {
        authorization: 'Bearer ' + token
      },
      logger: logger,
      config: {
        secret: 'test'
      },
      state: {
        user: ''
      }
    }
    await jwt.jwt(ctx, fakeNext)
    expect(ctx.state.user.name).toEqual('Jeremy')
    expect(ctx.state.user.role).toEqual('Admin')
  })
})
