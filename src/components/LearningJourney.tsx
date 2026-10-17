import React from 'react';
import { Milestone as MilestoneIcon, BookOpen, Clock, Compass, CheckCircle } from 'lucide-react';
import { LEARNING_JOURNEY } from '../data/portfolioData';

export const LearningJourney: React.FC = () => {
  return (
    <section id="journey" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Evolution of Knowledge</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cyan-400 to-amber-400 gold-text-glow">
            Learning Journey
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm text-slate-300 font-light">
            A chronological roadmap illustrating how foundational logic and mathematics paved the way for programming, physical robotics, and creative audio engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {LEARNING_JOURNEY.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300 group-hover:bg-zinc-900/90 group-hover:shadow-xl group-hover:shadow-black">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills Learned Badges */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
                  {item.skillsLearned.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-black/60 border border-slate-800 text-slate-300"
                    >
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
