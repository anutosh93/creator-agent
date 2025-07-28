import React from 'react';
import { 
  HomeIcon, 
  CogIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  BookOpenIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Overview', id: 'overview', icon: HomeIcon },
  { name: 'Agent Builder', id: 'agent-builder', icon: CogIcon },
  { name: 'Conversations', id: 'conversations', icon: ChatBubbleLeftRightIcon },
  { name: 'Analytics', id: 'analytics', icon: ChartBarIcon },
  { name: 'Knowledge Base', id: 'knowledge', icon: BookOpenIcon },
];

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎬</span>
          </div>
          <h1 className="ml-3 text-xl font-semibold text-gray-900">Curator - by Graphy </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPage(item.id)}
            className={`group flex items-center w-full px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200 rounded-r-md ${
              currentPage === item.id
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${
                currentPage === item.id
                  ? 'text-primary-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              }`}
            />
            {item.name}
          </button>
        ))}
      </nav>

      {/* Create Agent Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage('agent-builder')}
          className="btn btn-primary w-full"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Agent
        </button>
      </div>
    </div>
  );
}

export default Sidebar;