import express from 'express'
import cors from 'cors'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// Ensure data directory exists
const dataDir = path.join(__dirname, 'public', 'data')
try {
  await fs.mkdir(dataDir, { recursive: true })
  console.log('Data directory exists or was created at:', dataDir)
} catch (error) {
  console.error('Error creating data directory:', error)
}

// Initialize YAML file if it doesn't exist
const yamlPath = path.join(dataDir, 'questions.yaml')
console.log('YAML file path:', yamlPath)

try {
  await fs.access(yamlPath)
  console.log('YAML file exists')
  const content = await fs.readFile(yamlPath, 'utf8')
  console.log('Current YAML content:', content)
} catch {
  console.log('Creating new YAML file')
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
  await fs.writeFile(yamlPath, yaml.stringify(initialData), 'utf8')
}

// API endpoint to update YAML file
app.post('/api/update-yaml', async (req, res) => {
  try {
    console.log('Received update request with body:', JSON.stringify(req.body, null, 2))
    
    // Validate request body
    if (!req.body || !Array.isArray(req.body.questions)) {
      console.error('Invalid request body:', req.body)
      return res.status(400).json({ error: 'Invalid request body' })
    }

    // Read current file content
    const currentContent = await fs.readFile(yamlPath, 'utf8')
    const currentData = yaml.parse(currentContent)
    console.log('Current data before update:', currentData)

    // Merge new questions with existing data
    const updatedData = {
      ...currentData,
      questions: req.body.questions
    }
    console.log('Updated data:', updatedData)

    // Write updated content
    await fs.writeFile(yamlPath, yaml.stringify(updatedData), 'utf8')
    console.log('File updated successfully')
    
    res.json({ success: true })
  } catch (error) {
    console.error('Error updating YAML:', error)
    res.status(500).json({ error: 'Failed to update YAML file', details: error.message })
  }
})

// API endpoint to get YAML content
app.get('/api/questions', async (req, res) => {
  try {
    console.log('Reading YAML file from:', yamlPath)
    const content = await fs.readFile(yamlPath, 'utf8')
    console.log('YAML content:', content)
    const data = yaml.parse(content)
    console.log('Parsed data:', data)
    res.json(data)
  } catch (error) {
    console.error('Error reading YAML:', error)
    res.status(500).json({ error: 'Failed to read YAML file' })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Development server running on port ${PORT}`)
}) 