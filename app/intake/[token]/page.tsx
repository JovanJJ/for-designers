import React from 'react';
import { notFound } from 'next/navigation';
import { IntakeWizard } from '@/app/features/space-intake/components/IntakeWizard';

// Mock database fetch
async function getProjectByToken(token: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (token === 'error') return null;

  return {
    id: 'proj_123',
    name: 'Luksuzan Apartman na Vračaru',
    designer: {
      name: 'Studio Oaza',
      logo: '/logo.png',
      brandColor: '#18181b', // zinc-900
    },
    rooms: [
      { id: 'room_1', name: 'Dnevna Soba' },
      { id: 'room_2', name: 'Spavaća Soba' },
    ]
  };
}

export default async function IntakePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const project = await getProjectByToken(token);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Designer Branding Bar */}
      <nav className="bg-white border-b border-zinc-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">O</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                {project.designer.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                Client Portal
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <p className="text-sm font-medium text-zinc-600">
              Projekat: <span className="text-zinc-900">{project.name}</span>
            </p>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        <IntakeWizard />
      </div>

      {/* Footer Branding */}
      <footer className="py-12 text-center">
        <p className="text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-semibold">
          Powered by OH-YEAH Designer Tools
        </p>
      </footer>
    </div>
  );
}
