import React, { useState, useEffect } from 'react';
import { Music, Play, Volume2, Sparkles, Piano } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface KeyDef {
  note: string;
  isBlack: boolean;
  keyboardKey: string;
  label: string;
}

export const VirtualPiano: React.FC = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [showKeyLabels, setShowKeyLabels] = useState(true);

  const keys: KeyDef[] = [
    { note: 'C4', isBlack: false, keyboardKey: 'A', label: 'C' },
    { note: 'C#4', isBlack: true, keyboardKey: 'W', label: 'C#' },
    { note: 'D4', isBlack: false, keyboardKey: 'S', label: 'D' },
    { note: 'D#4', isBlack: true, keyboardKey: 'E', label: 'D#' },
    { note: 'E4', isBlack: false, keyboardKey: 'D', label: 'E' },
    { note: 'F4', isBlack: false, keyboardKey: 'F', label: 'F' },
    { note: 'F#4', isBlack: true, keyboardKey: 'T', label: 'F#' },
    { note: 'G4', isBlack: false, keyboardKey: 'G', label: 'G' },
    { note: 'G#4', isBlack: true, keyboardKey: 'Y', label: 'G#' },
    { note: 'A4', isBlack: false, keyboardKey: 'H', label: 'A' },
    { note: 'Bb4', isBlack: true, keyboardKey: 'U', label: 'Bb' },
    { note: 'B4', isBlack: false, keyboardKey: 'J', label: 'B' },
    { note: 'C5', isBlack: false, keyboardKey: 'K', label: 'C5' },
    { note: 'C#5', isBlack: true, keyboardKey: 'O', label: 'C#' },
    { note: 'D5', isBlack: false, keyboardKey: 'L', label: 'D' },
    { note: 'D#5', isBlack: true, keyboardKey: 'P', label: 'D#' },
    { note: 'E5', isBlack: false, keyboardKey: ';', label: 'E' },
  ];

  const playNote = (note: string) => {
    setActiveNote(note);
    audioEngine.playPianoNote(note, 0.9);
    setTimeout(() => {
      setActiveNote((prev) => (prev === note ? null : prev));
    }, 200);
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const match = keys.find((k) => k.keyboardKey.toLowerCase() === e.key.toLowerCase());
      if (match) {
        playNote(match.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Demo melody: Ghazal intro motif
  const playDemoMelody = () => {
    if (isPlayingDemo) return;
    setIsPlayingDemo(true);

    const melody = [
      { note: 'D4', delay: 0 },
      { note: 'F4', delay: 350 },
      { note: 'A4', delay: 700 },
      { note: 'Bb4', delay: 1100 },
      { note: 'A4', delay: 1500 },
      { note: 'G4', delay: 1900 },
      { note: 'F4', delay: 2300 },
      { note: 'E4', delay: 2700 },
      { note: 'D4', delay: 3100 },
      { note: 'F4', delay: 3600 },
      { note: 'D4', delay: 4200 },
    ];

    melody.forEach((item, index) => {
      setTimeout(() => {
        playNote(item.note);
        if (index === melody.length - 1) {
          setIsPlayingDemo(false);
        }
      }, item.delay);
    });
  };

  return (
    <section id="piano" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/90">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Piano className="w-3.5 h-3.5 text-purple-400" />
            <span>Harmonic Synthesizer Studio</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-amber-300 gold-text-glow">
            Virtual Piano
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm text-slate-300 font-light max-w-xl mx-auto">
            Play synthesized piano notes with your mouse, touch, or computer keyboard. Powered directly by the browser's Web Audio API.
          </p>
        </div>

        {/* Piano Case & Controls */}
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-purple-500/30 p-6 sm:p-8 shadow-2xl shadow-black relative overflow-hidden cinematic-card-glow">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase text-slate-300">
                Octave 4 - 5 • Polyphonic Synth
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowKeyLabels(!showKeyLabels)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                  showKeyLabels
                    ? 'border-purple-400 bg-purple-500/20 text-purple-200'
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Key Labels: {showKeyLabels ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={playDemoMelody}
                disabled={isPlayingDemo}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isPlayingDemo ? 'Playing...' : 'Play Ghazal Motif'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Keyboard Keys Layout */}
          <div className="relative h-64 sm:h-72 select-none overflow-x-auto pb-2 flex justify-center">
            <div className="relative inline-flex bg-zinc-950 p-2 rounded-2xl border-4 border-zinc-900 shadow-inner">
              {/* White keys */}
              {keys
                .filter((k) => !k.isBlack)
                .map((key) => {
                  const isActive = activeNote === key.note;
                  return (
                    <button
                      key={key.note}
                      onClick={() => playNote(key.note)}
                      className={`relative w-12 sm:w-14 h-56 sm:h-64 rounded-b-xl border border-slate-700/80 transition-all duration-75 flex flex-col justify-end items-center pb-3 shadow-md ${
                        isActive
                          ? 'bg-gradient-to-b from-amber-100 to-amber-300 translate-y-1 shadow-inner shadow-amber-600'
                          : 'bg-gradient-to-b from-white via-slate-100 to-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {showKeyLabels && (
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-mono font-bold text-slate-800">
                            {key.keyboardKey}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">{key.label}</span>
                        </div>
                      )}
                    </button>
                  );
                })}

              {/* Black keys overlaid on top */}
              <div className="absolute top-2 left-2 pointer-events-none flex">
                {/* Visual Black Key Placements */}
                {/* C#4 */}
                <button
                  onClick={() => playNote('C#4')}
                  className={`pointer-events-auto absolute left-9 sm:left-11 w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'C#4'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">W</span>
                  )}
                </button>

                {/* D#4 */}
                <button
                  onClick={() => playNote('D#4')}
                  className={`pointer-events-auto absolute left-[5.25rem] sm:left-[6.25rem] w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'D#4'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">E</span>
                  )}
                </button>

                {/* F#4 */}
                <button
                  onClick={() => playNote('F#4')}
                  className={`pointer-events-auto absolute left-[11.25rem] sm:left-[13.25rem] w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'F#4'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">T</span>
                  )}
                </button>

                {/* G#4 */}
                <button
                  onClick={() => playNote('G#4')}
                  className={`pointer-events-auto absolute left-[14.25rem] sm:left-[16.75rem] w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'G#4'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">Y</span>
                  )}
                </button>

                {/* Bb4 */}
                <button
                  onClick={() => playNote('Bb4')}
                  className={`pointer-events-auto absolute left-[17.25rem] sm:left-[20.25rem] w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'Bb4'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">U</span>
                  )}
                </button>

                {/* C#5 */}
                <button
                  onClick={() => playNote('C#5')}
                  className={`pointer-events-auto absolute left-[23.25rem] sm:left-[27.25rem] w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'C#5'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">O</span>
                  )}
                </button>

                {/* D#5 */}
                <button
                  onClick={() => playNote('D#5')}
                  className={`pointer-events-auto absolute left-[26.25rem] sm:left-[30.75rem] w-7 sm:w-8 h-36 sm:h-40 rounded-b-lg border border-black z-20 flex flex-col justify-end items-center pb-2 transition-all ${
                    activeNote === 'D#5'
                      ? 'bg-purple-600 shadow-lg shadow-purple-500'
                      : 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800'
                  }`}
                >
                  {showKeyLabels && (
                    <span className="text-[9px] font-mono font-bold text-purple-300">P</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs font-mono text-slate-400">
            Tip: Press keyboard keys <span className="text-amber-400">A-S-D-F-G-H-J-K-L</span> to play
            white keys, or <span className="text-purple-400">W-E-T-Y-U-O-P</span> for black keys.
          </div>
        </div>
      </div>
    </section>
  );
};
