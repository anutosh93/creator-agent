import React, { useState } from 'react';
import { 
  DocumentTextIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  LinkIcon,
  PhotoIcon,
  PlayIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const knowledgeCategories = [
  {
    id: 'blog',
    title: 'Blog Posts',
    icon: DocumentTextIcon,
    count: 24,
    color: 'blue',
    description: 'Fitness tips, workout guides, and nutrition advice from your blog',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'videos',
    title: 'Video Content',
    icon: VideoCameraIcon,
    count: 12,
    color: 'green',
    description: 'YouTube workouts and Instagram Reels transcribed for better responses',
    lastUpdated: '1 day ago'
  },
  {
    id: 'faqs',
    title: 'FAQs',
    icon: QuestionMarkCircleIcon,
    count: 18,
    color: 'yellow',
    description: 'Common questions and your preferred answers',
    lastUpdated: '3 days ago'
  },
  {
    id: 'conversations',
    title: 'Conversations',
    icon: ChatBubbleLeftRightIcon,
    count: 'Auto',
    color: 'purple',
    description: 'Agent learns from successful conversations automatically',
    lastUpdated: 'Real-time'
  }
];

const quickActions = [
  { 
    icon: DocumentTextIcon, 
    label: 'Upload PDF', 
    action: 'upload',
    description: 'Upload PDFs, docs, or text files'
  },
  { 
    icon: LinkIcon, 
    label: 'Import from Website', 
    action: 'website',
    description: 'Import content from any website URL'
  },
  { 
    icon: PhotoIcon, 
    label: 'Sync Instagram Posts', 
    action: 'instagram',
    description: 'Automatically sync your Instagram content'
  },
  { 
    icon: PlayIcon, 
    label: 'Import YouTube Videos', 
    action: 'youtube',
    description: 'Transcribe and import YouTube videos'
  },
];

const recentContent = [
  {
    id: 1,
    title: 'New blog post: "5 Morning Exercises for Better Energy"',
    type: 'blog',
    icon: DocumentTextIcon,
    status: 'processed',
    time: '2 hours ago',
    details: 'Processed and indexed • 1,247 words extracted',
    engagement: 'High',
    color: 'blue'
  },
  {
    id: 2,
    title: 'YouTube video: "HIIT Workout for Beginners" transcribed',
    type: 'video',
    icon: VideoCameraIcon,
    status: 'processed',
    time: '1 day ago',
    details: '847 words extracted • 15 minute video',
    engagement: 'Medium',
    color: 'green'
  },
  {
    id: 3,
    title: 'FAQ: "What supplements do you recommend?"',
    type: 'faq',
    icon: QuestionMarkCircleIcon,
    status: 'pending',
    time: '2 days ago',
    details: 'Awaiting your review and approval',
    engagement: 'High',
    color: 'yellow'
  },
  {
    id: 4,
    title: 'Learned from 15 successful meal prep conversations',
    type: 'conversation',
    icon: ChatBubbleLeftRightIcon,
    status: 'processed',
    time: '2 days ago',
    details: 'Improved nutrition guidance responses',
    engagement: 'High',
    color: 'purple'
  },
  {
    id: 5,
    title: 'Instagram post: "Protein powder comparison"',
    type: 'social',
    icon: PhotoIcon,
    status: 'processing',
    time: '3 days ago',
    details: 'Extracting text and analyzing engagement',
    engagement: 'Medium',
    color: 'pink'
  }
];

const knowledgeStats = [
  { label: 'Total Documents', value: '156', trend: '+12 this week' },
  { label: 'Words Processed', value: '89.2K', trend: '+5.3K this week' },
  { label: 'Auto-learned Topics', value: '23', trend: '+3 this week' },
  { label: 'Accuracy Score', value: '94%', trend: '+2% this month' }
];

function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action) => {
    setUploadType(action);
    setShowUploadModal(true);
  };

  const filteredContent = recentContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Knowledge Base Management</h2>
          <p className="text-gray-600 mt-2">Manage your AI agent's knowledge sources and training content</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn btn-primary"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Content
        </button>
      </div>

      {/* Knowledge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {knowledgeStats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Knowledge Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {knowledgeCategories.map((category) => (
          <div key={category.id} className="card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${category.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className={`w-6 h-6 text-${category.color}-600`} />
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${category.color}-100 text-${category.color}-800`}>
                {category.count} {typeof category.count === 'number' ? 'items' : ''}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Updated {category.lastUpdated}</p>
              <button className="btn btn-secondary text-sm px-3 py-1">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Add Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
            >
              <action.icon className="w-10 h-10 text-gray-400 group-hover:text-primary-600 mb-3 transition-colors" />
              <span className="text-sm font-medium text-gray-900 group-hover:text-primary-700 mb-1 transition-colors">
                {action.label}
              </span>
              <span className="text-xs text-gray-500 text-center group-hover:text-primary-600 transition-colors">
                {action.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Management */}
      <div className="card">
        {/* Search and Filter Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Recent Content Updates</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="blog">Blog Posts</option>
                <option value="video">Videos</option>
                <option value="faq">FAQs</option>
                <option value="conversation">Conversations</option>
                <option value="social">Social Media</option>
              </select>
              
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FunnelIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="divide-y divide-gray-200">
          {filteredContent.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg bg-${item.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(item.status)}
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{item.details}</p>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-500">{item.time}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(item.engagement)}`}>
                        {item.engagement} Impact
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize bg-${item.color}-100 text-${item.color}-800`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2">
            Load more content →
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Content</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    {uploadType === 'upload' && 'Drag and drop files here, or click to browse'}
                    {uploadType === 'website' && 'Enter website URL to import content'}
                    {uploadType === 'instagram' && 'Connect your Instagram account'}
                    {uploadType === 'youtube' && 'Enter YouTube video URL'}
                    {!uploadType && 'Choose an upload method above'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, TXT files up to 10MB
                  </p>
                </div>
                
                {uploadType === 'website' && (
                  <input
                    type="url"
                    placeholder="https://example.com/article"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                )}
                
                {uploadType === 'youtube' && (
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                )}
                
                <div className="flex items-center space-x-3 pt-4">
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 btn btn-primary">
                    {uploadType === 'upload' && 'Upload Files'}
                    {uploadType === 'website' && 'Import Content'}
                    {uploadType === 'instagram' && 'Connect Account'}
                    {uploadType === 'youtube' && 'Import Video'}
                    {!uploadType && 'Add Content'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KnowledgeBase;