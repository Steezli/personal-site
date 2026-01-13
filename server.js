import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1y', // Cache static assets for 1 year
  etag: true
}))

// Handle client-side routing - serve index.html for all routes
// Express static middleware handles static files first, so this only catches routes
app.get('*', (req, res) => {
  try {
    const indexPath = join(__dirname, 'dist', 'index.html')
    
    if (!existsSync(indexPath)) {
      console.error('index.html not found. Make sure to run "npm run build" first.')
      return res.status(500).send('Application not built. Please run "npm run build" first.')
    }

    const indexHtml = readFileSync(indexPath, 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'no-cache')
    res.send(indexHtml)
  } catch (error) {
    console.error('Error serving index.html:', error)
    res.status(500).send('Error loading application')
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT}`)
})
