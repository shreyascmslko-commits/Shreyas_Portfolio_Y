import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Volume2, VolumeX, Music, Terminal, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenCertificate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setIsPlaying(audioEngine.getPlaybackState().isPlaying);
    });
    return unsub;
  }, []);

  const navLinks = [
    { name: 'Opening', href: '#opening' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Music', href: '#music' },
    { name: 'YouTube', href: '#youtube' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Piano', href: '#piano' },
    { name: 'Quiz', href: '#quiz' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/80 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity with Shreyas's actual portrait avatar */}
          <a href="#opening" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-cyan-400 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
              <img
                src={PORTFOLIO_INFO.avatarImage}
                alt="Shreyas Chaturvedi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full border-2 border-black"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-amber-300 group-hover:text-amber-200 transition-colors">
                SHREYAS CHATURVEDI
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase -mt-0.5 font-mono">
                Student & Explorer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-wider text-slate-300 hover:text-amber-400 font-medium transition-colors hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions: Quick Music Toggle, Certificate, Theme, Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Music Toggle */}
            <button
              onClick={() => audioEngine.togglePlay()}
              title={isPlaying ? 'Pause music' : 'Play music'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isPlaying
                  ? 'border-amber-400/70 bg-amber-500/20 text-amber-300 shadow-sm shadow-amber-500/40'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-pink-400' : ''}`} />
              <span className="hidden sm:inline">{isPlaying ? 'Playing' : 'Audio'}</span>
            </button>

            {/* Certificate Quick Access */}
            <button
              onClick={onOpenCertificate}
              title="View Participation Certificate"
              className="p-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/60 transition-all"
            >
              <Award className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-amber-500/20 px-4 pt-4 pb-6 mt-2 space-y-2 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 text-xs uppercase tracking-wider text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                audioEngine.togglePlay();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-amber-400"
            >
              <Music className="w-4 h-4" />
              <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
            </button>
            <button
              onClick={() => {
                onOpenCertificate();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-cyan-400"
            >
              <Award className="w-4 h-4" />
              <span>Certificate</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
