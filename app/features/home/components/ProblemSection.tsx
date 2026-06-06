import React from 'react';
import { MessageSquare, Ruler, Clock } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800">
            The Current Reality
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight max-w-3xl">
            The onboarding mess you deal with every day
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Chasing clients for basic details eats up hours of your billable time before you even start designing.
          </p>
        </div>

        {/* Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1 */}
          <div className="flex flex-col justify-between items-start h-full p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  WhatsApp & Viber Chaos
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Inspiration pictures arrive on chat, client preferences are buried in voice notes, and contract details are lost in long email threads.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between items-start h-full p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Ruler className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Blurry Hand-Drawn Dimensions
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Clients sketch room layouts on napkins, snap a blurry photo, and forget to measure crucial details like ceiling heights or window placements.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between items-start h-full p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Clock className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Hours Spent Organizing
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  You waste your energy downloading 40 unlabelled phone photos, sorting them into project folders, and manually grouping them by room.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
