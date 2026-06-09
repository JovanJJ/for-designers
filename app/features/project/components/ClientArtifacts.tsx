"use client";

import React, { useState } from 'react';
import { Maximize2, Ruler, Box, Layers, Info, Sun, Contrast } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  label: string;
}

interface Dimension {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const mockPhotos: Photo[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800', label: 'North Wall - Window' },
  { id: '2', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800', label: 'East Wall - Radiator' },
  { id: '3', url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800', label: 'Ceiling Detail' },
  { id: '4', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', label: 'Floor Material' },
];

const mockDimensions: Dimension[] = [
  { label: 'Length', value: '5.40 m', icon: <Ruler className="h-4 w-4" /> },
  { label: 'Width', value: '4.10 m', icon: <Box className="h-4 w-4" /> },
  { label: 'Height', value: '2.75 m', icon: <Layers className="h-4 w-4" /> },
  { label: 'Total Area', value: '22.14 m²', icon: <Layers className="h-4 w-4" /> },
];

export function ClientArtifacts() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  return (
    <div className="flex flex-col gap-10">
      {/* Section 1: Visual Reference Gallery */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2">
            Visual Reference Gallery
            <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded text-[10px]">{mockPhotos.length}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {mockPhotos.map((photo) => (
            <div key={photo.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm transition-all hover:border-zinc-400">
              <img 
                src={photo.url} 
                alt={photo.label} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate mr-2">
                  {photo.label}
                </span>
                <button 
                  onClick={() => setSelectedPhoto(photo)}
                  className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Spatial Dimensions */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-5">
          Spatial Dimensions & Metrics
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {mockDimensions.map((dim, idx) => (
            <div key={idx} className="flex flex-col p-4 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-zinc-300 transition-colors group">
              <div className="flex items-center gap-2 text-zinc-400 mb-2 transition-colors group-hover:text-zinc-600">
                {dim.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider">{dim.label}</span>
              </div>
              <span className="text-lg font-bold text-zinc-900 tracking-tight">{dim.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Fixed Architectural Elements */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-5">
          Fixed Architectural Elements
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
            <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-500">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Constraints Detected</h4>
              <ul className="space-y-2">
                <li className="text-[13px] text-zinc-600 flex items-center gap-2">
                  <div className="h-1 w-1 bg-zinc-400 rounded-full" />
                  Radiator on East Wall (120cm width)
                </li>
                <li className="text-[13px] text-zinc-600 flex items-center gap-2">
                  <div className="h-1 w-1 bg-zinc-400 rounded-full" />
                  Structural Pillar in SW Corner
                </li>
                <li className="text-[13px] text-zinc-600 flex items-center gap-2">
                  <div className="h-1 w-1 bg-zinc-400 rounded-full" />
                  HVAC Vent 40cm from North Window
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <button 
            onClick={() => { setSelectedPhoto(null); setBrightness(100); setContrast(100); }}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
          >
            <Maximize2 className="h-8 w-8 rotate-45" />
          </button>
          
          <div className="relative max-w-5xl w-full flex flex-col items-center gap-8">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.label} 
                className="max-h-[70vh] w-auto object-contain transition-all duration-300"
                style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
              />
            </div>

            {/* Lightbox Controls */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-2xl">
              <div className="flex flex-col w-full gap-3">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Sun className="h-3.5 w-3.5" /> Brightness
                  </span>
                  <span className="text-xs font-mono">{brightness}%</span>
                </div>
                <input 
                  type="range" min="50" max="200" value={brightness} 
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div className="hidden md:block w-px h-10 bg-white/10" />

              <div className="flex flex-col w-full gap-3">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Contrast className="h-3.5 w-3.5" /> Contrast
                  </span>
                  <span className="text-xs font-mono">{contrast}%</span>
                </div>
                <input 
                  type="range" min="50" max="200" value={contrast} 
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">
              {selectedPhoto.label}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
