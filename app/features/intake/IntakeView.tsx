import React from 'react';
import { ClientMobileIntake } from './ClientMobileIntake';

export function IntakeView() {
  // Mock data for the view
  const mockRooms = [
    { id: '1', name: 'Living Room', status: 'PENDING' as const },
    { id: '2', name: 'Kitchen', status: 'COMPLETED' as const },
    { id: '3', name: 'Master Bedroom', status: 'PENDING' as const },
  ];

  return (
    <ClientMobileIntake 
      studioName="MJ Design Studio"
      projectTitle="Flat 74 Complete Renovation"
      designerNote="Hi Milena! Please make sure to get a clear shot of the radiator pipes in the living room, and the window height in the kitchen. Thanks!"
      premiumBranding={null} // Try setting this to { logo: '...', color: '#6366f1' } to see premium mode
      initialRooms={mockRooms}
    />
  );
}
