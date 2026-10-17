/**
 * Audio Engine for Shreyas Chaturvedi's Cinematic Portfolio
 * Plays clean, unaltered audio tracks with zero artificial distortion or sound effects.
 * Supports native HTML5 Audio playback and custom user MP3 file loading.
 */

class PureAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  public analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private isPlaying = false;
  private currentTrackId = 'track-1';
  private currentTime = 0;
  private duration = 30;
  private volume = 0.9;
  private isMuted = false;
  private listeners: Set<() => void> = new Set();
  private customTrackUrls: Record<string, string> = {};

  private trackSources: Record<string, { src: string; fallbackDuration: number }> = {
    'track-1': { src: '/audio/track1.wav', fallbackDuration: 30 },
    'track-2': { src: '/audio/track2.wav', fallbackDuration: 30 },
    'track-3': { src: '/audio/track3.wav', fallbackDuration: 30 },
    'track-4': { src: '/audio/track4.wav', fallbackDuration: 30 },
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.audioElement.volume = this.volume;

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        if (this.audioElement.duration && !isNaN(this.audioElement.duration)) {
          this.duration = this.audioElement.duration;
        }
        this.notify();
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.audioElement && this.audioElement.duration && !isNaN(this.audioElement.duration)) {
        this.duration = this.audioElement.duration;
        this.notify();
      }
    });

    this.audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public getPlaybackState() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      isMuted: this.isMuted,
      hasCustomTrack: !!this.customTrackUrls[this.currentTrackId],
    };
  }

  /**
   * Set custom user-uploaded MP3 file directly
   */
  public setCustomTrack(trackId: string, url: string) {
    this.customTrackUrls[trackId] = url;
    if (this.currentTrackId === trackId) {
      this.playTrack(trackId);
    }
    this.notify();
  }

  public playTrack(trackId: string) {
    this.initAudioElement();
    if (!this.audioElement) return;

    const targetSrc = this.customTrackUrls[trackId] || this.trackSources[trackId]?.src;
    if (!targetSrc) return;

    const isDifferentTrack = this.currentTrackId !== trackId;
    this.currentTrackId = trackId;

    if (isDifferentTrack || !this.audioElement.src.includes(targetSrc)) {
      this.audioElement.src = targetSrc;
      this.audioElement.currentTime = 0;
    }

    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          // User interaction required or blocked
          this.isPlaying = false;
          this.notify();
        });
    }
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.playTrack(this.currentTrackId);
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public seek(seconds: number) {
    if (this.audioElement) {
      this.audioElement.currentTime = Math.max(0, Math.min(this.duration, seconds));
      this.currentTime = this.audioElement.currentTime;
      this.notify();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.isMuted = false;
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  // Piano Note for Virtual Piano
  public playPianoNote(note: string, duration = 0.8) {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const noteFrequencies: Record<string, number> = {
        C4: 261.63,
        'C#4': 277.18,
        D4: 293.66,
        'D#4': 311.13,
        E4: 329.63,
        F4: 349.23,
        'F#4': 369.99,
        G4: 392.0,
        'G#4': 415.3,
        A4: 440.0,
        Bb4: 466.16,
        B4: 493.88,
        C5: 523.25,
        'C#5': 554.37,
        D5: 587.33,
        'D#5': 622.25,
        E5: 659.25,
      };

      const freq = noteFrequencies[note] || 440;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // safe fallback
    }
  }

  public getVisualizerData(buffer: Uint8Array) {
    if (this.isPlaying) {
      // Clean dynamic animated waveform when music plays
      const time = Date.now() / 200;
      for (let i = 0; i < buffer.length; i++) {
        const val =
          Math.sin(time + i * 0.4) * 80 +
          Math.sin(time * 1.5 + i * 0.8) * 40 +
          130;
        buffer[i] = Math.max(20, Math.min(255, Math.floor(val)));
      }
    } else {
      buffer.fill(0);
    }
  }
}

export const audioEngine = new PureAudioEngine();

// Auto-pause when user switches tabs or hides page
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioEngine.getPlaybackState().isPlaying) {
      audioEngine.pause();
    }
  });
}
