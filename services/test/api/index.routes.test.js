const server = require('../../lib/koa');
const config = require('../../config');
const request = require('supertest');

describe("routes: index", () => {
  test("should respond as expected", async () => {
    const app = await server.create(config);
    const response = await request(app.callback()).get("/");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.data).toEqual('Hello World');
  });
});
