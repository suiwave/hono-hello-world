import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { indexQuerySchema, articleBodySchema } from './schema/req.js'



const indexRoute = new Hono().get('/', zValidator('query', indexQuerySchema, (result, c) => {
  if (!result.success) {
    return c.text(result.error.issues[0].message, 400)
  }
}), (c) => {
  return c.text('Hello Hono!')
})

const articleRoute = new Hono().post('/article', zValidator('json', articleBodySchema, (result, c) => {
  if (!result.success) {
    return c.text('invalid request', 400)
  }
}), (c) => {
  const { userId, title } = c.req.valid('json')
  return c.text(`${userId} posted ${title}`)
})

const app = new Hono()
  .route("/", indexRoute)
  .route("/", articleRoute)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

export { app }
export type AppType = typeof app
