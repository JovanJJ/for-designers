'use client';

import React from 'react';
import { useIntakeStore } from '../store/useIntakeStore';
import { RoomConfigForm } from './RoomConfigForm';
import { WallCapture } from './WallCapture';
import { WallImageMapper } from './WallImageMapper';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const IntakeWizard: React.FC = () => {
  const { 
    roomMetadata, 
    currentWallImage, 
    currentWallLength,
    currentSequenceOrder, 
    nextWall,
    resetStore 
  } = useIntakeStore();

  const isNextDisabled = !currentWallLength || currentWallLength <= 0;

  const handleFinishRoom = () => {
    if (isNextDisabled) return;
    // In a real app, this would submit all data to the backend
    if (confirm('Da li ste sigurni da želite da završite skeniranje ove sobe?')) {
      resetStore();
      alert('Soba uspešno sačuvana!');
    }
  };

  const renderStep = () => {
    // Step 1: Configuration
    if (!roomMetadata) {
      return <RoomConfigForm />;
    }

    // Step 2: Wall Capture
    if (!currentWallImage) {
      return <WallCapture />;
    }

    // Step 3: Wall Mapping
    return (
      <WallImageMapper 
        imageUrl={currentWallImage} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Persistent Header / Progress */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold">
            {currentSequenceOrder}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-tight">Zid {currentSequenceOrder}</h2>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Aktivno skeniranje</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentWallImage && (
            <button
              onClick={nextWall}
              disabled={isNextDisabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isNextDisabled 
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-50' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
              }`}
            >
              Sledeći zid <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
          
          <button
            onClick={handleFinishRoom}
            disabled={isNextDisabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              isNextDisabled
              ? 'bg-emerald-50 text-emerald-300 cursor-not-allowed opacity-50'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Završi sobu
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-8 px-4">
          {renderStep()}
        </div>
      </main>

      {/* Progress Bar (Visual Only) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-zinc-100">
        <div 
          className="h-full bg-zinc-900 transition-all duration-500 ease-in-out" 
          style={{ width: `${Math.min((currentSequenceOrder / 4) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default IntakeWizard;
