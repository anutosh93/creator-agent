const axios = require('axios');

// Function to send WhatsApp message
async function sendWhatsAppMessage(to, message) {
    console.log(`📤 Sending WhatsApp message to ${to}: "${message}"`);
    
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
                type: "text",
                text: { body: message }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('✅ Message sent successfully!');
        return response.data;
        
    } catch (error) {
        console.error('❌ Error sending WhatsApp message:', error.response?.data || error.message);
        
        // Don't throw error - just log it so the webhook doesn't fail
        return null;
    }
}

module.exports = {
    sendWhatsAppMessage
};