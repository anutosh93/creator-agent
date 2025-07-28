import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatsCards from './components/dashboard/StatsCards';
import RecentConversations from './components/dashboard/RecentConversations';
import AgentBuilder from './components/agents/AgentBuilder';
import ConversationView from './components/conversations/ConversationView';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import KnowledgeBase from './components/knowledge/KnowledgeBase';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsCards />
            <RecentConversations />
          </div>
        );
      case 'agent-builder':
        return <AgentBuilder />;
      case 'conversations':
        return <ConversationView />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'knowledge':
        return <KnowledgeBase />;
      default:
        return (
          <div className="space-y-6">
            <StatsCards />
            <RecentConversations />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;