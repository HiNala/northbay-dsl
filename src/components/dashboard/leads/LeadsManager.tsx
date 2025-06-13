"use client";

import { useState, useMemo } from 'react';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: 'kitchen' | 'bathroom' | 'full-home' | 'commercial';
  budgetRange: string;
  timeline: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  source: 'website' | 'referral' | 'social' | 'google' | 'other';
  message: string;
  assignedTo?: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  lastContact?: string;
  nextFollowUp?: string;
}

const LeadsManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Mock leads data - would come from API in real implementation
  const leads: Lead[] = useMemo(() => [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      projectType: 'kitchen',
      budgetRange: '$75,000 - $100,000',
      timeline: '3-6 months',
      status: 'qualified',
      priority: 'high',
      source: 'website',
      message: 'Looking for a complete kitchen renovation in our Napa Valley home. Interested in luxury finishes and premium appliances.',
      assignedTo: 'Sarah Miller',
      score: 85,
      createdAt: '2024-03-15',
      updatedAt: '2024-03-18',
      lastContact: '2024-03-18',
      nextFollowUp: '2024-03-22',
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@example.com',
      phone: '(555) 987-6543',
      projectType: 'bathroom',
      budgetRange: '$40,000 - $60,000',
      timeline: '1-3 months',
      status: 'proposal',
      priority: 'high',
      source: 'referral',
      message: 'Master bathroom remodel. Looking for spa-like experience with luxury materials.',
      assignedTo: 'David Chen',
      score: 92,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-20',
      lastContact: '2024-03-20',
      nextFollowUp: '2024-03-25',
    },
    {
      id: '3',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.r@example.com',
      phone: '(555) 456-7890',
      projectType: 'full-home',
      budgetRange: '$150,000+',
      timeline: '6+ months',
      status: 'new',
      priority: 'medium',
      source: 'google',
      message: 'Complete home renovation for downtown condo. Need design consultation.',
      score: 70,
      createdAt: '2024-03-20',
      updatedAt: '2024-03-20',
    },
    {
      id: '4',
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'rwilson@techcorp.com',
      phone: '(555) 321-0987',
      projectType: 'commercial',
      budgetRange: '$100,000 - $150,000',
      timeline: '3-6 months',
      status: 'contacted',
      priority: 'medium',
      source: 'referral',
      message: 'Corporate kitchen for our new office space. Looking for modern, functional design.',
      assignedTo: 'Emma Wilson',
      score: 78,
      createdAt: '2024-03-12',
      updatedAt: '2024-03-19',
      lastContact: '2024-03-19',
      nextFollowUp: '2024-03-26',
    },
    {
      id: '5',
      firstName: 'Lisa',
      lastName: 'Thompson',
      email: 'lisa.thompson@example.com',
      phone: '(555) 654-3210',
      projectType: 'kitchen',
      budgetRange: '$50,000 - $75,000',
      timeline: '1-3 months',
      status: 'won',
      priority: 'high',
      source: 'social',
      message: 'Kitchen update with new countertops and backsplash. Ready to move forward.',
      assignedTo: 'Sarah Miller',
      score: 95,
      createdAt: '2024-02-28',
      updatedAt: '2024-03-15',
      lastContact: '2024-03-15',
    },
  ], []);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.projectType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || lead.priority === selectedPriority;
      const matchesSource = selectedSource === 'all' || lead.source === selectedSource;

      return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    });
  }, [leads, searchQuery, selectedStatus, selectedPriority, selectedSource]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const proposals = leads.filter(l => l.status === 'proposal').length;
    const won = leads.filter(l => l.status === 'won').length;
    const conversionRate = total > 0 ? Math.round((won / total) * 100) : 0;

    return { total, newLeads, qualified, proposals, won, conversionRate };
  }, [leads]);

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setShowLeadModal(true);
  };

  const handleDeleteLead = (leadId: string) => {
    console.log('Delete lead:', leadId);
  };

  const handleSaveLead = (leadData: Partial<Lead>) => {
    console.log('Save lead:', leadData);
    setShowLeadModal(false);
    setEditingLead(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'proposal':
        return 'bg-orange-100 text-orange-800';
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <div className="text-sm text-stone-600">Total Leads</div>
          <div className="text-2xl font-bold text-charcoal-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <div className="text-sm text-stone-600">New</div>
          <div className="text-2xl font-bold text-blue-600">{stats.newLeads}</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <div className="text-sm text-stone-600">Qualified</div>
          <div className="text-2xl font-bold text-purple-600">{stats.qualified}</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <div className="text-sm text-stone-600">Proposals</div>
          <div className="text-2xl font-bold text-orange-600">{stats.proposals}</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <div className="text-sm text-stone-600">Won</div>
          <div className="text-2xl font-bold text-green-600">{stats.won}</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <div className="text-sm text-stone-600">Conversion</div>
          <div className="text-2xl font-bold text-luxury-gold-600">{stats.conversionRate}%</div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-charcoal-900">Leads</h2>
          <div className="bg-stone-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-stone-700">
              {filteredLeads.length} leads
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditingLead(null);
              setShowLeadModal(true);
            }}
            className="px-4 py-2 bg-luxury-gold-500 text-charcoal-900 rounded-lg hover:bg-luxury-gold-600 transition-colors font-medium"
          >
            Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <input
              type="search"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Sources</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social">Social Media</option>
            <option value="google">Google</option>
            <option value="other">Other</option>
          </select>
          <button className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Assigned
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900">
                        {lead.firstName} {lead.lastName}
                      </div>
                      <div className="text-sm text-stone-500">{lead.source}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-charcoal-900">{lead.email}</div>
                    <div className="text-sm text-stone-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-charcoal-900">{lead.projectType.replace('-', ' ')}</div>
                    <div className="text-sm text-stone-500">{lead.budgetRange}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal-900">
                    {lead.assignedTo || '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="text-luxury-gold-600 hover:text-luxury-gold-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-charcoal-900">
                {editingLead ? 'Edit Lead' : 'Add Lead'}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-stone-600">Lead form will be implemented here...</p>
              {editingLead && (
                <div className="mt-4">
                  <p><strong>Name:</strong> {editingLead.firstName} {editingLead.lastName}</p>
                  <p><strong>Email:</strong> {editingLead.email}</p>
                  <p><strong>Project:</strong> {editingLead.projectType}</p>
                  <p><strong>Budget:</strong> {editingLead.budgetRange}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-stone-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowLeadModal(false);
                  setEditingLead(null);
                }}
                className="px-4 py-2 border border-stone-300 rounded-lg text-charcoal-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveLead({})}
                className="px-4 py-2 bg-luxury-gold-500 text-charcoal-900 rounded-lg hover:bg-luxury-gold-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManager; 