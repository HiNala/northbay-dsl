"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToastActions } from '@/components/ui/toast';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  MoreHorizontal,
  FileText,
  Globe
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats>({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'drafts'>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  
  const { success, error } = useToastActions();

  useEffect(() => {
    fetchPosts();
  }, [statusFilter, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        admin: 'true',
        limit: '50',
      });

      if (statusFilter !== 'all') {
        params.append('status', statusFilter === 'published' ? 'published' : 'draft');
      }

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/blog?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
        
        // Calculate stats
        const allPosts = data.posts || [];
        setStats({
          total: allPosts.length,
          published: allPosts.filter((p: BlogPost) => p.isPublished).length,
          drafts: allPosts.filter((p: BlogPost) => !p.isPublished).length,
          totalViews: allPosts.reduce((sum: number, p: BlogPost) => sum + p.viewCount, 0),
        });
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        success('Blog post deleted successfully');
        fetchPosts();
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      error('Failed to delete blog post');
    }
  };

  const handleTogglePublish = async (postId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !currentStatus,
        }),
      });

      if (response.ok) {
        success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
        fetchPosts();
      } else {
        throw new Error('Failed to update post');
      }
    } catch (err) {
      console.error('Error updating post:', err);
      error('Failed to update blog post');
    }
  };

  const filteredPosts = posts.filter(post => {
    if (statusFilter === 'published' && !post.isPublished) return false;
    if (statusFilter === 'drafts' && post.isPublished) return false;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nb-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nb-neutral-600">Total Posts</p>
                <p className="text-2xl font-bold text-nb-neutral-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-nb-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nb-neutral-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <Globe className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nb-neutral-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nb-neutral-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-nb-neutral-900">Blog Posts</h2>
          <p className="text-nb-neutral-600">Manage your blog content and articles</p>
        </div>
        
        <Button
          onClick={() => window.open('/dashboard/blog/new', '_blank')}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Post
        </Button>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                variant="luxury"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-nb-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-nb-gold-500 focus:border-transparent"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="drafts">Drafts</option>
              </select>
              
              <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Posts ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-nb-neutral-300 mx-auto mb-4" />
              <p className="text-nb-neutral-500">No blog posts found</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.open('/dashboard/blog/new', '_blank')}
              >
                Create Your First Post
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-nb-neutral-50 border-b border-nb-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-nb-neutral-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-nb-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-nb-neutral-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-nb-neutral-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-nb-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-nb-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-nb-neutral-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-nb-neutral-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-nb-neutral-900">
                            {post.title}
                          </div>
                          {post.excerpt && (
                            <div className="text-sm text-nb-neutral-500 truncate max-w-xs">
                              {post.excerpt}
                            </div>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            {post.category && (
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            )}
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-nb-neutral-400">
                                +{post.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant={post.isPublished ? "default" : "outline"}
                          className={post.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-nb-neutral-900">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-nb-neutral-400 mr-2" />
                          {post.author?.name || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-nb-neutral-900">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-nb-neutral-400 mr-2" />
                          {post.viewCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-nb-neutral-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-nb-neutral-400 mr-2" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/dashboard/blog/edit/${post.id}`, '_blank')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(post.id, post.isPublished)}
                          >
                            {post.isPublished ? 'Unpublish' : 'Publish'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager; 