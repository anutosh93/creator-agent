import React, { useState } from 'react';
import { 
  MicrophoneIcon,
  DocumentIcon,
  CalendarIcon,
  CreditCardIcon,
  EnvelopeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const personalities = [
  { value: 'friendly', label: 'Friendly & Enthusiastic' },
  { value: 'professional', label: 'Professional & Informative' },
  { value: 'casual', label: 'Casual & Relatable' },
  { value: 'motivational', label: 'Motivational & Inspiring' },
];

const availableActions = [
  { id: 'booking', icon: CalendarIcon, label: 'Book Consultations' },
  { id: 'resources', icon: DocumentIcon, label: 'Send Resources' },
  { id: 'payments', icon: CreditCardIcon, label: 'Process Payments' },
  { id: 'email', icon: EnvelopeIcon, label: 'Send Email Updates' },
  { id: 'leads', icon: ChartBarIcon, label: 'Lead Qualification' },
  { id: 'feedback', icon: MicrophoneIcon, label: 'Collect Feedback' },
];

function AgentBuilder() {
  const [agentConfig, setAgentConfig] = useState({
    name: 'Fitness Coach Sarah',
    personality: 'friendly',
    bio: "I'm a certified fitness trainer and nutritionist with 8+ years of experience. My AI agent can help you with workout plans, meal prep guides, and booking personal training sessions!",
    platforms: ['instagram', 'whatsapp'],
    actions: ['booking', 'resources', 'email'],
    voiceSample: null,
  });

  const handleInputChange = (field, value) => {
    setAgentConfig(prev => ({...prev, [field]: value}));
  };

  const handlePlatformChange = (platform, checked) => {
    const platforms = checked 
      ? [...agentConfig.platforms, platform]
      : agentConfig.platforms.filter(p => p !== platform);
    setAgentConfig(prev => ({...prev, platforms}));
  };

  const handleActionChange = (actionId, checked) => {
    const actions = checked 
      ? [...agentConfig.actions, actionId]
      : agentConfig.actions.filter(a => a !== actionId);
    setAgentConfig(prev => ({...prev, actions}));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Create AI Agent</h2>
          <p className="text-gray-600 mt-2">Configure your AI assistant's personality and capabilities</p>
        </div>
        <button className="btn btn-primary">
          Save & Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={agentConfig.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input"
                  placeholder="e.g., Fitness Coach Sarah"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personality & Tone
                </label>
                <select
                  value={agentConfig.personality}
                  onChange={(e) => handleInputChange('personality', e.target.value)}
                  className="input"
                >
                  {personalities.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio & Description
                </label>
                <textarea
                  rows={4}
                  value={agentConfig.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="input resize-none"
                  placeholder="Tell users about yourself and what your agent can help with..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {agentConfig.bio.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Platform Deployment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={agentConfig.platforms.includes('instagram')}
                  onChange={(e) => handlePlatformChange('instagram', e.target.checked)}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div className="ml-3 flex items-center">
                  <span className="text-2xl mr-2">📱</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Instagram</span>
                    <p className="text-xs text-gray-500">Direct messages & comments</p>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={agentConfig.platforms.includes('whatsapp')}
                  onChange={(e) => handlePlatformChange('whatsapp', e.target.checked)}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div className="ml-3 flex items-center">
                  <span className="text-2xl mr-2">💬</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                    <p className="text-xs text-gray-500">Business messaging</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Available Actions */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableActions.map((action) => (
                <label key={action.id} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={agentConfig.actions.includes(action.id)}
                    onChange={(e) => handleActionChange(action.id, e.target.checked)}
                    className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <action.icon className="ml-3 h-6 w-6 text-gray-400" />
                  <span className="ml-3 text-sm font-medium text-gray-900">{action.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Voice Sample */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Voice Sample</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <MicrophoneIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-1">Click to record voice sample</p>
              <p className="text-xs text-gray-500">Optional: Helps create personalized voice responses</p>
            </div>
          </div>

          {/* Agent Preview */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Preview</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 text-sm font-medium">AI</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{agentConfig.name}</p>
                  <p className="text-xs text-gray-500">
                    {personalities.find(p => p.value === agentConfig.personality)?.label}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  Hi! I'm {agentConfig.name.split(' ')[0]}, your AI fitness assistant. How can I help you today? 💪
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {agentConfig.platforms.map(platform => (
                  <span key={platform} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                    {platform}
                  </span>
                ))}
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Enabled Actions:</p>
                <div className="space-y-1">
                  {agentConfig.actions.map(actionId => {
                    const action = availableActions.find(a => a.id === actionId);
                    return (
                      <div key={actionId} className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {action?.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Platforms</span>
                <span className="text-sm font-medium text-gray-900">
                  {agentConfig.platforms.length}/2
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Actions</span>
                <span className="text-sm font-medium text-gray-900">
                  {agentConfig.actions.length}/{availableActions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bio Length</span>
                <span className="text-sm font-medium text-gray-900">
                  {agentConfig.bio.length}/500
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentBuilder;