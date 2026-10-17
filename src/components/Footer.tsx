import React from 'react';
import { ArrowUp, Award, Music, Terminal, Heart } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCertificate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertificate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-amber-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Logo & Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full border border-amber-500/60 bg-gradient-to-br from-amber-500/20 to-pink-500/20 flex items-center justify-center font-decorative font-bold text-amber-400">
                S
              </div>
              <span className="font-cinzel text-lg font-bold tracking-wider text-amber-300">
                {PORTFOLIO_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light max-w-sm">
              Student explorer at the convergence of Artificial Intelligence, Robotics, Web Engineering, and Musical Harmony.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase font-mono tracking-wider text-slate-400">
            <a href="#opening" className="hover:text-amber-400 transition-colors">Opening</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#music" className="hover:text-amber-400 transition-colors">Music</a>
            <a href="#terminal" className="hover:text-amber-400 transition-colors">CLI</a>
            <a href="#piano" className="hover:text-amber-400 transition-colors">Piano</a>
            <a href="#quiz" className="hover:text-amber-400 transition-colors">Quiz</a>
            <button onClick={onOpenCertificate} className="hover:text-cyan-400 transition-colors">
              Certificate
            </button>
          </div>

          {/* Back to top CTA */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-zinc-900 text-xs text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all hover:scale-105"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Shreyas Chaturvedi. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with passion, code & acoustics</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
