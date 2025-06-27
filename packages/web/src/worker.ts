import { Hono } from 'hono'
import modelsData from 'models.dev/models.json'

const app = new Hono<{ Bindings: Environment }>()

app.get('/', (c) => {
  return c.env.ASSETS.fetch('/index.html', {
    headers: {
      'Content-Type': 'text/html'
    }
  })
})

app.get('/api.json', (c) => {
  c.header('Content-Type', 'application/json')
  c.header('Access-Control-Allow-Origin', '*')
  return c.json(modelsData)
})

export default app