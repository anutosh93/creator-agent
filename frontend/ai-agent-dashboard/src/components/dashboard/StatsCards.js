import React from 'react';
import { 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Conversations',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Response Accuracy',
    value: '94%',
    change: '+3%',
    changeType: 'positive',
    icon: CheckCircleIcon,
  },
  {
    name: 'Avg Response Time',
    value: '2.3s',
    change: '+0.2s',
    changeType: 'negative',
    icon: ClockIcon,
  },
  {
    name: 'Active Users',
    value: '342',
    change: '+18%',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="card p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <stat.icon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;