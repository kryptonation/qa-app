import express from 'express'
import cors from 'cors'
import { createClient } from '@vercel/kv'

const app = express()
app.use(cors())
app.use(express.json())

// Initialize KV client
const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// Initial data
const initialData = {
  questions: [],
  users: [
    { name: "John Smith", email: "john.smith@example.com" },
    { name: "Sarah Johnson", email: "sarah.j@example.com" },
    { name: "Michael Chen", email: "m.chen@example.com" },
    { name: "Emily Brown", email: "emily.b@example.com" },
    { name: "David Wilson", email: "d.wilson@example.com" }
  ]
}

// Initialize data if it doesn't exist
async function initializeData() {
  try {
    const existingData = await kv.get('qa-data')
    if (!existingData) {
      await kv.set('qa-data', initialData)
      console.log('Initialized data in KV storage')
    }
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// Initialize data on startup
initializeData()

// API endpoint to update data
app.post('/api/update-yaml', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !Array.isArray(req.body.questions)) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    // Get current data
    const currentData = await kv.get('qa-data') || initialData

    // Merge new questions with existing data
    const updatedData = {
      ...currentData,
      questions: req.body.questions
    }

    // Update data in KV storage
    await kv.set('qa-data', updatedData)
    console.log('Data updated successfully')
    
    res.json({ success: true })
  } catch (error) {
    console.error('Error updating data:', error)
    res.status(500).json({ error: 'Failed to update data', details: error.message })
  }
})

// API endpoint to get data
app.get('/api/questions', async (req, res) => {
  try {
    const data = await kv.get('qa-data') || initialData
    res.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    res.status(500).json({ error: 'Failed to read data' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 