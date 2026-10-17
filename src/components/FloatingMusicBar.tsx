import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, Music, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { AUDIO_TRACKS } from '../data/portfolioData';

export const FloatingMusicBar: React.FC = () => {
  const [playbackState, setPlaybackState] = useState(audioEngine.getPlaybackState());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setPlaybackState(audioEngine.getPlaybackState());
    });
    return unsub;
  }, []);

  const currentTrack =
    AUDIO_TRACKS.find((t) => t.id === playbackState.currentTrackId) || AUDIO_TRACKS[0];

  // Only show if playing or if user hasn't explicitly dismissed
  if (dismissed && !playbackState.isPlaying) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm hidden sm:block animate-fade-in">
      <div className="p-3 rounded-2xl bg-black/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl shadow-black flex items-center gap-3">
        <a
          href="#music"
          className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group overflow-hidden"
          title="Open Music Station"
        >
          <Music
            className={`w-5 h-5 text-amber-400 ${playbackState.isPlaying ? 'animate-bounce text-pink-400' : ''}`}
          />
        </a>

        <div className="flex-1 min-w-0 pr-2">
          <a href="#music" className="block text-xs font-semibold text-slate-100 truncate hover:text-amber-300">
            {currentTrack.title}
          </a>
          <span className="text-[10px] font-mono text-cyan-400 block truncate">
            {playbackState.isPlaying ? 'Playing • Web Audio' : 'Paused • Shreyas Selection'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => audioEngine.togglePlay()}
            className="p-2 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-colors"
            title={playbackState.isPlaying ? 'Pause' : 'Play'}
          >
            {playbackState.isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black" />}
          </button>

          <button
            onClick={() => {
              const curIdx = AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
              const nextIdx = (curIdx + 1) % AUDIO_TRACKS.length;
              audioEngine.playTrack(AUDIO_TRACKS[nextIdx].id);
            }}
            className="p-2 rounded-full text-slate-400 hover:text-white"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full text-slate-500 hover:text-slate-300"
            title="Hide mini player"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
