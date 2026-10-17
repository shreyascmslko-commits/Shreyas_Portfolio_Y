import React, { useState, useEffect } from 'react';
import { ArrowDown, Music, Play, Pause, Sparkles, Terminal, Camera, ExternalLink } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { audioEngine } from '../utils/audioEngine';

export const OpeningHero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setIsPlaying(audioEngine.getPlaybackState().isPlaying);
    });
    return unsub;
  }, []);

  const handleToggleMusic = () => {
    audioEngine.togglePlay();
  };

  return (
    <section
      id="opening"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
    >
      {/* Background Cinematic Atmosphere & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-cyan-500/15 rounded-full blur-3xl opacity-70 animate-pulse-glow" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Badge: Student & Innovator */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-md mb-6 shadow-sm shadow-amber-500/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold font-mono">
            {PORTFOLIO_INFO.status}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* MAIN VISUAL: ORNATE CIRCULAR POSTER (Direct user picture) */}
        <div className="relative group my-4 sm:my-6">
          {/* Outer Multi-Colored Neon Ring (Cyan & Magenta/Pink) */}
          <div className="absolute -inset-2.5 sm:-inset-3.5 rounded-full bg-gradient-to-tr from-cyan-500 via-pink-500 to-amber-400 opacity-80 blur-md animate-spin-slow group-hover:opacity-100 transition-opacity" />

          {/* Secondary Counter-rotating Glow Border */}
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-pink-500/80 shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-spin-reverse" />
          <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-spin-slow" />

          {/* Poster Container Frame */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-b from-amber-400/40 via-black to-slate-950 border-2 border-amber-400/70 shadow-2xl shadow-black overflow-hidden flex items-center justify-center">
            {/* The Actual Uploaded Poster Photograph */}
            <img
              src="/shreyas-opening-poster.png"
              alt="Shreyas Chaturvedi Ornate Poster"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Golden Crown Accent Indicator */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 border border-amber-400/80 shadow-lg text-[11px] font-cinzel text-amber-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
            <span>Crown of Innovation</span>
          </div>
        </div>

        {/* Hero Title & Typography */}
        <h1 className="mt-4 sm:mt-6 font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 gold-text-glow">
          {PORTFOLIO_INFO.name}
        </h1>

        {/* Memorable Tagline */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl text-slate-300 font-light leading-relaxed">
          <span className="text-cyan-400 font-medium">Programming</span> •{' '}
          <span className="text-amber-400 font-medium">AI & Robotics</span> •{' '}
          <span className="text-pink-400 font-medium">Web Development</span> •{' '}
          <span className="text-yellow-300 font-medium">Music & Creativity</span>
        </p>

        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl font-mono tracking-wide">
          "{PORTFOLIO_INFO.tagline}"
        </p>

        {/* Action Buttons: Explore My World & Play Music */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Explore My World Button */}
          <a
            href="#about"
            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full overflow-hidden font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black flex items-center gap-2"
          >
            <span>Explore My World</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>

          {/* Clean Music Play Button (0 effects) */}
          <button
            onClick={handleToggleMusic}
            className={`px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase border transition-all duration-300 flex items-center gap-2.5 ${
              isPlaying
                ? 'border-pink-500/70 bg-pink-500/10 text-pink-300 shadow-md shadow-pink-500/30'
                : 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/40 shadow-sm shadow-cyan-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-pink-400" />
                <span>Pause Music</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Play Music (Clean Audio)</span>
              </>
            )}
          </button>

          {/* Direct Gallery Jump */}
          <a
            href="#gallery"
            className="px-4 py-3 sm:py-3.5 rounded-full text-xs font-mono border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-all flex items-center gap-2"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>View All Photos</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll to Discover</span>
          <div className="w-5 h-9 rounded-full border border-slate-700 p-1 flex justify-center">
            <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
