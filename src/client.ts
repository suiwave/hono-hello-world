import type { AppType } from './index.js'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

const res = await client.article.$post({
    json: {
        userId: 123,
        title: "aaa",
    }
})