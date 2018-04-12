/**
 * @api {get} /user Test function
 * @apiVersion 0.0.1
 * @apiName /
 * @apiGroup User
 *
 * @apiSuccess {String} data Confirmation message
 *
 * @apiSuccessExample {jsonp} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "name": "Jeremy",
 *        "role": "Admin",
 *     }
 *
 */
const getCurrentUser = async function getCurrentUser(ctx) {
  ctx.logger.log('debug', 'In getCurrentUser controller')
  ctx.ok({
    name: ctx.state.user.name,
    role: ctx.state.user.role
  })
}

// // TODO: Remove that test
// /**
//  * @api {get} /user/test Test function
//  * @apiVersion 0.0.1
//  * @apiName Test
//  * @apiGroup Users
//  *
//  * @apiSuccess {String} data Confirmation message
//  *
//  * @apiSuccessExample {jsonp} Success-Response:
//  *     HTTP/1.1 200 OK
//  *     {
//  *        "data": "Hello World"
//  *     }
//  *
//  */
const test = async function test(ctx) {
  ctx.logger.log('debug', 'In the test controller')
  ctx.ok({ msg: 'Hello World' })
}

module.exports = { getCurrentUser, test }
