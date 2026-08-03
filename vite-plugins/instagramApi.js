/**
 * Proxies Instagram media so the access token stays server-side (dev / preview).
 *
 * Supports:
 * 1) Instagram API with Instagram Login → graph.instagram.com
 * 2) Instagram API with Facebook Login → graph.facebook.com (+ Page / IG Business)
 */

const FB_GRAPH = 'https://graph.facebook.com/v21.0'
const IG_GRAPH = 'https://graph.instagram.com'

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

    const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()

    if (!token) {
      res.statusCode = 503
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          error: 'missing_token',
          message:
            'Falta INSTAGRAM_ACCESS_TOKEN en .env (cuenta Instagram Business/Creator).',
        }),
      )
      return
    }

    try {
      const payload =
        (await fetchViaInstagramLogin(token)) ||
        (await fetchViaFacebookLogin(token))

      if (!payload) {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            error: 'instagram_api_error',
            message:
              'Token no válido para Instagram. Usa un token de Instagram Login (graph.instagram.com) o un User/Page token de Facebook con página vinculada a Instagram Business.',
          }),
        )
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'public, max-age=300')
      res.end(JSON.stringify(payload))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          error: 'server_error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
      )
    }
  }
}

async function fetchViaInstagramLogin(token) {
  const profileUrl = new URL(`${IG_GRAPH}/me`)
  profileUrl.searchParams.set(
    'fields',
    'id,username,name,account_type,profile_picture_url,media_count',
  )
  profileUrl.searchParams.set('access_token', token)

  const mediaUrl = new URL(`${IG_GRAPH}/me/media`)
  mediaUrl.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
  )
  mediaUrl.searchParams.set('limit', '6')
  mediaUrl.searchParams.set('access_token', token)

  const [profileRes, mediaRes] = await Promise.all([
    fetch(profileUrl),
    fetch(mediaUrl),
  ])

  if (!profileRes.ok || !mediaRes.ok) return null

  const profile = await profileRes.json()
  const media = await mediaRes.json()
  return buildPayload(profile, media)
}

async function fetchViaFacebookLogin(token) {
  // Prefer explicit IG user id from env when available
  const configuredIgId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim()
  if (configuredIgId) {
    return fetchIgUserFeed(configuredIgId, token)
  }

  // Page access token: page has instagram_business_account
  const pageUrl = new URL(`${FB_GRAPH}/me`)
  pageUrl.searchParams.set(
    'fields',
    'id,name,instagram_business_account{id,username,name,profile_picture_url,media_count}',
  )
  pageUrl.searchParams.set('access_token', token)

  const pageRes = await fetch(pageUrl)
  if (pageRes.ok) {
    const page = await pageRes.json()
    const ig = page.instagram_business_account
    if (ig?.id) {
      return fetchIgUserFeed(ig.id, token, ig)
    }
  }

  // User token: look up pages → linked IG business account
  const accountsUrl = new URL(`${FB_GRAPH}/me/accounts`)
  accountsUrl.searchParams.set(
    'fields',
    'id,name,access_token,instagram_business_account{id,username,name,profile_picture_url,media_count}',
  )
  accountsUrl.searchParams.set('access_token', token)

  const accountsRes = await fetch(accountsUrl)
  if (!accountsRes.ok) return null

  const accounts = await accountsRes.json()
  const pageWithIg = (accounts.data || []).find(
    (p) => p.instagram_business_account?.id,
  )
  if (!pageWithIg) return null

  const pageToken = pageWithIg.access_token || token
  const ig = pageWithIg.instagram_business_account
  return fetchIgUserFeed(ig.id, pageToken, ig)
}

async function fetchIgUserFeed(igUserId, token, profileHint = null) {
  const profileUrl = new URL(`${FB_GRAPH}/${igUserId}`)
  profileUrl.searchParams.set(
    'fields',
    'id,username,name,profile_picture_url,media_count',
  )
  profileUrl.searchParams.set('access_token', token)

  const mediaUrl = new URL(`${FB_GRAPH}/${igUserId}/media`)
  mediaUrl.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
  )
  mediaUrl.searchParams.set('limit', '6')
  mediaUrl.searchParams.set('access_token', token)

  const [profileRes, mediaRes] = await Promise.all([
    fetch(profileUrl),
    fetch(mediaUrl),
  ])

  if (!mediaRes.ok) return null

  const profile = profileRes.ok
    ? await profileRes.json()
    : profileHint || { id: igUserId }
  const media = await mediaRes.json()
  return buildPayload(profile, media)
}

function buildPayload(profile, media) {
  const posts = (media.data || []).map((item) => ({
    id: item.id,
    caption: item.caption || '',
    mediaType: item.media_type,
    mediaUrl: item.media_url,
    thumbnailUrl: item.thumbnail_url || item.media_url,
    permalink: item.permalink,
    timestamp: item.timestamp,
  }))

  return {
    username: profile.username,
    name: profile.name || profile.username,
    avatar: profile.profile_picture_url || null,
    mediaCount: profile.media_count ?? null,
    posts,
  }
}
