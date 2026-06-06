import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProjectGrid } from './components/ProjectGrid';

export default function DashboardView() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen bg-zinc-50/50">
            <Sidebar />
            <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <ProjectGrid />
                </main>
            </div>
        </div>
    );
}
