import React from 'react';
import { ArrowRight, Play, LayoutDashboard, Image as ImageIcon, Ruler, Clock, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Text Content) */}
          <div className="flex flex-col justify-center items-start space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-zinc-200/50 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300 ring-1 ring-inset ring-zinc-300/50 dark:ring-zinc-700/50">
              For Interior Designers & Decorators
            </div>
            
            {/* Headings */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
                Onboard interior design clients <span className="text-zinc-500 dark:text-zinc-400">5x faster.</span><br />
                Without the WhatsApp chaos.
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                A single link for your clients to upload accurate room dimensions, layout photos, and style requirements. Everything arrives automatically organized in your dashboard.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <button className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                View Live Demo (Free)
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch 60s Video
              </button>
            </div>
            
            {/* Micro-copy */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>No credit card required</span>
              <span className="mx-1">•</span>
              <span>Setup in 2 minutes</span>
            </div>
          </div>

          {/* Right Column (Visual Preview Mockup) */}
          <div className="flex items-center justify-center w-full relative lg:ml-4 xl:ml-8">
            {/* Decorative background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-full blur-3xl opacity-50 transform -translate-y-12 translate-x-12"></div>
            
            {/* Dashboard Mockup Container */}
            <div className="w-full max-w-[600px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden relative z-10 flex flex-col">
              
              {/* Mockup Header/Browser Bar */}
              <div className="h-12 bg-zinc-50/80 dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center px-4 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                </div>
                <div className="mx-auto flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-16 sm:px-32 py-1.5 shadow-sm">
                  <span className="text-xs text-zinc-400 font-medium flex items-center">
                    <LayoutDashboard className="h-3 w-3 mr-1.5" />
                    designos.app/projects
                  </span>
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/50 flex-1">
                
                {/* Project Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Project: Downtown Apartment</h3>
                    <p className="text-sm text-zinc-500 mt-0.5">Client: Sarah Jenkins • Due in 12 days</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-sm flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">SJ</span>
                  </div>
                </div>

                {/* Structured Tabs/Cards */}
                <div className="space-y-4">
                  
                  {/* Card 1 - Completed */}
                  <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200/60 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2.5"></div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Living Room</h4>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200/50 dark:border-green-500/20">Ready for review</span>
                    </div>
                    
                    <div className="flex space-x-6">
                      <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                        <ImageIcon className="h-4 w-4 mr-1.5 text-zinc-400" />
                        3 photos
                      </div>
                      <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                        <Ruler className="h-4 w-4 mr-1.5 text-zinc-400" />
                        Dimensions: 5m x 4m
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - Pending */}
                  <div className="bg-white/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center opacity-80">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mr-2.5"></div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Kitchen</h4>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20">Pending upload</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-zinc-500 mt-2">
                      <Clock className="h-4 w-4 mr-1.5" />
                      Client notified 2 hours ago
                    </div>
                  </div>

                  {/* Empty State / Add New */}
                  <div className="p-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">+ Add Room</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
