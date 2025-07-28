const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// Initialize OpenAI
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.warn('OpenAI API key not configured. AI features will be disabled.');
  openai = null;
}

// Generate content using AI
router.post('/generate', async (req, res) => {
  try {
    const { prompt, contentType, tone, length, additionalContext } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!openai) {
      return res.status(503).json({ 
        error: 'OpenAI API is not configured. Please add your API key to the .env file.' 
      });
    }

    // Build the system message based on content type
    let systemMessage = 'You are a professional content creator. Create high-quality, engaging content.';
    
    if (contentType) {
      switch (contentType.toLowerCase()) {
        case 'blog':
          systemMessage += ' Write a blog post that is informative, engaging, and SEO-friendly.';
          break;
        case 'social':
          systemMessage += ' Write social media content that is catchy, shareable, and within platform limits.';
          break;
        case 'email':
          systemMessage += ' Write an email that is professional, clear, and compelling.';
          break;
        case 'ad':
          systemMessage += ' Write advertising copy that is persuasive and action-oriented.';
          break;
        default:
          systemMessage += ' Write content that matches the specified type.';
      }
    }

    if (tone) {
      systemMessage += ` Use a ${tone} tone.`;
    }

    if (length) {
      systemMessage += ` Keep the content approximately ${length} words.`;
    }

    if (additionalContext) {
      systemMessage += ` Additional context: ${additionalContext}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0].message.content;

    res.json({
      success: true,
      content: generatedContent,
      usage: completion.usage,
      model: completion.model
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content',
      message: error.message 
    });
  }
});

// Generate multiple content variations
router.post('/generate-variations', async (req, res) => {
  try {
    const { prompt, contentType, variations = 3 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!openai) {
      return res.status(503).json({ 
        error: 'OpenAI API is not configured. Please add your API key to the .env file.' 
      });
    }

    const variationsArray = [];
    
    for (let i = 0; i < variations; i++) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: `You are a professional content creator. Create ${contentType || 'content'} variation ${i + 1}. Make it unique and different from other variations.` 
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.8,
      });

      variationsArray.push({
        id: i + 1,
        content: completion.choices[0].message.content,
        usage: completion.usage
      });
    }

    res.json({
      success: true,
      variations: variationsArray
    });

  } catch (error) {
    console.error('AI Variations Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content variations',
      message: error.message 
    });
  }
});

// Analyze content and provide suggestions
router.post('/analyze', async (req, res) => {
  try {
    const { content, analysisType } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    if (!openai) {
      return res.status(503).json({ 
        error: 'OpenAI API is not configured. Please add your API key to the .env file.' 
      });
    }

    let analysisPrompt = 'Analyze the following content and provide feedback:';
    
    if (analysisType) {
      switch (analysisType.toLowerCase()) {
        case 'seo':
          analysisPrompt = 'Analyze the following content for SEO optimization and provide specific suggestions:';
          break;
        case 'readability':
          analysisPrompt = 'Analyze the following content for readability and provide improvement suggestions:';
          break;
        case 'engagement':
          analysisPrompt = 'Analyze the following content for engagement potential and provide suggestions:';
          break;
        case 'tone':
          analysisPrompt = 'Analyze the tone and style of the following content and provide feedback:';
          break;
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: analysisPrompt },
        { role: "user", content: content }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    res.json({
      success: true,
      analysis: completion.choices[0].message.content,
      type: analysisType || 'general'
    });

  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze content',
      message: error.message 
    });
  }
});

module.exports = router; 