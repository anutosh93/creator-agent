import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const conversationData = [
  { name: 'Mon', conversations: 120, responses: 118, accuracy: 98 },
  { name: 'Tue', conversations: 150, responses: 145, accuracy: 97 },
  { name: 'Wed', conversations: 180, responses: 175, accuracy: 97 },
  { name: 'Thu', conversations: 165, responses: 160, accuracy: 97 },
  { name: 'Fri', conversations: 200, responses: 195, accuracy: 98 },
  { name: 'Sat', conversations: 140, responses: 135, accuracy: 96 },
  { name: 'Sun', conversations: 110, responses: 108, accuracy: 98 },
];

const platformData = [
  { name: 'WhatsApp', value: 65, conversations: 812, color: '#25D366' },
  { name: 'Instagram', value: 35, conversations: 435, color: '#E4405F' },
];

const responseTimeData = [
  { time: '0-2s', count: 45, percentage: 68 },
  { time: '2-5s', count: 18, percentage: 27 },
  { time: '5-10s', count: 3, percentage: 5 },
  { time: '10s+', count: 0, percentage: 0 },
];

const topContent = [
  { 
    title: '10 Minute Morning Workout', 
    references: 47, 
    type: 'video',
    engagement: 95,
    icon: '🎥'
  },
  { 
    title: 'Meal Prep Guide PDF', 
    downloads: 23, 
    type: 'document',
    engagement: 89,
    icon: '📄'
  },
  { 
    title: 'Consultation Booking', 
    bookings: 12, 
    type: 'action',
    engagement: 92,
    icon: '📅'
  },
  { 
    title: 'Protein Smoothie Recipe', 
    references: 18, 
    type: 'content',
    engagement: 87,
    icon: '🥤'
  },
];

const userFeedback = [
  { 
    id: 1, 
    text: 'Super helpful and quick!', 
    sentiment: 'positive', 
    platform: 'Instagram', 
    time: '2 hours ago',
    score: 5
  },
  { 
    id: 2, 
    text: 'Felt like talking to Sarah herself', 
    sentiment: 'positive', 
    platform: 'WhatsApp', 
    time: '5 hours ago',
    score: 5
  },
  { 
    id: 3, 
    text: "Couldn't understand my diet question", 
    sentiment: 'negative', 
    platform: 'Instagram', 
    time: '1 day ago',
    score: 2
  },
  { 
    id: 4, 
    text: 'Quick response but needs more detail', 
    sentiment: 'neutral', 
    platform: 'WhatsApp', 
    time: '1 day ago',
    score: 3
  },
];

function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('performance');
  const [dateRange, setDateRange] = useState('7days');

  const tabs = [
    { id: 'performance', name: 'Performance' },
    { id: 'engagement', name: 'User Engagement' },
    { id: 'revenue', name: 'Revenue Impact' },
    { id: 'platforms', name: 'Platform Breakdown' },
  ];

  const kpis = [
    { label: 'Avg Response Time', value: '2.3s', change: '-0.2s', positive: true },
    { label: 'User Satisfaction', value: '4.6/5', change: '+0.2', positive: true },
    { label: 'Resolution Rate', value: '94%', change: '+3%', positive: true },
    { label: 'Handoff Rate', value: '6%', change: '-1%', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Date Range */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
          <p className="text-gray-600 mt-1">Monitor your AI agent's performance and user engagement</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
          
          <button className="btn btn-primary">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                kpi.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversation Volume Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conversation Volume</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                  <span>Conversations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Responses</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time Distribution */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="time" type="category" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#3b82f6" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'platforms' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Distribution */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">{platform.name}</p>
                      <p className="text-sm text-gray-500">{platform.conversations} conversations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{platform.value}%</p>
                    <p className="text-sm text-gray-500">of total volume</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Performance & User Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Content */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h3>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{content.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{content.title}</p>
                    <p className="text-sm text-gray-500">
                      {content.references && `${content.references} references`}
                      {content.downloads && `${content.downloads} downloads`}
                      {content.bookings && `${content.bookings} bookings`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${content.engagement}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{content.engagement}%</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    content.type === 'action' ? 'bg-blue-100 text-blue-800' :
                    content.type === 'document' ? 'bg-green-100 text-green-800' :
                    content.type === 'video' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {content.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Feedback */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Feedback</h3>
          <div className="space-y-4">
            {userFeedback.map((feedback) => (
              <div key={feedback.id} className={`p-4 rounded-lg border-l-4 ${
                feedback.sentiment === 'positive' ? 'bg-green-50 border-green-400' : 
                feedback.sentiment === 'negative' ? 'bg-red-50 border-red-400' :
                'bg-yellow-50 border-yellow-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">
                        {feedback.sentiment === 'positive' ? '😊' : 
                         feedback.sentiment === 'negative' ? '😞' : '😐'}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`text-sm ${
                            star <= feedback.score ? 'text-yellow-400' : 'text-gray-300'
                          }`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className={`font-medium mb-1 ${
                      feedback.sentiment === 'positive' ? 'text-green-800' : 
                      feedback.sentiment === 'negative' ? 'text-red-800' :
                      'text-yellow-800'
                    }`}>
                      "{feedback.text}"
                    </p>
                    <p className={`text-sm ${
                      feedback.sentiment === 'positive' ? 'text-green-600' : 
                      feedback.sentiment === 'negative' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {feedback.platform} • {feedback.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;