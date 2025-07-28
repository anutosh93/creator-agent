import React from 'react';

const conversations = [
  {
    id: 1,
    user: '@fitness_enthusiast',
    platform: 'Instagram',
    message: 'Asked about meal prep guide - Agent provided PDF link',
    time: '2 minutes ago',
    status: 'resolved',
  },
  {
    id: 2,
    user: 'John Miller',
    platform: 'WhatsApp',
    message: 'Booked 1-on-1 consultation for next Tuesday',
    time: '5 minutes ago',
    status: 'action_taken',
  },
  {
    id: 3,
    user: '@healthyliving22',
    platform: 'Instagram',
    message: 'Thanked agent for workout recommendations',
    time: '8 minutes ago',
    status: 'resolved',
  },
];

const platformBadges = {
  Instagram: 'bg-pink-100 text-pink-800',
  WhatsApp: 'bg-green-100 text-green-800',
};

const statusBadges = {
  resolved: 'bg-green-100 text-green-800',
  action_taken: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

function RecentConversations() {
  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Conversations</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {conversation.user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">
                      {conversation.user}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      platformBadges[conversation.platform]
                    }`}>
                      {conversation.platform}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {conversation.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusBadges[conversation.status]
                }`}>
                  {conversation.status.replace('_', ' ')}
                </span>
                <p className="text-xs text-gray-500">{conversation.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all conversations →
        </button>
      </div>
    </div>
  );
}

export default RecentConversations;