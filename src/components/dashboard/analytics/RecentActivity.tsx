interface ActivityItem {
  id: string;
  type: 'product' | 'project' | 'lead' | 'user';
  action: string;
  description: string;
  user: string;
  timestamp: string;
  icon: React.ReactNode;
}

const RecentActivity = () => {
  // Mock activity data - would come from API in real implementation
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'product',
      action: 'Product Added',
      description: 'Wolf 36" Range added to Kitchen collection',
      user: 'Sarah Miller',
      timestamp: '2 minutes ago',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      id: '2',
      type: 'lead',
      action: 'New Lead',
      description: 'Kitchen remodel inquiry from Johnson family',
      user: 'System',
      timestamp: '15 minutes ago',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: '3',
      type: 'project',
      action: 'Project Updated',
      description: 'Williams Estate bathroom project marked complete',
      user: 'David Chen',
      timestamp: '1 hour ago',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: '4',
      type: 'product',
      action: 'Inventory Update',
      description: 'Carrara marble inventory updated',
      user: 'Emma Wilson',
      timestamp: '2 hours ago',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
    {
      id: '5',
      type: 'user',
      action: 'User Login',
      description: 'Team member logged in from mobile',
      user: 'Alex Rodriguez',
      timestamp: '3 hours ago',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      ),
    },
    {
      id: '6',
      type: 'lead',
      action: 'Lead Converted',
      description: 'Thompson consultation converted to project',
      user: 'Sarah Miller',
      timestamp: '4 hours ago',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-600';
      case 'project':
        return 'bg-green-100 text-green-600';
      case 'lead':
        return 'bg-luxury-gold-100 text-luxury-gold-600';
      case 'user':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-stone-100 text-stone-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-200">
        <h3 className="text-lg font-semibold text-charcoal-900">Recent Activity</h3>
        <p className="text-sm text-stone-600">Latest updates and system events</p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-stone-100">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  {activity.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-charcoal-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-stone-500">
                      {activity.timestamp}
                    </p>
                  </div>
                  
                  <p className="text-sm text-stone-600 mt-1">
                    {activity.description}
                  </p>
                  
                  <p className="text-xs text-stone-500 mt-1">
                    by {activity.user}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-stone-200 bg-stone-50">
        <button className="text-sm text-luxury-gold-600 hover:text-luxury-gold-700 font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity; 