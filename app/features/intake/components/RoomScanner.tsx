"use client";

import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScanStep {
  id: string;
  title: string;
  instruction: string;
  target: string;
}

const SCAN_STEPS: ScanStep[] = [
  {
    id: 'wall_1',
    title: 'Front Wall',
    instruction: 'From The Door Walk to the back-right corner and capture the entire Front Wall from floor to ceiling.',
    target: 'Front Wall'
  },
  {
    id: 'wall_2',
    title: 'Right Wall',
    instruction: 'From The Door Move to the back-left corner and capture the entire Right Wall from floor to ceiling.',
    target: 'Right Wall'
  },
  {
    id: 'wall_3',
    title: 'Back Wall',
    instruction: 'Position yourself in the front-right corner and capture the Back Wall (where you entered).',
    target: 'Back Wall'
  },
  {
    id: 'wall_4',
    title: 'Left Wall',
    instruction: 'Walk to the far back-right corner, turn around, and capture the entire Left Wall from floor to ceiling.',
    target: 'Left Wall'
  }
];

interface RoomScannerProps {
  onComplete: (photos: { category: string; data: string }[]) => void;
  onCancel: () => void;
  primaryColor: string;
}

export function RoomScanner({ onComplete, onCancel, primaryColor }: RoomScannerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [captures, setCaptures] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentStep = SCAN_STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / SCAN_STEPS.length) * 100;
  const isCaptured = !!captures[currentStep.id];

  const handleCaptureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setCaptures(prev => ({ ...prev, [currentStep.id]: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCaptures(prev => {
      const next = { ...prev };
      delete next[currentStep.id];
      return next;
    });
  };

  const handleNext = () => {
    if (currentStepIndex < SCAN_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      const results = SCAN_STEPS.map(step => ({
        category: step.id,
        data: captures[step.id]
      })).filter(c => !!c.data);
      onComplete(results);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* 1. STEP INDICATOR */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Step {currentStepIndex + 1} of {SCAN_STEPS.length}
          </span>
          <span className="text-sm font-bold text-zinc-900">{currentStep.title}</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: primaryColor }}
          />
        </div>
      </div>

      {/* 2. CONTEXTUAL INSTRUCTION BOX (The Blueprint) */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 mb-6 shadow-sm overflow-hidden relative">
        <div className="aspect-square max-w-[200px] mx-auto mb-6 relative bg-slate-50 rounded-xl border border-zinc-100 p-4">
          <BlueprintVisual step={currentStepIndex} primaryColor={primaryColor} />
        </div>
        <div className="text-center">
          <p className="text-sm text-zinc-600 leading-relaxed font-medium">
            {currentStep.instruction}
          </p>
        </div>
      </div>

      {/* 3. THE CAMERA ACTION ZONE / 4. POST-CAPTURE PREVIEW */}
      <div className="flex-1 flex flex-col justify-end">
        {!isCaptured ? (
          <button
            onClick={handleCaptureClick}
            className="w-full py-6 px-6 rounded-2xl font-bold text-lg transition-transform active:scale-95 shadow-lg flex flex-col items-center gap-3 bg-zinc-900 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <span>Open Camera for {currentStep.target}</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </button>
        ) : (
          <div className="animate-in zoom-in-95 duration-300">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md mb-4 bg-zinc-100">
              <img src={captures[currentStep.id]} alt="Capture" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-[11px] font-bold tracking-wide uppercase rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentStep.target} Captured
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRetake}
                className="flex-1 py-4 px-6 rounded-xl font-bold text-sm bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Photo
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-4 px-6 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                {currentStepIndex === SCAN_STEPS.length - 1 ? 'Finish Scan' : 'Next Wall'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={onCancel}
        className="mt-6 text-xs font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-widest text-center"
      >
        Exit Scanner
      </button>
    </div>
  );
}

function BlueprintVisual({ step, primaryColor }: { step: number; primaryColor: string }) {
  // SVG points for each step
  const steps = [
    // Step 0: Front Wall
    { user: { x: 80, y: 80 }, target: { x: 50, y: 20 }, cone: "M80 80 L40 20 L60 20 Z" },
    // Step 1: Right Wall
    { user: { x: 20, y: 80 }, target: { x: 80, y: 50 }, cone: "M20 80 L80 40 L80 60 Z" },
    // Step 2: Back Wall
    { user: { x: 80, y: 20 }, target: { x: 50, y: 80 }, cone: "M80 20 L40 80 L60 80 Z" },
    // Step 3: Left Wall
    { user: { x: 80, y: 80 }, target: { x: 20, y: 50 }, cone: "M80 80 L20 40 L20 60 Z" },
  ];

  const s = steps[step];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Room boundary */}
      <rect x="15" y="15" width="70" height="70" fill="none" stroke="#e4e4e7" strokeWidth="2" rx="4" />
      
      {/* Door */}
      <line x1="40" y1="85" x2="60" y2="85" stroke="#a1a1aa" strokeWidth="4" strokeLinecap="round" />
      
      {/* Vision Cone */}
      <path 
        d={s.cone} 
        fill={primaryColor} 
        fillOpacity="0.1"
        className="animate-in fade-in duration-700"
      />
      
      {/* Target Wall Highlight */}
      {step === 0 && <line x1="15" y1="15" x2="85" y2="15" stroke={primaryColor} strokeWidth="3" />}
      {step === 1 && <line x1="85" y1="15" x2="85" y2="85" stroke={primaryColor} strokeWidth="3" />}
      {step === 2 && <line x1="15" y1="85" x2="85" y2="85" stroke={primaryColor} strokeWidth="3" />}
      {step === 3 && <line x1="15" y1="15" x2="15" y2="85" stroke={primaryColor} strokeWidth="3" />}

      {/* Path from door (visualized for current step) */}
      <path 
        d={`M50 85 Q 50 80, ${s.user.x} ${s.user.y}`} 
        fill="none" 
        stroke="#6366f1" 
        strokeWidth="1.5" 
        strokeDasharray="4 4" 
        className="opacity-40"
      />

      {/* User Icon */}
      <circle cx={s.user.x} cy={s.user.y} r="4" fill="#6366f1" className="shadow-lg" />
      <circle cx={s.user.x} cy={s.user.y} r="8" fill="#6366f1" fillOpacity="0.15" />
      
      {/* Vision Direction Arrow */}
      <g transform={`rotate(${step === 0 ? -135 : step === 1 ? -45 : step === 2 ? 45 : 135}, ${s.user.x}, ${s.user.y})`}>
        <path d={`M${s.user.x} ${s.user.y - 10} L${s.user.x - 4} ${s.user.y - 4} L${s.user.x + 4} ${s.user.y - 4} Z`} fill="#6366f1" />
      </g>
    </svg>
  );
}
