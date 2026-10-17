import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Repeat,
  Music,
  Disc3,
  Sliders,
  Sparkles,
  Upload,
  CheckCircle2,
  FileAudio,
} from 'lucide-react';
import { AUDIO_TRACKS, AudioTrack } from '../data/portfolioData';
import { audioEngine } from '../utils/audioEngine';

export const MusicPlayer: React.FC = () => {
  const [playbackState, setPlaybackState] = useState(audioEngine.getPlaybackState());
  const [isLooping, setIsLooping] = useState(false);
  const [customFileLoaded, setCustomFileLoaded] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setPlaybackState(audioEngine.getPlaybackState());
    });
    return unsub;
  }, []);

  const currentTrack =
    AUDIO_TRACKS.find((t) => t.id === playbackState.currentTrackId) || AUDIO_TRACKS[0];

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextTrack = () => {
    const currentIndex = AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % AUDIO_TRACKS.length;
    audioEngine.playTrack(AUDIO_TRACKS[nextIndex].id);
  };

  const handlePrevTrack = () => {
    const currentIndex = AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    audioEngine.playTrack(AUDIO_TRACKS[prevIndex].id);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    audioEngine.seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    audioEngine.setVolume(newVol);
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      audioEngine.setCustomTrack(currentTrack.id, blobUrl);
      setCustomFileLoaded(file.name);
      setTimeout(() => setCustomFileLoaded(null), 5000);
    }
  };

  return (
    <section id="music" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Music className="w-3.5 h-3.5 text-yellow-400" />
            <span>Pure Sound Station • Zero Effects</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 gold-text-glow">
            Melodic Music Station
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Experience Shreyas’s 4 curated tracks with clean, unaltered pure acoustic sound. You can also pick your original MP3 files directly to play with 100% raw fidelity.
          </p>
        </div>

        {/* Player Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-zinc-900/90 via-black to-zinc-950 border border-amber-500/40 p-6 sm:p-10 shadow-2xl shadow-black relative overflow-hidden cinematic-card-glow">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Now Playing Header with Shreyas's Photo inside the vinyl album */}
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-8 pb-8 border-b border-slate-800/80">
            {/* Spinning Disc / Vinyl Artwork featuring Shreyas's actual poster */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex-shrink-0 p-2 bg-gradient-to-tr from-amber-500/40 via-pink-500/40 to-cyan-500/40 shadow-xl flex items-center justify-center">
              <div
                className={`w-full h-full rounded-full bg-zinc-950 border-4 border-black flex items-center justify-center relative overflow-hidden ${
                  playbackState.isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                {/* User's Photograph as Center Vinyl Label */}
                <img
                  src="/shreyas-opening-poster.png"
                  alt="Shreyas Chaturvedi Music Label"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full bg-black/20" />
                <div className="w-8 h-8 rounded-full bg-black border-2 border-amber-400 absolute flex items-center justify-center shadow-inner z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {currentTrack.genre}
                </span>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Pure Audio (0 Effects)</span>
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-slate-300 font-light mt-1">{currentTrack.subtitle}</p>
              <p className="text-xs text-slate-400 font-light mt-2 max-w-lg leading-relaxed">
                {currentTrack.description}
              </p>

              {/* Custom MP3 File Load Option */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleCustomAudioUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Load Original MP3 File for This Track</span>
                </button>

                {customFileLoaded && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Loaded: {customFileLoaded}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar & Seek */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>{formatSeconds(playbackState.currentTime)}</span>
              <span>{formatSeconds(playbackState.duration)}</span>
            </div>

            <div className="relative group flex items-center">
              <input
                type="range"
                min="0"
                max={playbackState.duration || 30}
                step="0.1"
                value={playbackState.currentTime}
                onChange={handleSeek}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-800 accent-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Controls: Prev, Play/Pause, Next, Volume */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Playback Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLooping(!isLooping)}
                title="Toggle Loop"
                className={`p-2.5 rounded-full border transition-all ${
                  isLooping
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                    : 'border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <Repeat className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevTrack}
                title="Previous Track"
                className="p-3 rounded-full border border-slate-800 bg-zinc-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => audioEngine.togglePlay()}
                title={playbackState.isPlaying ? 'Pause' : 'Play'}
                className="p-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/40 hover:shadow-amber-500/70 hover:scale-105 active:scale-95 transition-all"
              >
                {playbackState.isPlaying ? (
                  <Pause className="w-6 h-6 fill-black" />
                ) : (
                  <Play className="w-6 h-6 fill-black ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                title="Next Track"
                className="p-3 rounded-full border border-slate-800 bg-zinc-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => audioEngine.toggleMute()}
                className="text-slate-400 hover:text-amber-400 transition-colors"
                title={playbackState.isMuted ? 'Unmute' : 'Mute'}
              >
                {playbackState.isMuted || playbackState.volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-rose-400" />
                ) : playbackState.volume < 0.5 ? (
                  <Volume1 className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={playbackState.isMuted ? 0 : playbackState.volume}
                onChange={handleVolumeChange}
                className="w-28 sm:w-32 h-1.5 rounded-full appearance-none cursor-pointer bg-slate-800 accent-amber-400"
              />
              <span className="text-[11px] font-mono text-slate-400 w-8">
                {Math.round((playbackState.isMuted ? 0 : playbackState.volume) * 100)}%
              </span>
            </div>
          </div>

          {/* Track Selection List */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
              <span>All 4 Supplied Master Tracks</span>
              <span className="text-amber-400 text-[11px]">Select any track to listen</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUDIO_TRACKS.map((track, idx) => {
                const isSelected = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => audioEngine.playTrack(track.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-400/80 bg-amber-500/10 text-white shadow-md shadow-amber-500/10'
                        : 'border-slate-800/80 bg-zinc-900/60 text-slate-300 hover:border-slate-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-amber-400 text-black'
                            : 'bg-black text-slate-400 border border-slate-800'
                        }`}
                      >
                        {isSelected && playbackState.isPlaying ? '▶' : idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-100">{track.title}</div>
                        <div className="text-[10px] text-slate-400">{track.genre}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{track.durationFormatted}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
