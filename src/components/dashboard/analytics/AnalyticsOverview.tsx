"use client";

import { useState, useEffect } from 'react';
import KPICard from './KPICard';
import ChartCard from './ChartCard';
import RecentActivity from './RecentActivity';

interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const AnalyticsOverview = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock KPI data - would come from API in real implementation
  const kpiData: KPIData[] = [
    {
      title: 'Total Products',
      value: '847',
      change: '+12%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'Active Projects',
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'Website Leads',
      value: '156',
      change: '+28%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Conversion Rate',
      value: '18.3%',
      change: '-2.1%',
      trend: 'down',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900">Analytics Overview</h2>
          <p className="text-stone-600">Track your business performance and key metrics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="px-4 py-2 bg-luxury-gold-500 text-charcoal-900 rounded-lg hover:bg-luxury-gold-600 transition-colors font-medium">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Lead Sources" 
          subtitle="Where your customers are coming from"
          type="pie"
        />
        <ChartCard 
          title="Project Timeline" 
          subtitle="Active projects and milestones"
          type="line"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-charcoal-900">Recent Projects</h3>
              <p className="text-sm text-stone-600">Latest updates on active projects</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-charcoal-900">Modern Kitchen Remodel</div>
                      <div className="text-sm text-stone-500">Napa Valley Estate</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-900">Johnson Family</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1 bg-stone-200 rounded-full h-2">
                          <div className="bg-luxury-gold-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="ml-2 text-sm text-stone-600">75%</span>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-charcoal-900">Luxury Bathroom Suite</div>
                      <div className="text-sm text-stone-500">Hillside Residence</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-900">Williams Estate</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1 bg-stone-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="ml-2 text-sm text-stone-600">100%</span>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-charcoal-900">Full Home Renovation</div>
                      <div className="text-sm text-stone-500">Downtown Condo</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-900">Chen Residence</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Planning
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1 bg-stone-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="ml-2 text-sm text-stone-600">25%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-stone-200">
              <button className="text-sm text-luxury-gold-600 hover:text-luxury-gold-700 font-medium">
                View all projects →
              </button>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview; 