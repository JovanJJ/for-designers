import React from 'react';
import { Sidebar } from '../dashboard/components/Sidebar';
import { ArrowLeft, Download, Image as ImageIcon, Check, X } from 'lucide-react';

export default function ProjectDetailView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen bg-zinc-50/50">
      <Sidebar />
      <div className="flex flex-col h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 mb-8 gap-6">
            <div className="space-y-4">
              <button className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">Project: Milena Jovanovic - Flat 74</h1>
            </div>
            <button className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm w-full md:w-auto">
              <Download className="h-4 w-4" />
              Download PDF Report
            </button>
          </div>

          {/* Metadata Sub-header */}
          <div className="flex flex-wrap gap-6 text-sm text-zinc-500 mb-8 font-medium">
            <span className="flex items-center">
              <span className="text-zinc-900 mr-2">Client:</span> Milena J.
            </span>
            <span className="flex items-center">
              <span className="text-zinc-900 mr-2">Budget:</span> €15,000
            </span>
            <span className="flex items-center">
              <span className="text-zinc-900 mr-2">Style Preference:</span> Modern Scandinavian
            </span>
          </div>

          {/* Room Tabs Navigation */}
          <div className="flex gap-2 border-b border-zinc-200 mb-8 overflow-x-auto pb-px hide-scrollbar">
            <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-zinc-900 text-zinc-900 whitespace-nowrap">
              Living Room (Active)
            </button>
            <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-zinc-500 hover:text-zinc-700 whitespace-nowrap transition-colors">
              Kitchen
            </button>
            <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-zinc-500 hover:text-zinc-700 whitespace-nowrap transition-colors">
              Master Bedroom
            </button>
          </div>

          {/* Main Report Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12">

            {/* Left Column (Visual Assets) */}
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-semibold text-zinc-900">Uploaded Photos (3)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Photo Card 1 */}
                <div className="flex flex-col gap-3 group">
                  <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center overflow-hidden transition-all group-hover:border-zinc-300 group-hover:shadow-sm">
                    <ImageIcon className="h-8 w-8 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">Wall A - Facing Window</h3>
                    <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 underline underline-offset-2 mt-1 inline-block transition-colors">View Full Size</a>
                  </div>
                </div>

                {/* Photo Card 2 */}
                <div className="flex flex-col gap-3 group">
                  <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center overflow-hidden transition-all group-hover:border-zinc-300 group-hover:shadow-sm">
                    <ImageIcon className="h-8 w-8 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">Wall B - Radiator view</h3>
                    <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 underline underline-offset-2 mt-1 inline-block transition-colors">View Full Size</a>
                  </div>
                </div>

                {/* Photo Card 3 */}
                <div className="flex flex-col gap-3 group">
                  <div className="aspect-[4/3] bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center overflow-hidden transition-all group-hover:border-zinc-300 group-hover:shadow-sm">
                    <ImageIcon className="h-8 w-8 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">Ceiling Details</h3>
                    <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 underline underline-offset-2 mt-1 inline-block transition-colors">View Full Size</a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column (Data & Requirements Panel) */}
            <div className="flex flex-col gap-8 p-6 lg:p-8 bg-zinc-50/50 border border-zinc-200 rounded-2xl shadow-sm h-fit">

              {/* Block 1 (Dimensions) */}
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-zinc-900">Room Dimensions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Length</span>
                    <span className="text-sm font-semibold text-zinc-900">5.40 m</span>
                  </div>
                  <div className="flex flex-col p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Width</span>
                    <span className="text-sm font-semibold text-zinc-900">4.10 m</span>
                  </div>
                  <div className="flex flex-col p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm col-span-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Ceiling Height</span>
                    <span className="text-sm font-semibold text-zinc-900">2.75 m</span>
                  </div>
                </div>
              </div>

              <hr className="border-zinc-200" />

              {/* Block 2 (Client Notes) */}
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-zinc-900">Client Notes</h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  We want to keep the existing oak flooring. The radiator on Wall B cannot be moved, so please design around it. We need plenty of hidden storage for toys.
                </p>
              </div>

              <hr className="border-zinc-200" />

              {/* Block 3 (Fixtures Checklist) */}
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-zinc-900">Fixtures Checklist</h2>
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                    <div className="h-5 w-5 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Natural light (High)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                    <div className="h-5 w-5 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Existing Outlets (4)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-500 font-medium">
                    <div className="h-5 w-5 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center shrink-0">
                      <X className="h-3 w-3 text-zinc-500" />
                    </div>
                    Structural Pillars (None)
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
