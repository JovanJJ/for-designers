import React from 'react';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SocialProofTicker } from './components/SocialProofTicker';
import { HowItWorksSection } from './components/HowItWorksSection';

export function HomeView() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroSection />
      <ProblemSection />
      <SocialProofTicker />
      <HowItWorksSection />
    </main>
  );
}
