import { getInstagramFeedResponse } from '../lib/instagramFeed.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const result = await getInstagramFeedResponse()

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value)
    }
  }

  res.status(result.status).json(result.body)
}
