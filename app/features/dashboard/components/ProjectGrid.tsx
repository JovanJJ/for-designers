import React from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { getDesignerProjects } from '@/lib/actions';
import { EmptyState } from './EmptyState';
import { CopyLinkButton } from './CopyLinkButton';
import Link from 'next/link';

function getStatusBadge(status: string) {
  switch (status) {
    case 'READY_TO_REVIEW':
      return (
        <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 border border-green-200/50 text-xs font-semibold rounded-full">
          Ready to Review
        </span>
      );
    case 'CLIENT_UPLOADING':
      return (
        <span className="inline-flex px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/50 text-xs font-semibold rounded-full">
          Client Uploading
        </span>
      );
    case 'LINK_SENT':
    default:
      return (
        <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/50 text-xs font-semibold rounded-full">
          Link Sent
        </span>
      );
  }
}

function formatRoomType(room: string) {
  return room
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export async function ProjectGrid() {
  const projects = await getDesignerProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="p-6 md:p-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 md:p-8">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col justify-between p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-zinc-900 text-lg leading-tight group-hover:text-zinc-600 transition-colors line-clamp-1">
                {project.name}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.rooms && project.rooms.length > 0 ? (
                project.rooms.map((room: string, idx: number) => (
                  <span key={idx} className="inline-flex px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">
                    {formatRoomType(room)}
                  </span>
                ))
              ) : (
                <span className="inline-flex px-2.5 py-1 bg-zinc-50 text-zinc-400 text-xs font-medium rounded-md">
                  No rooms selected
                </span>
              )}
            </div>

            <div className="flex items-center">
              {getStatusBadge(project.status)}
            </div>

            <div className="space-y-1 mt-4">
              <p className="text-sm text-zinc-500 font-medium truncate">
                {project.client_email}
              </p>
              <p className="text-xs text-zinc-400">
                Created on {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {project.status === 'READY_TO_REVIEW' ? (
            <Link href={`/dashboard/projects/${project.id}`} className="mt-8 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
              Open Space Report
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : project.status === 'LINK_SENT' ? (
            <CopyLinkButton shareToken={project.share_token} />
          ) : (
            <Link href={`/dashboard/projects/${project.id}`} className="mt-8 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-sm font-medium rounded-xl border border-zinc-200 transition-colors">
              View Progress
              <Eye className="h-4 w-4 text-zinc-500" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
