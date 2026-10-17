import React, { useState } from 'react';
import { Code, Cpu, Brain, Music, Database, Sparkles, Compass, Lightbulb, Link as LinkIcon, Check, Download } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const pillars = [
    {
      icon: Code,
      title: 'Programming & Web',
      description: 'Building elegant, responsive, and performant web interfaces and algorithmic solutions.',
      color: 'from-amber-400 to-yellow-600',
      borderColor: 'border-amber-500/30',
      badge: 'Core Skill',
    },
    {
      icon: Cpu,
      title: 'Robotics & Electronics',
      description: 'Hands-on experimentation with microcontrollers, sensor arrays, motor drivers, and physical circuits.',
      color: 'from-cyan-400 to-blue-600',
      borderColor: 'border-cyan-500/30',
      badge: 'Hardware',
    },
    {
      icon: Brain,
      title: 'AI & Logical Thinking',
      description: 'Exploring machine learning concepts, classification networks, computer vision, and structured logic.',
      color: 'from-pink-400 to-rose-600',
      borderColor: 'border-pink-500/30',
      badge: 'Innovation',
    },
    {
      icon: Database,
      title: 'Data Handling',
      description: 'Structuring, parsing, analyzing, and visualizing datasets to discover meaningful patterns.',
      color: 'from-emerald-400 to-teal-600',
      borderColor: 'border-emerald-500/30',
      badge: 'Analytics',
    },
    {
      icon: Music,
      title: 'Music & Creativity',
      description: 'Exploring acoustic harmony, ghazals, semi-classical rhythms, and creative audio production.',
      color: 'from-purple-400 to-indigo-600',
      borderColor: 'border-purple-500/30',
      badge: 'Creative Passion',
    },
    {
      icon: Lightbulb,
      title: 'Creative Problem Solving',
      description: 'Approaching challenges with curiosity, iterative prototyping, and multidisciplinary intuition.',
      color: 'from-yellow-300 to-amber-500',
      borderColor: 'border-yellow-500/30',
      badge: 'Philosophy',
    },
  ];

  const handleCopyLink = (url: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Discover The Student & Creator</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 gold-text-glow">
            About Shreyas
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 mb-6" />

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            I am a student passionate about technology, science, and the arts. From writing clean code and designing algorithms to soldering sensor circuits and synthesizing musical frequencies, I enjoy creating meaningful prototypes that blend analytical logic with artistic expression.
          </p>
        </div>

        {/* Dual Photographs & Narrative Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Shreyas's actual uploaded photographs */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-md p-1 rounded-2xl bg-gradient-to-b from-amber-500/40 via-pink-500/30 to-cyan-500/40 shadow-xl shadow-black/80">
              <div className="bg-black/95 rounded-2xl p-5 relative overflow-hidden">
                {/* Main Authentic Photograph */}
                <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-4 aspect-[4/3] bg-zinc-900 group">
                  <img
                    src="/shreyas-original-portrait.png"
                    alt="Shreyas Chaturvedi - Student Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-slate-700/80 text-[10px] text-amber-300 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Authentic Student Portrait</span>
                  </div>
                </div>

                {/* Secondary Inset Portrait: The Cinematic Dhurandhar */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-slate-800/80 mb-4">
                  <div className="w-14 h-18 rounded-lg overflow-hidden border border-amber-500/50 flex-shrink-0">
                    <img
                      src="/shreyas-cinematic-portrait.png"
                      alt="The Shreyas Dhurandhar Concept"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-cinzel font-bold text-amber-300 truncate">
                      The Cinematic Dhurandhar
                    </div>
                    <div className="text-[11px] text-slate-400 font-light truncate">
                      Atmospheric leather jacket concept
                    </div>
                    <button
                      onClick={() => handleCopyLink('/shreyas-cinematic-portrait.png')}
                      className="mt-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedLink === '/shreyas-cinematic-portrait.png' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-3 h-3" />
                          <span>Copy Photo Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Current Status</span>
                    <span className="font-semibold text-amber-300">{PORTFOLIO_INFO.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Primary Focus</span>
                    <span className="font-semibold text-cyan-300">Robotics, AI & Web Code</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">YouTube Channel</span>
                    <a
                      href={PORTFOLIO_INFO.youtubeChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-rose-400 hover:underline truncate max-w-[180px]"
                    >
                      @S_S-Wondersverse
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars of Interest */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl bg-zinc-900/50 border ${item.borderColor} backdrop-blur-sm transition-all duration-300 hover:bg-zinc-900/90 hover:scale-[1.02] hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-black border border-slate-800 text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-slate-100 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Domains Cloud */}
        <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-slate-900/40 to-cyan-500/5 text-center">
          <h4 className="font-cinzel text-sm uppercase tracking-widest text-amber-400 font-semibold mb-4">
            Active Study & Experimentation Fields
          </h4>
          <div className="flex flex-wrap justify-center gap-2.5">
            {PORTFOLIO_INFO.domains.map((domain, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-black/60 border border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
              >
                #{domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
