/**
 * Let the user know nothing was found here.
 */
const notFoundHandler = async function notFoundHandler(ctx) {
  const msg = `${ctx.request.method} ${ctx.request.path}`
  ctx.set('Content-Type', 'application/json')
  ctx.notFound({ message: `No endpoint matched your request: ${msg}` })
}

module.exports = notFoundHandler
