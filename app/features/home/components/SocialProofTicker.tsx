import React from 'react';

const quotes = [
  { text: "Viber chats are where my client designs go to die.", author: "Interior Architect" },
  { text: "Spent 3 hours sorting unlabelled photos this morning.", author: "Freelance Decorator" },
  { text: "Clients always forget to measure the ceiling height.", author: "Studio Owner" },
  { text: "Chasing clients for measurements is my least favorite part of the job.", author: "E-Designer" },
  { text: "I have 40 napkin sketches saved on my phone right now.", author: "Residential Designer" },
];

export function SocialProofTicker() {
  return (
    <section className="bg-white dark:bg-black py-12 overflow-hidden relative border-y border-zinc-100 dark:border-zinc-900">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Fading Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track Container */}
      <div className="flex items-center w-max animate-marquee">
        {/* We map the array twice to create a seamless infinite loop */}
        {[...quotes, ...quotes].map((quote, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 px-6 py-3.5 mx-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-full shrink-0 shadow-sm transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">"{quote.text}"</span>
            <span className="text-zinc-400 dark:text-zinc-500 text-sm">— {quote.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
