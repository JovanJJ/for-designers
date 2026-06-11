'use client';

import React, { useState, useRef } from 'react';
import { Camera, RotateCcw, Info, Smartphone } from 'lucide-react';
import { useOrientation } from '../hooks/useOrientation';
import { useIntakeStore } from '../store/useIntakeStore';

/**
 * Landscape Lock Overlay
 * Displayed when the device is in portrait orientation.
 */
const LandscapeOverlay = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md p-6 text-center">
    <div className="animate-bounce mb-6">
      <div className="relative">
        <Smartphone className="w-16 h-16 text-zinc-900 rotate-90" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full animate-ping" />
      </div>
    </div>
    <h2 className="text-xl font-semibold text-zinc-900 mb-2">
      Molimo rotirajte telefon horizontalno za nastavak.
    </h2>
    <p className="text-zinc-500 max-w-xs mx-auto text-sm leading-relaxed">
      Za precizno mapiranje prostora, potrebno je da koristite aplikaciju u horizontalnom (landscape) režimu.
    </p>
  </div>
);

/**
 * Skeleton Loader for Uploading State
 */
const UploadSkeleton = () => (
  <div className="absolute inset-0 bg-zinc-50 flex flex-col items-center justify-center space-y-4 animate-pulse">
    <div className="w-12 h-12 rounded-full border-2 border-zinc-200 border-t-zinc-800 animate-spin" />
    <div className="space-y-2 flex flex-col items-center">
      <div className="h-4 w-32 bg-zinc-200 rounded" />
      <div className="h-3 w-24 bg-zinc-100 rounded" />
    </div>
  </div>
);

export const WallCapture: React.FC = () => {
  const isPortrait = useOrientation();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { currentSequenceOrder, setCurrentWallImage } = useIntakeStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate Cloudinary upload process
    setIsUploading(true);
    
    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsUploading(false);
    
    // Instantly transition to mapping step
    setCurrentWallImage(objectUrl);
  };

  const onCaptureClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
      {isPortrait && <LandscapeOverlay />}

      {/* Progress & Header */}
      <div className="mb-8 flex items-end justify-between border-b border-zinc-100 pb-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
            Korak 02 — Skeniranje
          </p>
          <h1 className="text-2xl font-light text-zinc-900">
            Zid <span className="font-medium text-zinc-900">{currentSequenceOrder}</span>
          </h1>
        </div>
      </div>

      {/* Camera/Image Container */}
      <div className="aspect-[4/3] w-full relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition-all duration-500 ease-in-out">
        {isUploading && <UploadSkeleton />}
        
        {!isUploading && (
          <button 
            onClick={onCaptureClick}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group transition-colors hover:bg-zinc-100/50"
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md border border-zinc-100 group-active:scale-95 transition-transform">
              <Camera className="w-8 h-8 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-medium text-zinc-900">Uslikajte zid</span>
              <span className="block text-[11px] text-zinc-400 mt-1 uppercase tracking-wider">Pritisnite za aktivaciju kamere</span>
            </div>
          </button>
        )}

        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
      </div>

      {/* Footer / Hints */}
      <div className="mt-8 flex flex-col items-center">
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100 max-w-md">
          <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-500 leading-relaxed italic">
            <strong className="text-zinc-700 not-italic block mb-1">Savet profesionalca:</strong>
            Ukoliko ne možete da obuhvatite ceo zid, slobodno odzumirajte (0.5x) na kameri.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WallCapture;
