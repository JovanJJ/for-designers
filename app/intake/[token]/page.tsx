import { getIntakeDataByToken } from '@/lib/actions';
import { ClientMobileIntake } from '@/app/features/intake/ClientMobileIntake';
import { Link2Off } from 'lucide-react';

export default async function IntakePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const data = await getIntakeDataByToken(token);

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-16 h-16 bg-zinc-100 border border-zinc-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Link2Off className="w-8 h-8 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-serif text-zinc-900 tracking-tight mb-3">Invalid Link</h1>
        <p className="text-zinc-500 text-center max-w-sm leading-relaxed text-sm">
          This intake link has expired or is incorrect. Please contact your designer for a new link.
        </p>
      </div>
    );
  }

  const { project, rooms } = data;

  const premiumBranding = project.isPremium && (project.logoUrl || project.brandColor) ? {
    logo: project.logoUrl || '',
    color: project.brandColor || '#09090b',
  } : null;

  const initialRooms = rooms.map((room) => ({
    id: room.id,
    name: room.roomType ? room.roomType.replace(/_/g, ' ') : 'Unknown Room',
    roomType: room.roomType,
    status: room.status as 'PENDING' | 'COMPLETED',
  }));

  return (
    <ClientMobileIntake
      studioName={project.studioName}
      projectTitle={project.name}
      designerNote={project.clientNotes}
      premiumBranding={premiumBranding}
      initialRooms={initialRooms}
    />
  );
}
