'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Folder, Calendar, Settings } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'draft';
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
              <p className="mt-2 text-slate-600">Manage and track your AI projects</p>
            </div>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus size={20} />
              New Project
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error Loading Projects</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <Folder size={48} className="mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">No projects yet</h2>
            <p className="text-slate-600 mb-6">
              Create your first AI project to get started
            </p>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Create Project
            </Link>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Your Projects ({projects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/${project.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
                >
                  <div className="p-6">
                    {/* Project Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {project.name}
                        </h3>
                      </div>
                      <span
                        className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusBadgeColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Project Description */}
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                      {project.description || 'No description provided'}
                    </p>

                    {/* Project Meta */}
                    <div className="space-y-2 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} />
                        <span>Created {formatDate(project.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} />
                        <span>Updated {formatDate(project.updatedAt)}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="mt-6 w-full py-2 px-4 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                      Open Project
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
