interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const TrendIndicator = ({ value, trend }: { value: string; trend: 'up' | 'down' | 'neutral' }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const getTextColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-stone-600';
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${getTextColor()}`}>
      {getTrendIcon()}
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

const KPICard = ({ title, value, change, trend, icon }: KPICardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-luxury-gold-50 rounded-lg">
          <span className="text-luxury-gold-600">{icon}</span>
        </div>
        <TrendIndicator value={change} trend={trend} />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-charcoal-900 mb-1">{value}</h3>
        <p className="text-sm text-stone-600">{title}</p>
      </div>
    </div>
  );
};

export default KPICard; 