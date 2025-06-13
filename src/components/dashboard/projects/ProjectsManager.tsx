"use client";

import { useState, useMemo } from 'react';

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  category: 'kitchen' | 'bathroom' | 'full-home' | 'commercial';
  status: 'planning' | 'in-progress' | 'completed' | 'published';
  budget: string;
  timeline: string;
  progress: number;
  description: string;
  images: string[];
  featured: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const ProjectsManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Mock projects data - would come from API in real implementation
  const projects: Project[] = useMemo(() => [
    {
      id: '1',
      title: 'Modern Kitchen Remodel',
      client: 'Johnson Family',
      location: 'Napa Valley Estate',
      category: 'kitchen',
      status: 'in-progress',
      budget: '$85,000',
      timeline: '12 weeks',
      progress: 75,
      description: 'Complete kitchen renovation with custom cabinetry, quartz countertops, and premium appliances.',
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556909048-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-10',
    },
    {
      id: '2',
      title: 'Luxury Bathroom Suite',
      client: 'Williams Estate',
      location: 'Hillside Residence',
      category: 'bathroom',
      status: 'completed',
      budget: '$45,000',
      timeline: '8 weeks',
      progress: 100,
      description: 'Spa-inspired bathroom with marble finishes, custom vanity, and luxury fixtures.',
      images: [
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      completedAt: '2024-02-28',
      createdAt: '2024-01-05',
      updatedAt: '2024-02-28',
    },
    {
      id: '3',
      title: 'Full Home Renovation',
      client: 'Chen Residence',
      location: 'Downtown Condo',
      category: 'full-home',
      status: 'planning',
      budget: '$150,000',
      timeline: '16 weeks',
      progress: 25,
      description: 'Complete home renovation including kitchen, bathrooms, and living spaces.',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-15',
    },
    {
      id: '4',
      title: 'Executive Office Kitchen',
      client: 'Tech Startup HQ',
      location: 'SOMA District',
      category: 'commercial',
      status: 'completed',
      budget: '$120,000',
      timeline: '10 weeks',
      progress: 100,
      description: 'Corporate kitchen and break room design with modern finishes and commercial appliances.',
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      completedAt: '2024-01-20',
      createdAt: '2023-11-01',
      updatedAt: '2024-01-20',
    },
  ], []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleDeleteProject = (projectId: string) => {
    console.log('Delete project:', projectId);
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    console.log('Save project:', projectData);
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'published':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kitchen':
        return 'bg-orange-100 text-orange-800';
      case 'bathroom':
        return 'bg-cyan-100 text-cyan-800';
      case 'full-home':
        return 'bg-luxury-gold-100 text-luxury-gold-800';
      case 'commercial':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-charcoal-900">Projects</h2>
          <div className="bg-stone-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-stone-700">
              {filteredProjects.length} projects
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-stone-100 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-charcoal-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-r-lg text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-charcoal-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Table
            </button>
          </div>
          
          <button
            onClick={() => {
              setEditingProject(null);
              setShowProjectModal(true);
            }}
            className="px-4 py-2 bg-luxury-gold-500 text-charcoal-900 rounded-lg hover:bg-luxury-gold-600 transition-colors font-medium"
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="kitchen">Kitchen</option>
            <option value="bathroom">Bathroom</option>
            <option value="full-home">Full Home</option>
            <option value="commercial">Commercial</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Projects Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-luxury-gold-500 text-charcoal-900 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-stone-600">{project.client}</p>
                    <p className="text-sm text-stone-500">{project.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(project.category)}`}>
                    {project.category.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                
                {project.status === 'in-progress' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-stone-600">Progress</span>
                      <span className="text-charcoal-900 font-medium">{project.progress}%</span>
                    </div>
                    <div className="bg-stone-200 rounded-full h-2">
                      <div 
                        className="bg-luxury-gold-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-stone-600">Budget: </span>
                    <span className="text-charcoal-900 font-medium">{project.budget}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="text-luxury-gold-600 hover:text-luxury-gold-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img className="h-10 w-10 rounded-lg object-cover" src={project.images[0]} alt={project.title} />
                        <div>
                          <div className="text-sm font-medium text-charcoal-900">{project.title}</div>
                          <div className="text-sm text-stone-500">{project.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-900">{project.client}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(project.category)}`}>
                        {project.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {project.status === 'in-progress' ? (
                        <div className="flex items-center">
                          <div className="flex-1 bg-stone-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-luxury-gold-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-stone-600">{project.progress}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-stone-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-900">{project.budget}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-luxury-gold-600 hover:text-luxury-gold-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
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
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-charcoal-900">
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-stone-600">Project form will be implemented here...</p>
              {editingProject && (
                <div className="mt-4">
                  <p><strong>Title:</strong> {editingProject.title}</p>
                  <p><strong>Client:</strong> {editingProject.client}</p>
                  <p><strong>Budget:</strong> {editingProject.budget}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-stone-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowProjectModal(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 border border-stone-300 rounded-lg text-charcoal-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveProject({})}
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

export default ProjectsManager; 