const express = require('express');
const router = express.Router();
const { processWithAI } = require('../services/aiProcessor');
const { sendWhatsAppMessage } = require('../services/whatsappSender');

// WhatsApp webhook verification
router.get('/whatsapp', (req, res) => {
    console.log('📞 Webhook verification request received');
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        console.log('✅ Webhook verified successfully!');
        res.status(200).send(challenge);
    } else {
        console.log('❌ Webhook verification failed');
        res.status(403).send('Verification failed');
    }
});

// WhatsApp message receiver with AI processing
router.post('/whatsapp', async (req, res) => {
    console.log('📨 Received WhatsApp webhook');
    
    try {
        const body = req.body;
        
        if (body.object === 'whatsapp_business_account') {
            for (const entry of body.entry || []) {
                for (const change of entry.changes || []) {
                    if (change.field === 'messages') {
                        const message = change.value?.messages?.[0];
                        
                        if (message && message.type === 'text') {
                            const userPhone = message.from;
                            const messageText = message.text.body;
                            
                            console.log(`👤 Message from: ${userPhone}`);
                            console.log(`💬 Message: "${messageText}"`);
                            
                            // Process with AI
                            const aiResponse = await processWithAI(messageText, userPhone);
                            
                            // Send response back to WhatsApp
                            await sendWhatsAppMessage(userPhone, aiResponse);
                            
                            console.log('✅ Message processed and response sent!');
                        }
                    }
                }
            }
        }
        
        res.status(200).send('OK');
        
    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(500).send('Error processing webhook');
    }
});

// Test endpoint
router.post('/test', async (req, res) => {
    console.log('🧪 Test endpoint called');
    
    // Simulate processing a test message
    if (req.body.message) {
        const testResponse = await processWithAI(req.body.message, 'test-user');
        res.json({
            original_message: req.body.message,
            ai_response: testResponse,
            timestamp: new Date().toISOString()
        });
    } else {
        res.json({
            message: 'Test endpoint working!',
            usage: 'Send POST request with {"message": "your test message"}',
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router;