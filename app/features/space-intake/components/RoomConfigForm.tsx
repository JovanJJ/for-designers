'use client';

import React, { useState } from 'react';
import { useIntakeStore, RoomMetadata } from '../store/useIntakeStore';
import { ChevronRight, Ruler, Home, Box } from 'lucide-react';

export const RoomConfigForm: React.FC = () => {
  const { setRoomMetadata } = useIntakeStore();
  const [formData, setFormData] = useState<RoomMetadata>({
    height: 260,
    geometryType: 'STANDARD',
    hasAngledWalls: false,
    hasCurvedWalls: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRoomMetadata(formData);
  };

  const setGeometryType = (type: 'STANDARD' | 'CUSTOM') => {
    if (type === 'STANDARD') {
      setFormData({
        ...formData,
        geometryType: 'STANDARD',
        hasAngledWalls: false,
        hasCurvedWalls: false,
      });
    } else {
      setFormData({ ...formData, geometryType: 'CUSTOM' });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-light text-zinc-900">Konfiguracija Sobe</h1>
        <p className="text-zinc-500 text-sm">Unesite osnovne parametre prostorije pre početka skeniranja.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
              <Ruler className="w-4 h-4" /> Visina plafona (cm)
            </span>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all"
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setGeometryType('STANDARD')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.geometryType === 'STANDARD' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Standardna</span>
            </button>
            <button
              type="button"
              onClick={() => setGeometryType('CUSTOM')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.geometryType === 'CUSTOM' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'
              }`}
            >
              <Box className="w-6 h-6" />
              <span className="text-xs font-medium">Specifična</span>
            </button>
          </div>

          {formData.geometryType === 'CUSTOM' && (
            <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-all">
                <input
                  type="checkbox"
                  checked={formData.hasAngledWalls}
                  onChange={(e) => setFormData({ ...formData, hasAngledWalls: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="text-sm text-zinc-600">Ima kose zidove / potkrovlje</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-all">
                <input
                  type="checkbox"
                  checked={formData.hasCurvedWalls}
                  onChange={(e) => setFormData({ ...formData, hasCurvedWalls: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="text-sm text-zinc-600">Ima zaobljene zidove</span>
              </label>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-zinc-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98]"
        >
          Nastavi na skeniranje <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
