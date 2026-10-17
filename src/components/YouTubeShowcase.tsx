import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, X, Film, Clock, Sparkles, Video, Flame } from 'lucide-react';
import { YOUTUBE_CHANNEL_ITEMS, PORTFOLIO_INFO, YouTubeItem } from '../data/portfolioData';

export const YouTubeShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Video' | 'Shorts'>('All');
  const [activeVideo, setActiveVideo] = useState<YouTubeItem | null>(null);

  const filteredItems =
    filter === 'All' ? YOUTUBE_CHANNEL_ITEMS : YOUTUBE_CHANNEL_ITEMS.filter((item) => item.type === filter);

  return (
    <section id="youtube" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Official Channel Showcase</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-400 to-amber-400 gold-text-glow">
            S&S WonderVerse
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm sm:text-base text-slate-300 font-light">
            Explore videos and viral shorts from Shreyas’s official YouTube channel — featuring 3D pen creative gadgets, travel vlogs, riverfront tours, sports, and highlights.
          </p>
        </div>

        {/* Channel Banner Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-black to-zinc-900 border border-red-500/30 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-black">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-red-500 to-amber-400 flex-shrink-0">
              <img
                src="/shreyas-original-portrait.png"
                alt="Shreyas Chaturvedi Channel Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full border-2 border-black"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-xl font-bold text-slate-100">
                  S&S WonderVerse
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-600/30 text-red-300 border border-red-500/40">
                  Verified Creator
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Explore and Have Fun! • Travel, Tech & Creativity
              </p>
              <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                @S_S-Wondersverse • 159+ Videos & Shorts
              </div>
            </div>
          </div>

          <a
            href={PORTFOLIO_INFO.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Subscribe on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Filter Buttons: All, Videos, Shorts */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['All', 'Video', 'Shorts'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2 rounded-full text-xs uppercase font-medium tracking-wider transition-all ${
                filter === t
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-md shadow-red-500/30 scale-105'
                  : 'bg-zinc-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {t === 'All' ? 'All Content' : t === 'Video' ? 'Full Videos' : '🔥 Shorts Highlights'}
            </button>
          ))}
        </div>

        {/* Videos and Shorts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideo(item)}
              className="group relative rounded-2xl overflow-hidden bg-black border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg shadow-black flex flex-col justify-between"
            >
              {/* Thumbnail with Shreyas's actual picture */}
              <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Big Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-red-500 transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-slate-800 flex items-center gap-1.5">
                  {item.type === 'Shorts' ? <Flame className="w-3 h-3 text-red-400" /> : <Video className="w-3 h-3 text-cyan-400" />}
                  <span>{item.type}</span>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 font-mono text-[10px] text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-5 bg-zinc-950 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    {item.category} • {item.views}
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="font-mono text-slate-500">@S_S-Wondersverse</span>
                  <span className="text-red-400 font-semibold group-hover:underline flex items-center gap-1">
                    <span>Watch Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-3xl bg-zinc-950 border border-red-500/40 p-6 sm:p-8 shadow-2xl shadow-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {activeVideo.category} • {activeVideo.type}
                </span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mb-4">
                {activeVideo.title}
              </h3>

              {/* Video Screen Preview with Photo */}
              <div className="relative aspect-video rounded-2xl bg-black border border-slate-800 overflow-hidden mb-6 flex items-center justify-center">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mb-3 shadow-2xl">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                  <div className="text-sm font-cinzel text-slate-100 font-bold max-w-md text-center">
                    {activeVideo.title}
                  </div>
                  <div className="text-xs text-amber-300 font-mono mt-1">
                    S&S WonderVerse Official Release
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                {activeVideo.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <a
                  href={PORTFOLIO_INFO.youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all w-full sm:w-auto justify-center"
                >
                  <Youtube className="w-4 h-4 fill-white" />
                  <span>Open Video on YouTube Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 w-full sm:w-auto"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
