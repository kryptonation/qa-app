import fs from 'fs/promises'
import path from 'path'
import yaml from 'yaml'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'questions.yaml')
    const updatedData = req.body
    const yamlStr = yaml.stringify(updatedData)
    
    await fs.writeFile(filePath, yamlStr, 'utf8')
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error updating YAML:', error)
    res.status(500).json({ error: 'Failed to update YAML file' })
  }
} 