import React from 'react';
import { Award, CheckCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors & Verified Milestones</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 gold-text-glow">
            Achievements
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm text-slate-300 font-light">
            Genuine student milestones, workshop certificates, and active pursuits. Upcoming events are clearly identified as preparation placeholders.
          </p>
        </div>

        {/* Grid of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((item) => {
            const isPlaceholder = item.status.includes('Placeholder');
            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isPlaceholder
                    ? 'bg-zinc-950/60 border-slate-800/80'
                    : 'bg-zinc-900/60 border-amber-500/30 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/5'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-black border border-slate-800 text-amber-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isPlaceholder
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-slate-100 mb-1">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mb-3">
                  {item.institution} • {item.year}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
