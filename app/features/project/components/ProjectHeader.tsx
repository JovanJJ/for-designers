import React from 'react';
import { ArrowLeft, Wand2, FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface ProjectHeaderProps {
  projectName: string;
}

export function ProjectHeader({ projectName }: ProjectHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6 mb-8">
      <div className="space-y-2">
        <Link 
          href="/dashboard" 
          className="flex items-center text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors group"
        >
          <ArrowLeft className="h-3 w-3 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Workspace
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
          {projectName}
        </h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-600 px-4 py-2 rounded-lg font-medium text-xs transition-all shadow-sm">
          <PlusCircle className="h-4 w-4" />
          Add Override Notes
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-600 px-4 py-2 rounded-lg font-medium text-xs transition-all shadow-sm">
          <Wand2 className="h-4 w-4" />
          Generate Variations
        </button>
        <button className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium text-xs transition-all shadow-sm">
          <FileText className="h-4 w-4" />
          Export Technical Brief (PDF)
        </button>
      </div>
    </header>
  );
}
