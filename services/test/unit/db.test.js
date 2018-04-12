const config = require('../../config')
const logger = require('../../lib/logger')(config)
const dbConnect = require('../../lib/db')

describe('unit DB: Error with Database', () => {
  test('should respond as expected', async () => {
    await expect(dbConnect.connect('', logger)).rejects.toThrow(
      'Unable to connect to the database'
    )
  })
})

describe('unit DB: Working Database', () => {
  test('should respond as expected', async () => {
    const db = await expect(dbConnect.connect(config.db, logger))
    expect(db).toBeDefined()
    dbConnect.disconnect()
  })
})
