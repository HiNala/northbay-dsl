"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToastActions } from '@/components/ui/toast';
import { 
  Settings, 
  Brain, 
  Edit, 
  Save, 
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  Zap,
  FileText,
  Package,
  Home,
  PenTool,
  Sparkles
} from 'lucide-react';

interface AIPrompt {
  id: string;
  type: 'product_description' | 'project_description' | 'blog_content' | 'general';
  name: string;
  description?: string;
  systemPrompt: string;
  userPromptTemplate?: string;
  isActive: boolean;
  model: string;
  temperature: number;
  maxTokens: number;
  updatedAt: string;
}

const promptTypes = [
  { 
    id: 'product_description', 
    name: 'Product Descriptions', 
    icon: Package,
    description: 'Generate compelling product descriptions'
  },
  { 
    id: 'project_description', 
    name: 'Project Descriptions', 
    icon: Home,
    description: 'Create project showcase content'
  },
  { 
    id: 'blog_content', 
    name: 'Blog Content', 
    icon: FileText,
    description: 'Generate blog posts and articles'
  },
  { 
    id: 'general', 
    name: 'General Content', 
    icon: PenTool,
    description: 'Multipurpose content generation'
  }
];

export default function AIPromptsManager() {
  const [prompts, setPrompts] = useState<AIPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPrompt, setEditingPrompt] = useState<AIPrompt | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const toast = useToastActions();

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings/ai-prompts');
      if (response.ok) {
        const data = await response.json();
        setPrompts(data.prompts || []);
      } else {
        toast.error('Failed to fetch AI prompts');
      }
    } catch (error) {
      console.error('Error fetching AI prompts:', error);
      toast.error('Failed to fetch AI prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prompt: AIPrompt) => {
    setEditingPrompt({ ...prompt });
    setIsEditing(true);
  };

  const handleCreateNew = (type: string) => {
    const promptType = promptTypes.find(pt => pt.id === type);
    if (promptType) {
      setEditingPrompt({
        id: `ai_prompt_${type}`,
        type: type as AIPrompt['type'],
        name: promptType.name,
        description: promptType.description,
        systemPrompt: '',
        userPromptTemplate: '',
        isActive: true,
        model: 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 1000,
        updatedAt: new Date().toISOString(),
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!editingPrompt) return;

    try {
      setSaving(true);
      
      const existingPrompt = prompts.find(p => p.type === editingPrompt.type);
      const method = existingPrompt ? 'PUT' : 'POST';
      
      const response = await fetch('/api/settings/ai-prompts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPrompt),
      });

      if (response.ok) {
        toast.success(`AI prompt ${existingPrompt ? 'updated' : 'created'} successfully`);
        await fetchPrompts();
        setIsEditing(false);
        setEditingPrompt(null);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save AI prompt');
      }
    } catch (error) {
      console.error('Error saving AI prompt:', error);
      toast.error('Failed to save AI prompt');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPrompt(null);
  };

  const getPromptIcon = (type: string) => {
    const promptType = promptTypes.find(pt => pt.id === type);
    return promptType?.icon || Sparkles;
  };

  const getPromptName = (type: string) => {
    const promptType = promptTypes.find(pt => pt.id === type);
    return promptType?.name || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">AI Content Prompts</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Model: gpt-4o-mini
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Cost Optimized
          </Badge>
        </div>
      </div>

      {/* Prompt Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {promptTypes.map((type) => {
          const existingPrompt = prompts.find(p => p.type === type.id);
          const IconComponent = type.icon;
          
          return (
            <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  {existingPrompt ? (
                    <Badge variant={existingPrompt.isActive ? "default" : "secondary"}>
                      {existingPrompt.isActive ? "Active" : "Inactive"}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Set</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1">{type.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{type.description}</p>
                <div className="flex space-x-2">
                  {existingPrompt ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(existingPrompt)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handleCreateNew(type.id)}
                      className="flex-1"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Create
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Existing Prompts List */}
      {prompts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Configured Prompts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prompts.map((prompt) => {
                const IconComponent = getPromptIcon(prompt.type);
                return (
                  <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{prompt.name}</h4>
                        <p className="text-sm text-gray-600">{getPromptName(prompt.type)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={prompt.isActive ? "default" : "secondary"}>
                        {prompt.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">
                        {prompt.model}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(prompt)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      {isEditing && editingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Edit AI Prompt: {editingPrompt.name}</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingPrompt.name}
                    onChange={(e) => setEditingPrompt({
                      ...editingPrompt,
                      name: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="model">AI Model</Label>
                  <select
                    id="model"
                    className="w-full p-2 border rounded-md"
                    value={editingPrompt.model}
                    onChange={(e) => setEditingPrompt({
                      ...editingPrompt,
                      model: e.target.value
                    })}
                  >
                    <option value="gpt-4o-mini">GPT-4o Mini (Economical)</option>
                    <option value="gpt-4o">GPT-4o (Advanced)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editingPrompt.description || ''}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    description: e.target.value
                  })}
                  placeholder="Brief description of this prompt's purpose"
                />
              </div>

              {/* AI Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="temperature">Temperature: {editingPrompt.temperature}</Label>
                  <input
                    type="range"
                    id="temperature"
                    min="0"
                    max="2"
                    step="0.1"
                    value={editingPrompt.temperature}
                    onChange={(e) => setEditingPrompt({
                      ...editingPrompt,
                      temperature: parseFloat(e.target.value)
                    })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Lower = more focused, Higher = more creative
                  </div>
                </div>
                <div>
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    min="100"
                    max="4000"
                    value={editingPrompt.maxTokens}
                    onChange={(e) => setEditingPrompt({
                      ...editingPrompt,
                      maxTokens: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>

              {/* System Prompt */}
              <div>
                <Label htmlFor="systemPrompt">System Prompt</Label>
                <Textarea
                  id="systemPrompt"
                  value={editingPrompt.systemPrompt}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    systemPrompt: e.target.value
                  })}
                  rows={10}
                  placeholder="Enter the system prompt that defines the AI's role and behavior..."
                />
                <div className="text-xs text-gray-600 mt-1">
                  This prompt defines the AI's personality, expertise, and output format.
                </div>
              </div>

              {/* User Prompt Template */}
              <div>
                <Label htmlFor="userPromptTemplate">User Prompt Template (Optional)</Label>
                <Textarea
                  id="userPromptTemplate"
                  value={editingPrompt.userPromptTemplate || ''}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    userPromptTemplate: e.target.value
                  })}
                  rows={6}
                  placeholder="Template for user prompts. Use placeholders like {name}, {category}, {brand}, etc."
                />
                <div className="text-xs text-gray-600 mt-1">
                  Optional template for customizing user prompts. Available placeholders vary by type.
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={editingPrompt.isActive}
                  onCheckedChange={(checked) => setEditingPrompt({
                    ...editingPrompt,
                    isActive: checked
                  })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Prompt
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 