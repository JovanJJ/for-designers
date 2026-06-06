import React from 'react';
import { ArrowUpRight, Copy, Eye } from 'lucide-react';

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 md:p-8">
      
      {/* Card 1: Active/Completed */}
      <div className="flex flex-col justify-between p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-zinc-900 text-lg leading-tight group-hover:text-zinc-600 transition-colors">
              Milena Jovanovic - Flat 74
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">Living Room</span>
            <span className="inline-flex px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">Kitchen</span>
          </div>

          <div className="flex items-center">
            <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 border border-green-200/50 text-xs font-semibold rounded-full">
              Ready to Review
            </span>
          </div>

          <p className="text-sm text-zinc-500 font-medium">
            30 photos • Dimensions complete • Sent 2 hours ago
          </p>
        </div>

        <button className="mt-8 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-sm font-medium rounded-xl border border-zinc-200 transition-colors">
          Open Space Report
          <ArrowUpRight className="h-4 w-4 text-zinc-500" />
        </button>
      </div>

      {/* Card 2: In Progress */}
      <div className="flex flex-col justify-between p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-zinc-900 text-lg leading-tight group-hover:text-zinc-600 transition-colors">
              Stefan Markovic - Office Space
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">Main Office</span>
          </div>

          <div className="flex items-center">
            <span className="inline-flex px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/50 text-xs font-semibold rounded-full">
              Client Uploading
            </span>
          </div>

          <p className="text-sm text-zinc-500 font-medium">
            12 photos • Awaiting wall measurements
          </p>
        </div>

        <button className="mt-8 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-sm font-medium rounded-xl border border-zinc-200 transition-colors">
          View Progress
          <Eye className="h-4 w-4 text-zinc-500" />
        </button>
      </div>

      {/* Card 3: New/Pending */}
      <div className="flex flex-col justify-between p-6 bg-white border border-zinc-200 border-dashed rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-zinc-900 text-lg leading-tight group-hover:text-zinc-600 transition-colors">
              Ivana&Aleksa - House Concept
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-md">Full House</span>
          </div>

          <div className="flex items-center">
            <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/50 text-xs font-semibold rounded-full">
              Link Sent
            </span>
          </div>

          <p className="text-sm text-zinc-500 font-medium">
            Awaiting client's first login
          </p>
        </div>

        <button className="mt-8 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl shadow-sm transition-colors">
          <Copy className="h-4 w-4" />
          Copy Intake Link
        </button>
      </div>

    </div>
  );
}
