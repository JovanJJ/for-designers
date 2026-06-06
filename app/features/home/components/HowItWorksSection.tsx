import React from 'react';
import { Link2, Smartphone, LayoutGrid } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section className="bg-white dark:bg-black py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28 space-y-6">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800">
            The Solution
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight max-w-3xl">
            Streamlined onboarding in 3 simple steps
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Transform how you gather project requirements. No software installation needed for you or your client.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 relative z-10">
            
            {/* Step 1 */}
            <div className="flex flex-col items-start text-left relative group">
              <div className="absolute -top-12 -left-6 text-9xl font-bold text-zinc-50/50 dark:text-zinc-900/50 -z-10 transition-transform group-hover:scale-105 duration-500 pointer-events-none select-none">
                01
              </div>
              <div className="h-24 w-24 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center mb-8 mx-auto lg:mx-0 relative">
                <Link2 className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 w-full lg:w-auto text-center lg:text-left">
                1. Send your custom link
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-center lg:text-left">
                Copy your unique studio link and send it to your client via email, WhatsApp, or embed it directly on your website before the project kick-off.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start text-left relative group">
              <div className="absolute -top-12 -left-6 text-9xl font-bold text-zinc-50/50 dark:text-zinc-900/50 -z-10 transition-transform group-hover:scale-105 duration-500 pointer-events-none select-none">
                02
              </div>
              <div className="h-24 w-24 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center mb-8 mx-auto lg:mx-0 relative">
                <Smartphone className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 w-full lg:w-auto text-center lg:text-left">
                2. Client uploads room details
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-center lg:text-left">
                Your client opens the link on their mobile phone. Our guided assistant walks them through entering dimensions and snapping clear photos room-by-room.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start text-left relative group">
              <div className="absolute -top-12 -left-6 text-9xl font-bold text-zinc-50/50 dark:text-zinc-900/50 -z-10 transition-transform group-hover:scale-105 duration-500 pointer-events-none select-none">
                03
              </div>
              <div className="h-24 w-24 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center mb-8 mx-auto lg:mx-0 relative">
                <LayoutGrid className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 w-full lg:w-auto text-center lg:text-left">
                3. Everything neatly organized
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-center lg:text-left">
                Log into your dashboard and instantly download a beautiful, structured Space Report. Dimensions, photos, and notes are perfectly sorted by room.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
