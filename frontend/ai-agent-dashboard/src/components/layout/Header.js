import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const pageTitle = {
  'overview': 'Dashboard Overview',
  'agent-builder': 'Agent Builder',
  'conversations': 'Live Conversations',
  'analytics': 'Analytics & Insights',
  'knowledge': 'Knowledge Base'
};

function Header({ currentPage }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {pageTitle[currentPage] || 'AI Agents Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your AI agents and monitor conversations
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Fitness Creator</p>
            </div>
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;