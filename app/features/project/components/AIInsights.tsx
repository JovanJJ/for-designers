"use client";

import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ChevronDown, Layout, Lightbulb, Move, Sun } from 'lucide-react';

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, icon, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-emerald-600 bg-emerald-50 p-2 rounded-lg">
            {icon}
          </div>
          <span className="text-sm font-bold text-zinc-900 uppercase tracking-wide">{title}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="p-5 pt-0 border-t border-zinc-100 text-zinc-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AIInsights() {
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-zinc-50 via-white to-emerald-50/30 border border-zinc-200 shadow-xl h-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-600 rounded-lg shadow-lg shadow-emerald-200 animate-pulse">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">AI Space Intelligence</h2>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Analysis Engine v2.4</p>
        </div>
      </div>

      {/* Section 1: AI Spatial Analysis */}
      <div className="space-y-4 mb-4">
        <p className="text-sm text-zinc-600 leading-relaxed">
          The room exhibits a <span className="font-bold text-zinc-900">Modern Scandinavian</span> architectural style with significant natural light potential from the North-facing window. Existing floor materials appear to be <span className="font-bold text-zinc-900">natural oak planks</span> in good condition. The dominant color palette is neutral (zinc/slate) with high-contrast potential.
        </p>
      </div>

      {/* Section 2: Design Guardrails & Red Flags */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <AlertTriangle className="h-3 w-3" /> Designer Guardrails
        </h3>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-700 uppercase tracking-wide">
            <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
            Obstructed outlets (West Wall)
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-[11px] font-bold text-red-700 uppercase tracking-wide">
            <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
            Low beam clearance (Entry)
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-700 uppercase tracking-wide">
            <div className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
            HVAC Vent Conflict
          </div>
        </div>
      </div>

      <hr className="border-zinc-200 my-2" />

      {/* Interactive Accordions */}
      <div className="flex flex-col gap-4">
        <Accordion title="Zoning & Layout" icon={<Layout className="h-4 w-4" />} defaultOpen={true}>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm leading-relaxed">
              <span className="font-bold text-zinc-900">01.</span>
              <span>Optimal <span className="text-emerald-700 font-medium">focal wall</span> placement identified on the South Wall, opposite the primary light source.</span>
            </li>
            <li className="flex gap-3 text-sm leading-relaxed">
              <span className="font-bold text-zinc-900">02.</span>
              <span>Avoid traffic flow bottlenecks near the 4.1m width entry point; recommend a 90cm clear path.</span>
            </li>
            <li className="flex gap-3 text-sm leading-relaxed">
              <span className="font-bold text-zinc-900">03.</span>
              <span>Ergonomic furniture scale: Suggesting a sofa width no greater than 2.4m to maintain spatial balance.</span>
            </li>
          </ul>
        </Accordion>

        <Accordion title="Lighting & Ambiance" icon={<Sun className="h-4 w-4" />}>
          <div className="space-y-3">
            <p className="text-sm">
              Primary light direction is <span className="font-bold">North</span>. 
              Quality of light: <span className="font-medium text-emerald-700">Cool/Consistent</span>.
            </p>
            <p className="text-sm">
              Recommend secondary warm-toned lighting (2700K) for evening use to balance the cool daylight.
            </p>
          </div>
        </Accordion>

        <Accordion title="Material Recommendations" icon={<Lightbulb className="h-4 w-4" />}>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">Textiles</span>
              <span className="text-xs font-medium text-zinc-700">Textured Linen</span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">Accents</span>
              <span className="text-xs font-medium text-zinc-700">Brushed Brass</span>
            </div>
          </div>
        </Accordion>
      </div>
      
      <button className="mt-auto w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group">
        <Move className="h-4 w-4 transition-transform group-hover:scale-110" />
        Apply AI Layout to Canvas
      </button>
    </div>
  );
}
