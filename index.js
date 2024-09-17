import express from 'express';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

// Create Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

// Endpoint to handle chat completion requests
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Get chat completion from Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a Lawyer specializing in indian Law. answwer within 2-3 lines'
        },
        { role: 'user', content: question }
      ],
      model: 'llama3-8b-8192',
    });

    const answer = chatCompletion.choices[0]?.message?.content || 'No content available';

    // Return the answer text
    res.json({ text: answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
