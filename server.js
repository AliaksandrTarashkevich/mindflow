const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// OpenAI integration
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for personality analysis
app.post('/api/analyze-personality', async (req, res) => {
  try {
    const { systemMessage, developerMessage, userMessage, traitScores } = req.body;

    // Validate required fields
    if (!systemMessage || !developerMessage || !userMessage) {
      return res.status(400).json({ 
        error: 'Missing required fields: systemMessage, developerMessage, userMessage' 
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' 
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for cost efficiency
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `${developerMessage}\n\n${userMessage}` }
      ],
      temperature: 0.7,
      max_tokens: 900
    });

    const analysis = completion.choices[0].message.content;

    // Return the analysis
    res.json({
      success: true,
      analysis: analysis,
      traitScores: traitScores
    });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ 
        error: 'OpenAI API quota exceeded. Please check your billing.' 
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'Invalid OpenAI API key. Please check your configuration.' 
      });
    }

    // Generic error response
    res.status(500).json({ 
      error: 'Failed to analyze personality. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mindflow Personality Assessment Server running on port ${PORT}`);
  console.log(`📊 Visit http://localhost:${PORT} to access the assessment`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: OPENAI_API_KEY environment variable not set');
    console.warn('   Please create a .env file with your OpenAI API key:');
    console.warn('   OPENAI_API_KEY=your_api_key_here');
  } else {
    console.log('✅ OpenAI API key configured');
  }
});

module.exports = app;
