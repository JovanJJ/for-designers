import React from 'react';
import { LayoutDashboard, FolderOpen, Settings, LogOut, Hexagon } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col justify-between p-6 border-r border-zinc-200 bg-white h-full">
      {/* Top Section */}
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-zinc-900 tracking-tight">DesignOS</span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-zinc-100 text-zinc-900 rounded-lg font-medium transition-colors">
            <FolderOpen className="h-5 w-5" />
            Projects
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Templates
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg font-medium transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 border-t border-zinc-100">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-zinc-200 rounded-full flex items-center justify-center text-sm font-semibold text-zinc-700">
              SJ
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900">Studio Name</span>
              <span className="text-xs text-zinc-500">Pro Plan</span>
            </div>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
