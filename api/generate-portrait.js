const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;

    // Validate required fields
    if (!description) {
      return res.status(400).json({ 
        error: 'Missing required field: description' 
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' 
      });
    }

    // Enhance the description for better portrait generation
    const enhancedDescription = `A professional portrait of a person that represents this personality: ${description}. 
    The image should be artistic, warm, and professional. 
    Style: soft lighting, warm colors, professional photography style, 
    high quality, detailed, realistic, portrait orientation, 
    person looking at camera with a gentle smile, 
    background should complement the personality description.`;

    // Generate image using DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedDescription,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    const imageUrl = response.data[0].url;

    // Return the image URL
    res.json({
      success: true,
      imageUrl: imageUrl,
      description: description
    });

  } catch (error) {
    console.error('Error generating portrait:', error);
    
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

    if (error.code === 'content_policy_violation') {
      return res.status(400).json({ 
        error: 'Portrait description violates content policy. Please try a different description.' 
      });
    }

    // Generic error response
    res.status(500).json({ 
      error: 'Failed to generate portrait. Please try again later.' 
    });
  }
};
