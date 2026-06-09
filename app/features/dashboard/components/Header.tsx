"use client";

import React, { useState } from 'react';
import { Plus, Menu } from 'lucide-react';
import { CreateProjectModal } from './CreateProjectModal';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between p-6 md:p-8 bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <button className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-50 transition-colors">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Projects</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Project Link</span>
          <span className="sm:hidden">New Link</span>
        </button>
      </header>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
