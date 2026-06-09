"use client";

import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';
import { CreateProjectModal } from './CreateProjectModal';

export function EmptyState() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center justify-center p-12 bg-white border border-dashed border-zinc-200 rounded-2xl text-center cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm"
      >
        <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-full flex items-center justify-center mb-4">
          <FolderPlus className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">No projects yet</h3>
        <p className="text-sm text-zinc-500 max-w-sm mb-6">
          Create your first project link to start onboarding clients.
        </p>
        <button className="px-5 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-xl font-medium text-sm shadow-sm">
          + New Project
        </button>
      </div>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
