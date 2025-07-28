const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Function to process messages with AI
async function processWithAI(messageText, userPhone) {
    console.log(`🧠 Processing message: "${messageText}" from ${userPhone}`);
    
    try {
        // Create the AI prompt
        const systemPrompt = `You are Sarah, a friendly and knowledgeable fitness trainer and nutritionist. 

Your personality:
- Warm, encouraging, and motivational
- Professional but approachable
- Expert in fitness, nutrition, and wellness
- Always positive and supportive

Guidelines:
- Keep responses under 150 characters (WhatsApp friendly)
- Be helpful and encouraging
- If asked about booking, offer to help schedule
- If asked for resources, offer to send guides/tips
- Use emojis appropriately but not excessively

Respond naturally as Sarah would.`;

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: messageText }
            ],
            max_tokens: 100,
            temperature: 0.7
        });

        const aiResponse = completion.choices[0].message.content;
        console.log(`🤖 AI Response: "${aiResponse}"`);
        
        return aiResponse;
        
    } catch (error) {
        console.error('❌ OpenAI API Error:', error.message);
        
        // Return a fallback response if AI fails
        return "Thanks for your message! I'm having some technical difficulties right now, but I'll get back to you soon! 💪";
    }
}

// Function to classify user intent (optional - for more advanced responses)
async function classifyIntent(messageText) {
    const intents = {
        greeting: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
        booking: ['book', 'schedule', 'appointment', 'consultation', 'session'],
        resource: ['guide', 'pdf', 'plan', 'program', 'workout', 'meal prep'],
        question: ['how', 'what', 'when', 'where', 'why', 'can you', 'help']
    };
    
    const lowerMessage = messageText.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return intent;
        }
    }
    
    return 'general';
}

module.exports = {
    processWithAI,
    classifyIntent
};