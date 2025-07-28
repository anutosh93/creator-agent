import React, { useState, useRef, useEffect } from 'react';
import { 
  UserIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const conversations = [
  {
    id: 1,
    user: '@fitness_enthusiast',
    platform: 'Instagram',
    lastMessage: 'Can you send me that meal prep guide?',
    time: '2m ago',
    unread: true,
    avatar: 'FE'
  },
  {
    id: 2,
    user: 'John Miller',
    platform: 'WhatsApp',
    lastMessage: 'I want to book a consultation',
    time: '5m ago',
    unread: false,
    avatar: 'JM'
  },
  {
    id: 3,
    user: '@healthyliving22',
    platform: 'Instagram',
    lastMessage: 'Thank you for the tips!',
    time: '8m ago',
    unread: false,
    avatar: 'HL'
  },
  {
    id: 4,
    user: 'Maria Rodriguez',
    platform: 'WhatsApp',
    lastMessage: 'What time should I work out?',
    time: '15m ago',
    unread: true,
    avatar: 'MR'
  },
  {
    id: 5,
    user: '@gym_newbie',
    platform: 'Instagram',
    lastMessage: 'Started the beginner routine!',
    time: '1h ago',
    unread: false,
    avatar: 'GN'
  }
];

const messageHistory = {
  1: [
    {
      id: 1,
      sender: 'user',
      text: 'Hey! I saw your Instagram post about meal prep. Can you send me that guide you mentioned?',
      time: '2 minutes ago',
      timestamp: '2:45 PM'
    },
    {
      id: 2,
      sender: 'agent',
      text: "Hi there! 😊 Absolutely! I'd love to share my comprehensive meal prep guide with you. It includes 20 healthy recipes, shopping lists, and prep schedules for the week.\n\nI'm sending you the PDF right now! 📄",
      time: '2 minutes ago',
      timestamp: '2:45 PM',
      confidence: 'high',
      actions: ['Sent meal prep guide PDF']
    },
    {
      id: 3,
      sender: 'user',
      text: 'This is amazing! Thank you so much! 🙏',
      time: '1 minute ago',
      timestamp: '2:46 PM'
    }
  ],
  2: [
    {
      id: 1,
      sender: 'user',
      text: 'Hi Sarah, I want to book a consultation with you. What times are available this week?',
      time: '5 minutes ago',
      timestamp: '2:42 PM'
    },
    {
      id: 2,
      sender: 'agent',
      text: "Hello John! I'd be happy to help you book a consultation. 💪\n\nI have availability:\n• Tuesday 2:00 PM\n• Thursday 10:00 AM\n• Friday 3:00 PM\n\nWhich time works best for you?",
      time: '5 minutes ago',
      timestamp: '2:42 PM',
      confidence: 'high',
      actions: ['Checked calendar availability']
    }
  ]
};

function ConversationView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(messageHistory[selectedConversation.id] || []);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(messageHistory[selectedConversation.id] || []);
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'agent',
        text: newMessage,
        time: 'just now',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        confidence: 'manual'
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const giveFeedback = (messageId, feedback) => {
    console.log(`Feedback for message ${messageId}: ${feedback}`);
    // In a real app, this would send feedback to the backend
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Live Conversations</h3>
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <select className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>All Platforms</option>
              <option>Instagram Only</option>
              <option>WhatsApp Only</option>
            </select>
            <button className="px-3 py-2 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
              Export
            </button>
          </div>
        </div>
        
        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {conversation.avatar}
                  </div>
                  {conversation.unread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.user}
                    </p>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {conversation.lastMessage}
                  </p>
                  
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    conversation.platform === 'Instagram' 
                      ? 'bg-pink-100 text-pink-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {conversation.platform}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {selectedConversation.avatar}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{selectedConversation.user}</h4>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedConversation.platform === 'Instagram' 
                    ? 'bg-pink-100 text-pink-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {selectedConversation.platform}
                </span>
                <span className="text-xs text-gray-500">
                  Active now
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsAutoMode(!isAutoMode)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isAutoMode 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              {isAutoMode ? '🤖 Auto Mode' : '✋ Manual Mode'}
            </button>
            
            <button className="px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors">
              Take Over
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-white border border-gray-200 text-gray-900' 
                    : 'bg-primary-600 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {message.actions && (
                    <div className="mt-2 pt-2 border-t border-primary-500">
                      {message.actions.map((action, idx) => (
                        <div key={idx} className="flex items-center text-xs text-primary-100">
                          <div className="w-1 h-1 bg-primary-300 rounded-full mr-2"></div>
                          {action}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center mt-1 space-x-2 ${
                  message.sender === 'user' ? 'justify-start' : 'justify-end'
                }`}>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                  
                  {message.confidence && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      message.confidence === 'high' ? 'bg-green-100 text-green-700' :
                      message.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {message.confidence === 'manual' ? 'Manual' : `${message.confidence} confidence`}
                    </span>
                  )}
                </div>
                
                {message.sender === 'agent' && message.confidence !== 'manual' && (
                  <div className="flex items-center mt-2 space-x-2">
                    <button 
                      onClick={() => giveFeedback(message.id, 'positive')}
                      className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs hover:bg-green-200 transition-colors"
                    >
                      <HandThumbUpIcon className="w-3 h-3 mr-1" />
                      Good
                    </button>
                    <button 
                      onClick={() => giveFeedback(message.id, 'negative')}
                      className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200 transition-colors"
                    >
                      <HandThumbDownIcon className="w-3 h-3 mr-1" />
                      Improve
                    </button>
                  </div>
                )}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 order-1 mr-3 mt-1">
                  {selectedConversation.avatar}
                </div>
              )}
              
              {message.sender === 'agent' && (
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-medium text-white order-2 ml-3 mt-1">
                  AI
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {!isAutoMode && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your response..."
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  📎 Attach File
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  😊 Emoji
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        )}

        {/* Auto Mode Info */}
        {isAutoMode && (
          <div className="p-4 border-t border-gray-200 bg-green-50">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-green-700 font-medium">
                AI Agent is handling conversations automatically
              </p>
            </div>
            <p className="text-xs text-green-600 text-center mt-1">
              Switch to Manual Mode to take over and respond directly
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConversationView;