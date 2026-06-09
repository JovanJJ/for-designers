"use client";

import React, { useState } from 'react';
import { Camera, ArrowLeft, CheckCircle2, ChevronRight, X, ImagePlus, Loader2, Sparkles } from 'lucide-react';
import { saveRoomDataAction } from '@/lib/actions';
import { RoomScanner } from './components/RoomScanner';

export interface PremiumBranding {
  logo: string;
  color: string;
}

export interface RoomItem {
  id: string;
  name: string;
  status: 'PENDING' | 'COMPLETED';
  roomType?: string;
}

interface ClientMobileIntakeProps {
  studioName: string;
  projectTitle: string;
  designerNote?: string;
  premiumBranding: PremiumBranding | null;
  initialRooms: RoomItem[];
}

interface PhotoRequirement {
  id: string;
  title: string;
  description: string;
  isConditional: boolean;
  conditionalLabel?: string;
}

function getRequirementsForRoom(roomType?: string, roomName?: string): PhotoRequirement[] {
  const type = (roomType || inferRoomType(roomName || '')).toUpperCase();

  const globals: PhotoRequirement[] = [
    {
      id: 'corners',
      title: 'Room Corners',
      description: 'Stand in a corner and capture the full room view from floor to ceiling.',
      isConditional: false
    },
    {
      id: 'sockets',
      title: 'Electrical Outlets',
      description: 'Take close-up photos of all wall sockets and light switches.',
      isConditional: false
    },
    {
      id: 'radiators',
      title: 'Radiators & Heating Pipes (Radijatori i cevke)',
      description: 'Slikajte sve radijatore, sušače, klime, kao i vidljive vertikalne ili horizontalne cevi od grejanja u ovoj prostoriji.',
      isConditional: true,
      conditionalLabel: 'No Radiators/Pipes in this room (Nema radijatora/cevi u ovoj sobi)'
    }
  ];

  const specific: PhotoRequirement[] = [];

  if (type === 'KITCHEN') {
    specific.push({
      id: 'kitchen_drainage',
      title: 'Water Drainage & Ventilation',
      description: 'Photograph sink pipe openings and the hood vent outlet.',
      isConditional: true,
      conditionalLabel: 'No Water Drainage & Ventilation here'
    });
  } else if (type === 'BATHROOM') {
    specific.push({
      id: 'bathroom_plumbing',
      title: 'Plumbing & Drainage',
      description: 'Capture main floor drains, boiler connections, and toilet pipes.',
      isConditional: true,
      conditionalLabel: 'No Plumbing & Drainage here'
    });
  }

  return [...globals, ...specific];
}

function inferRoomType(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('kitchen')) return 'KITCHEN';
  if (lowerName.includes('bath')) return 'BATHROOM';
  if (lowerName.includes('living')) return 'LIVING_ROOM';
  if (lowerName.includes('bed')) return 'BEDROOM';
  return 'OTHER';
}

export function ClientMobileIntake({
  studioName,
  projectTitle,
  designerNote,
  premiumBranding,
  initialRooms
}: ClientMobileIntakeProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rooms, setRooms] = useState<RoomItem[]>(initialRooms);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [roomPhotos, setRoomPhotos] = useState<Record<string, { data: string; category: string }[]>>({});
  const [skippedFields, setSkippedFields] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const primaryColor = premiumBranding?.color || '#09090b';
  const primaryButtonStyle = { backgroundColor: primaryColor, color: '#ffffff' };

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);
  const requirements = selectedRoom ? getRequirementsForRoom(selectedRoom.roomType, selectedRoom.name) : [];

  const handleStart = () => setStep(2);

  const handleRoomClick = (id: string) => {
    setSelectedRoomId(id);
    setLength("");
    setWidth("");
    setHeight("");
    setRoomPhotos({});
    setSkippedFields({});
    setStep(3);
  };

  const handleBackToRooms = () => {
    setStep(2);
    setSelectedRoomId(null);
    setIsScanning(false);
  };

  const handleScannerComplete = (photos: { category: string; data: string }[]) => {
    // Map individual captures to our roomPhotos record
    const updatedPhotos = { ...roomPhotos };
    photos.forEach(photo => {
      updatedPhotos[photo.category] = [{ data: photo.data, category: photo.category }];
    });
    setRoomPhotos(updatedPhotos);
    setIsScanning(false);
  };

  const handlePhotoUpload = async (reqId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newImages = await Promise.all(
        files.map(file => new Promise<{ data: string; category: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve({ data: reader.result as string, category: reqId });
          reader.onerror = error => reject(error);
        }))
      );

      setRoomPhotos(prev => ({
        ...prev,
        [reqId]: [...(prev[reqId] || []), ...newImages]
      }));
    }
  };

  const removeRoomPhoto = (reqId: string, index: number) => {
    setRoomPhotos(prev => ({
      ...prev,
      [reqId]: prev[reqId].filter((_, i) => i !== index)
    }));
  };

  const handleSaveRoom = async () => {
    if (selectedRoomId) {
      setIsSaving(true);
      try {
        const payloadImages = Object.entries(roomPhotos).flatMap(([category, photos]) =>
          photos.map(photo => ({ category, data: photo.data }))
        );

        const payload = {
          roomId: selectedRoomId,
          length: Number(length) || 0,
          width: Number(width) || 0,
          height: Number(height) || 0,
          skippedFeatures: skippedFields,
          images: payloadImages,
        };

        const result = await saveRoomDataAction(payload);

        if (result.success) {
          setRooms(prev => prev.map(r => r.id === selectedRoomId ? { ...r, status: 'COMPLETED' } : r));
          handleBackToRooms();
        } else {
          alert("Failed to save room details: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error saving room details:", error);
        alert("An unexpected error occurred. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-between font-sans">

      <header className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm z-10 relative">
        {premiumBranding ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={premiumBranding.logo} alt={studioName} className="h-8 w-auto object-contain" />
          </div>
        ) : (
          <>
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">SpaceIntake</span>
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">Powered by SpaceIntake</span>
          </>
        )}
      </header>

      <main className="flex-1 p-6 flex flex-col max-w-md mx-auto w-full">

        {step === 1 && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4">
              Welcome to your project with {studioName}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-medium text-lg leading-relaxed">{projectTitle}</p>

            {designerNote && (
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: primaryColor }}></div>
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Designer&apos;s Note</h3>
                <p className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed text-sm">
                  &quot;{designerNote}&quot;
                </p>
              </div>
            )}

            <button
              onClick={handleStart}
              className="mt-auto w-full py-4 px-6 rounded-xl font-medium text-lg transition-transform active:scale-95 shadow-sm"
              style={primaryButtonStyle}
            >
              Start Uploading Room Details
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">Your Space Checklist</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed">Select a room to add measurements and photos.</p>

            <div className="flex flex-col gap-4">
              {rooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => handleRoomClick(room.id)}
                  className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${room.status === 'COMPLETED' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800'}`}>
                      {room.status === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                    </div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 text-base">{room.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {room.status === 'COMPLETED' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50 text-[11px] font-bold tracking-wide uppercase rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50 text-[11px] font-bold tracking-wide uppercase rounded-full">
                        Pending
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedRoom && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 h-full">
            {!isScanning && (
              <button
                onClick={handleBackToRooms}
                className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm mb-6 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Rooms
              </button>
            )}

            <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 tracking-tight mb-8">
              {isScanning ? `Scanning ${selectedRoom.name}` : selectedRoom.name}
            </h2>

            {isScanning ? (
              <RoomScanner 
                primaryColor={primaryColor} 
                onComplete={handleScannerComplete} 
                onCancel={() => setIsScanning(false)} 
              />
            ) : (
              <div className="flex flex-col gap-8 flex-1">
                <section>
                  <h3 className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">1. Room Dimensions</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Length (m)</label>
                      <input
                        type="number"
                        value={length}
                        onChange={e => setLength(e.target.value)}
                        placeholder="e.g., 4.5"
                        className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                        style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Width (m)</label>
                      <input
                        type="number"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                        placeholder="e.g., 3.2"
                        className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                        style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Ceiling Height (m)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      placeholder="e.g., 2.8"
                      className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                      style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                    />
                  </div>
                </section>

                <section className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">2. Room Photos</h3>
                    <button 
                      onClick={() => setIsScanning(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-800 transition-all hover:scale-105 active:scale-95"
                    >
                      <Sparkles className="w-3 h-3" />
                      Guided Scan
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                  {requirements.map((req) => {
                    const isSkipped = skippedFields[req.id];
                    const photos = roomPhotos[req.id] || [];

                    return (
                      <div
                        key={req.id}
                        className={`p-5 border rounded-2xl transition-all duration-300 ${isSkipped
                            ? 'bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-800/60 shadow-none'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="pr-4">
                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{req.title}</h4>
                            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{req.description}</p>
                          </div>
                          {isSkipped && (
                            <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full flex-shrink-0 animate-in zoom-in">
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                          )}
                        </div>

                        {req.isConditional && (
                          <div className="mt-2 mb-4">
                            <label className="inline-flex items-center gap-2.5 cursor-pointer bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                              <input
                                type="checkbox"
                                checked={isSkipped || false}
                                onChange={(e) => setSkippedFields(prev => ({ ...prev, [req.id]: e.target.checked }))}
                                className="w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-900 focus:ring-offset-0"
                                style={{ accentColor: primaryColor }}
                              />
                              <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 select-none">
                                {req.conditionalLabel}
                              </span>
                            </label>
                          </div>
                        )}

                        {!isSkipped && (
                          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex flex-wrap gap-3">
                              {photos.map((photo, idx) => (
                                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-sm animate-in zoom-in-95 group">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={photo.data} alt="Preview" className="w-full h-full object-cover" />
                                  <button
                                    onClick={() => removeRoomPhoto(req.id, idx)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors opacity-100"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}

                              <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 rounded-xl cursor-pointer transition-colors group">
                                <ImagePlus className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-1" />
                                <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Add</span>
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handlePhotoUpload(req.id, e)}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
            )}

            {!isScanning && (
              <div className="pt-6 mt-auto border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-950 sticky bottom-0 z-10 pb-6">
                <button
                  onClick={handleSaveRoom}
                  disabled={isSaving}
                  className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={primaryButtonStyle}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving Details...
                    </>
                  ) : (
                    'Save Room Details'
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
