/**
 * Proxies Instagram media so the access token stays server-side (dev / preview).
 * Production uses /api/instagram.js on Vercel with the same shared lib.
 */

import { getInstagramFeedResponse } from '../lib/instagramFeed.js'

export function instagramApiPlugin() {
  return {
    name: 'instagram-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/instagram', createInstagramHandler())
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/instagram', createInstagramHandler())
    },
  }
}

function createInstagramHandler() {
  return async (req, res) => {
    if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    const result = await getInstagramFeedResponse()
    res.statusCode = result.status
    res.setHeader('Content-Type', 'application/json')
    if (result.headers) {
      for (const [key, value] of Object.entries(result.headers)) {
        res.setHeader(key, value)
      }
    }
    res.end(JSON.stringify(result.body))
  }
}
