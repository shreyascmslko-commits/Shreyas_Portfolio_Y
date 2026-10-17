import React, { useState } from 'react';
import { Code, Cpu, Brain, Music, Database, ExternalLink, Github, Layers, Sparkles, AlertCircle, Link as LinkIcon, Check } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

export const InterestsAndProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const categories = [
    'All',
    'Robotics & Hardware',
    'Web Development',
    'AI & Machine Learning',
    'Programming',
    'Data',
  ];

  const filteredProjects =
    activeTab === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === activeTab);

  const handleCopyPhoto = (src: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const fullUrl = window.location.origin + src;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(src);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Innovations & Technical Works</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 gold-text-glow">
            Interests & Projects
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 mb-6" />

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Explore active laboratory experiments, software architectures, robotics builds, and creative projects. Each card features Shreyas’s official photographs and project highlights.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-md shadow-amber-500/30 scale-105'
                  : 'bg-zinc-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isPlaceholder = project.status.includes('Placeholder');
            const isInProgress = project.status === 'In Progress';
            const isCompleted = project.status === 'Completed';

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-slate-800/80 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/90 cinematic-card-glow"
              >
                {/* Project Thumbnail Image with Shreyas's actual picture */}
                <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden border-b border-slate-800/80">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Status Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold border backdrop-blur-md ${
                        isCompleted
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                          : isInProgress
                          ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                          : 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Copy Photo Link button */}
                  <button
                    onClick={(e) => handleCopyPhoto(project.image, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/80 hover:bg-black border border-slate-700 text-slate-300 hover:text-amber-400 text-[10px] font-mono flex items-center gap-1 backdrop-blur-md"
                    title="Copy Photo Link"
                  >
                    {copiedLink === project.image ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <LinkIcon className="w-3 h-3 text-cyan-400" />
                    )}
                  </button>

                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2.5">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Highlights Bullet List */}
                    <div className="space-y-1.5 mb-5 bg-black/40 p-3 rounded-lg border border-slate-800/60">
                      <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider block mb-1">
                        Key Highlights:
                      </span>
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <span className="text-amber-400 text-sm leading-none">•</span>
                          <span className="font-light">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-slate-400 border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Action Links */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono italic">
                          {isPlaceholder ? 'Placeholder Specification' : 'Lab Prototype'}
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-950 border border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs uppercase font-mono text-cyan-400">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
                >
                  Close [ESC]
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-5 border border-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                {selectedProject.description}
              </p>

              <div className="mb-6 bg-black/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs uppercase font-mono text-amber-400 mb-2">Technical Highlights:</h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-full text-xs uppercase tracking-wider bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
