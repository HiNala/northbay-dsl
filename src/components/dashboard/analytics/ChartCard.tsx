interface ChartCardProps {
  title: string;
  subtitle?: string;
  type: 'pie' | 'line' | 'bar';
}

const ChartCard = ({ title, subtitle, type }: ChartCardProps) => {
  // Mock chart placeholder - would integrate with a charting library like Chart.js or Recharts
  const getChartPlaceholder = () => {
    switch (type) {
      case 'pie':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="20"
                  strokeDasharray="188.5 62.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#2C3E50"
                  strokeWidth="20"
                  strokeDasharray="125.7 125.7"
                  strokeDashoffset="-188.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-charcoal-900">75%</div>
                  <div className="text-sm text-stone-600">Website</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'line':
        return (
          <div className="h-64 flex items-end justify-between px-4 pb-4">
            {[40, 65, 45, 70, 55, 80, 75, 90, 85, 95, 88, 92].map((height, index) => (
              <div key={index} className="flex-1 mx-1">
                <div 
                  className="bg-luxury-gold-400 rounded-t-sm" 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="h-64 flex items-end justify-between px-4 pb-4">
            {[60, 80, 40, 90, 70, 85, 65].map((height, index) => (
              <div key={index} className="flex-1 mx-1">
                <div 
                  className="bg-charcoal-600 rounded-t-lg" 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        );
    }
  };

  const getLegend = () => {
    if (type === 'pie') {
      return (
        <div className="mt-4 flex justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-luxury-gold-500 rounded-full"></div>
            <span className="text-sm text-stone-600">Website (45%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-charcoal-600 rounded-full"></div>
            <span className="text-sm text-stone-600">Referrals (30%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-stone-400 rounded-full"></div>
            <span className="text-sm text-stone-600">Other (25%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-200">
        <h3 className="text-lg font-semibold text-charcoal-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-stone-600">{subtitle}</p>
        )}
      </div>
      
      <div className="p-6">
        {getChartPlaceholder()}
        {getLegend()}
      </div>
      
      <div className="px-6 py-4 border-t border-stone-200 bg-stone-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-stone-600">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <button className="text-sm text-luxury-gold-600 hover:text-luxury-gold-700 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartCard; 