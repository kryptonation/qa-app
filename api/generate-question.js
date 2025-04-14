import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates funny and interesting questions. Keep the questions light-hearted and engaging."
        },
        {
          role: "user",
          content: "Generate a funny question that would be interesting to ask someone."
        }
      ],
      model: "gpt-3.5-turbo",
    })

    res.status(200).json({
      question: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Error generating question:', error)
    res.status(500).json({ error: 'Failed to generate question' })
  }
} 