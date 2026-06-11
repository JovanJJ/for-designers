'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useIntakeStore, Marker, MarkerType } from '../store/useIntakeStore';
import { X, Save, Ruler, MapPin, Trash2, Settings2, ArrowDown, ArrowUp, Info, Triangle } from 'lucide-react';

interface WallImageMapperProps {
  imageUrl: string;
}

export const WallImageMapper: React.FC<WallImageMapperProps> = ({ imageUrl }) => {
  const { 
    roomMetadata,
    currentWallMarkers, 
    addMarker, 
    updateMarker, 
    removeMarker,
    currentWallIsCurved,
    currentWallIsFloorPlanAngled,
    currentWallHasSlopedCeiling,
    currentWallParapetHeight,
    currentWallCeilingSlopeLength,
    currentWallCurveChord,
    currentWallCurveDepth,
    currentWallCurveDirection,
    currentWallHasCustomHeight,
    currentWallCustomHeight,
    currentWallLength,
    setCurrentWallLength,
    updateWallProperties,
    clearCurrentWallImage 
  } = useIntakeStore();

  const [activeMarker, setActiveMarker] = useState<Partial<Marker> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction Handlers
  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setActiveMarker({
      position_x_pct: boundedX,
      position_y_pct: boundedY,
      type: 'socket',
      width: 0,
      height: 0,
      distance_from_left: 0,
      distance_from_floor: 0,
    });
  }, []);

  const onImageClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.marker-ui')) return;
    handleInteraction(e.clientX, e.clientY);
  };

  const onMarkerClick = (marker: Marker) => {
    setActiveMarker({ ...marker });
  };

  const handleSaveMarker = () => {
    if (!activeMarker) return;

    if (activeMarker.id) {
      updateMarker(activeMarker.id, activeMarker as Marker);
    } else {
      const newMarker: Marker = {
        ...(activeMarker as Omit<Marker, 'id'>),
        id: crypto.randomUUID(),
      };
      addMarker(newMarker);
    }
    setActiveMarker(null);
  };

  const handleDeleteMarker = () => {
    if (activeMarker?.id) {
      removeMarker(activeMarker.id);
      setActiveMarker(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-32">
      
      {/* Main Wall Dimensions Section */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 bg-zinc-900 flex items-center gap-2">
          <Ruler className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Glavne dimenzije zida</span>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Ukupna dužina zida (cm)</label>
            <div className="relative">
              <input 
                type="number"
                value={currentWallLength || ''}
                onChange={(e) => setCurrentWallLength(e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="Unesite dužinu..."
                className="w-full px-5 py-4 rounded-xl border-2 border-zinc-200 focus:border-zinc-900 focus:outline-none transition-all text-lg font-semibold text-zinc-900 pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">cm</span>
            </div>
            <p className="text-[10px] text-zinc-400 italic">
              * Obavezan podatak za generisanje 2D/3D skice.
            </p>
          </div>
        </div>
      </div>
      
      {/* Wall Properties Panel (Only for CUSTOM geometry) */}
      {roomMetadata?.geometryType === 'CUSTOM' && (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Specifična Svojstva Zida</span>
            </div>
            <button 
              onClick={clearCurrentWallImage}
              className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest"
            >
              Promeni sliku
            </button>
          </div>
          
          <div className="p-5 space-y-6">
            <div className="flex flex-col gap-4">
              {/* Floor Plan Angle Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-10 h-6 rounded-full transition-colors relative ${currentWallIsFloorPlanAngled ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${currentWallIsFloorPlanAngled ? 'left-5' : 'left-1'}`} />
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={currentWallIsFloorPlanAngled} 
                  onChange={(e) => updateWallProperties({ currentWallIsFloorPlanAngled: e.target.checked })} 
                />
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">Zid je pod uglom u osnovi</span>
              </label>

              {/* Sloped Ceiling Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-10 h-6 rounded-full transition-colors relative ${currentWallHasSlopedCeiling ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${currentWallHasSlopedCeiling ? 'left-5' : 'left-1'}`} />
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={currentWallHasSlopedCeiling} 
                  onChange={(e) => updateWallProperties({ currentWallHasSlopedCeiling: e.target.checked })} 
                />
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">Zid ima krovnu kosinu (Potkrovlje)</span>
              </label>

              {/* Custom Height Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-10 h-6 rounded-full transition-colors relative ${currentWallHasCustomHeight ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${currentWallHasCustomHeight ? 'left-5' : 'left-1'}`} />
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={currentWallHasCustomHeight} 
                  onChange={(e) => updateWallProperties({ currentWallHasCustomHeight: e.target.checked })} 
                />
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">Ovaj zid ima drugačiju visinu (denivelacija/galerija)</span>
              </label>

              {/* Curved Wall Checkbox (Moved from old logic) */}
              {roomMetadata?.hasCurvedWalls && (
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-6 rounded-full transition-colors relative ${currentWallIsCurved ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${currentWallIsCurved ? 'left-5' : 'left-1'}`} />
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={currentWallIsCurved} 
                    onChange={(e) => updateWallProperties({ currentWallIsCurved: e.target.checked })} 
                  />
                  <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">Zid je zaobljen</span>
                </label>
              )}
            </div>

            {/* Sloped Ceiling Inputs */}
            {currentWallHasSlopedCeiling && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Visina nadzitka (cm)</label>
                  <input 
                    type="number"
                    value={currentWallParapetHeight || ''}
                    onChange={(e) => updateWallProperties({ currentWallParapetHeight: parseFloat(e.target.value) || null })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-all text-sm"
                    placeholder="0"
                  />
                  <p className="text-[9px] text-zinc-500 leading-tight">Meri se vertikalno od poda do linije gde zid počinje da se lomi.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Dužina krovne kosine (cm)</label>
                  <input 
                    type="number"
                    value={currentWallCeilingSlopeLength || ''}
                    onChange={(e) => updateWallProperties({ currentWallCeilingSlopeLength: parseFloat(e.target.value) || null })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-all text-sm"
                    placeholder="0"
                  />
                  <p className="text-[9px] text-zinc-500 leading-tight">Meri se prateći samu kosinu krova, od prevoja nagore do ravnog plafona.</p>
                </div>
              </div>
            )}

            {/* Custom Height Input */}
            {currentWallHasCustomHeight && (
              <div className="pt-4 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2 max-w-xs">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Specifična visina ovog zida (cm)</label>
                  <input 
                    type="number"
                    value={currentWallCustomHeight || ''}
                    onChange={(e) => updateWallProperties({ currentWallCustomHeight: parseFloat(e.target.value) || null })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-all text-sm"
                    placeholder="Unesite visinu..."
                  />
                </div>
              </div>
            )}

            {/* Curved Wall Inputs */}
            {currentWallIsCurved && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Prečnik luka (cm)</label>
                  <input 
                    type="number"
                    value={currentWallCurveChord || ''}
                    onChange={(e) => updateWallProperties({ currentWallCurveChord: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Dubina luka (cm)</label>
                  <input 
                    type="number"
                    value={currentWallCurveDepth || ''}
                    onChange={(e) => updateWallProperties({ currentWallCurveDepth: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Smer zakrivljenja</label>
                  <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg">
                    <button 
                      onClick={() => updateWallProperties({ currentWallCurveDirection: 'outward' })}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${currentWallCurveDirection === 'outward' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      <ArrowUp className="w-3 h-3" /> Spolja
                    </button>
                    <button 
                      onClick={() => updateWallProperties({ currentWallCurveDirection: 'inward' })}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${currentWallCurveDirection === 'inward' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      <ArrowDown className="w-3 h-3" /> Unutra
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className="aspect-[4/3] relative w-full bg-zinc-100 rounded-2xl overflow-hidden cursor-crosshair touch-none select-none shadow-md border border-zinc-200"
        onClick={onImageClick}
      >
        <img 
          src={imageUrl} 
          alt="Wall to map" 
          className="object-contain w-full h-full pointer-events-none"
        />

        {/* Render Confirmed Markers */}
        {currentWallMarkers.map((marker, index) => (
          <button
            key={marker.id}
            onClick={() => onMarkerClick(marker)}
            className="marker-ui absolute w-8 h-8 bg-zinc-900 border-2 border-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 group z-20"
            style={{
              left: `${marker.position_x_pct}%`,
              top: `${marker.position_y_pct}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="text-xs text-white font-bold">{index + 1}</span>
            <div className="absolute -bottom-8 bg-zinc-900/90 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-tighter">
              {marker.type}
            </div>
          </button>
        ))}

        {/* Render Pending Marker */}
        {activeMarker && !activeMarker.id && (
          <div
            className="absolute w-8 h-8 bg-amber-500 border-2 border-white rounded-full shadow-2xl z-30 pointer-events-none"
            style={{
              left: `${activeMarker.position_x_pct}%`,
              top: `${activeMarker.position_y_pct}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Modal / Side Panel for Marker Details */}
      {activeMarker && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-zinc-900/20 backdrop-blur-md animate-in fade-in duration-300">
          <div className="marker-modal w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
            <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg">
                  <Ruler className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 leading-tight">
                    {activeMarker.id ? `Izmena Elementa #${currentWallMarkers.findIndex(m => m.id === activeMarker.id) + 1}` : 'Novi Element'}
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Unesite dimenzije i tip</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveMarker(null)}
                className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Type Selection */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.15em]">Kategorija objekta</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['socket', 'switch', 'radiator', 'window', 'door', 'other'] as MarkerType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveMarker({ ...activeMarker, type: t })}
                      className={`py-3 px-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${activeMarker.type === t ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-200'}`}
                    >
                      {t === 'socket' ? 'Utičnica' : t === 'switch' ? 'Prekidač' : t === 'radiator' ? 'Radijator' : t === 'window' ? 'Prozor' : t === 'door' ? 'Vrata' : 'Ostalo'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Dimensions */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Širina (cm)</label>
                  <input 
                    type="number"
                    value={activeMarker.width || ''}
                    onChange={(e) => setActiveMarker({ ...activeMarker, width: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Visina (cm)</label>
                  <input 
                    type="number"
                    value={activeMarker.height || ''}
                    onChange={(e) => setActiveMarker({ ...activeMarker, height: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Conditional Depth for Radiator */}
              {activeMarker.type === 'radiator' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Dubina od zida (cm)</label>
                  <input 
                    type="number"
                    value={activeMarker.depth || ''}
                    onChange={(e) => setActiveMarker({ ...activeMarker, depth: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm font-medium"
                  />
                </div>
              )}

              {/* Position Details */}
              <div className="pt-6 border-t border-zinc-100 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Odstojanja za precizno pozicioniranje</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Od levog zida (cm)</label>
                    <input 
                      type="number"
                      value={activeMarker.distance_from_left || ''}
                      onChange={(e) => setActiveMarker({ ...activeMarker, distance_from_left: parseFloat(e.target.value) })}
                      placeholder="0"
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Od poda (cm)</label>
                    <input 
                      type="number"
                      value={activeMarker.distance_from_floor || ''}
                      onChange={(e) => setActiveMarker({ ...activeMarker, distance_from_floor: parseFloat(e.target.value) })}
                      placeholder="0"
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between gap-4">
              {activeMarker.id && (
                <button 
                  onClick={handleDeleteMarker}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-[11px] uppercase tracking-widest transition-colors px-2"
                >
                  <Trash2 className="w-4 h-4" /> Obriši
                </button>
              )}
              <div className="flex-1 flex gap-3 justify-end">
                <button 
                  onClick={() => setActiveMarker(null)}
                  className="px-8 py-4 rounded-2xl border border-zinc-200 bg-white text-zinc-600 font-bold text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all active:scale-[0.98]"
                >
                  Otkaži
                </button>
                <button 
                  onClick={handleSaveMarker}
                  className="px-10 py-4 rounded-2xl bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98] flex items-center gap-2 shadow-xl shadow-zinc-200"
                >
                  <Save className="w-4 h-4 text-zinc-400" /> Sačuvaj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-slate-500 text-center italic mt-4">
        Kliknite na sliku da dodate element ili na postojeći broj da ga izmenite.
      </p>
    </div>
  );
};
