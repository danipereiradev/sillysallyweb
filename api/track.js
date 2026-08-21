/**
 * Lightweight click logger for ad landing CTAs.
 * Events show up in Vercel function logs (filter by "spotify_listen_click").
 * Primary measurement for Instagram ads should use Meta Pixel (VITE_META_PIXEL_ID).
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = { raw: body }
    }
  }

  const event = {
    ...(body && typeof body === 'object' ? body : {}),
    received_at: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || null,
    ua: req.headers['user-agent'] || null,
    referer: req.headers.referer || null,
  }

  console.log(JSON.stringify({ type: 'ad_landing_event', ...event }))

  return res.status(204).end()
}
