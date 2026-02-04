import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
const PORT = process.env.PORT || 3000
const API_KEY = process.env.COMIC_VINE_API_KEY

console.log('API_KEY loaded:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT FOUND')

if (!API_KEY) {
  throw new Error('COMIC_VINE_API_KEY environment variable is required')
}

// Test endpoint to verify proxy is working
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    apiKeyPresent: !!API_KEY,
    apiKeyPreview: API_KEY ? `${API_KEY.substring(0, 10)}...` : 'missing'
  })
})

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// API proxy routes (must come before static file serving)
app.use('/api', createProxyMiddleware({
  target: 'http://comicvine.gamespot.com',
  changeOrigin: true,
  secure: false,
  followRedirects: true,
  pathRewrite: (path, req) => {
    const [pathname, queryString] = path.split('?')
    const searchParams = new URLSearchParams(queryString || '')

    // Always replace api_key (even if empty) with our API key
    searchParams.set('api_key', API_KEY)

    // Reconstruct path with query string (keep /api prefix)
    const newPath = '/api/' + pathname + (searchParams.toString() ? '?' + searchParams.toString() : '')

    return newPath
  },
  onProxyRes: (proxyRes, req, res) => {
    // Ensure CORS headers are passed through
    proxyRes.headers['access-control-allow-origin'] = '*'
    // Remove cookies to prevent domain mismatch errors (Cloudflare sets cookies with invalid domains)
    delete proxyRes.headers['set-cookie']
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message)
    res.status(500).json({ error: 'Proxy error', message: err.message })
  }
}))

// Serve static files from dist directory (Vue app)
const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))

  // This only runs if no static file was found
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Not found' })
    }
    // Only handle GET requests for SPA routing
    if (req.method === 'GET') {
      res.sendFile(join(distPath, 'index.html'))
    } else {
      next()
    }
  })
} else {
  console.warn(`Warning: dist directory not found at ${distPath}. Static files will not be served.`)
  console.warn('Make sure to run "pnpm build" before starting the server in production.')
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Serving static files from: ${existsSync(distPath) ? distPath : 'NOT FOUND'}`)
})