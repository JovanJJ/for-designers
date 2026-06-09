import React from 'react';
import { Sidebar } from '../dashboard/components/Sidebar';
import { ProjectHeader } from './components/ProjectHeader';
import { ClientArtifacts } from './components/ClientArtifacts';
import { AIInsights } from './components/AIInsights';

export default function ProjectDetailView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-6 md:p-8 lg:p-12">
            
            {/* Header Section */}
            <ProjectHeader projectName="Client Space Assessment & AI Insights" />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[45%_1fr] gap-12 items-start">
              
              {/* LEFT COLUMN: Client Artifacts & Technical Specs */}
              <div className="flex flex-col gap-12">
                <ClientArtifacts />
              </div>

              {/* RIGHT COLUMN: Interactive AI Space Report & Guardrails */}
              <div className="sticky top-12">
                <AIInsights />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
