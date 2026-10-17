import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_INFO, PROJECTS, AUDIO_TRACKS, INITIAL_GALLERY } from '../data/portfolioData';
import { audioEngine } from '../utils/audioEngine';

interface TerminalEntry {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

interface SimulatedTerminalProps {
  onOpenCertificate: () => void;
}

export const SimulatedTerminal: React.FC<SimulatedTerminalProps> = ({ onOpenCertificate }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: 'system',
      text: 'SHREYAS-OS v2.5 (x86_64-cinematic-cli)\nType "help" to view predefined commands. Autocompletion supported.',
    },
    {
      type: 'output',
      text: 'System status: Online • Clean Audio Engine: Loaded • YouTube: S&S WonderVerse Connected',
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const predefinedCommands = [
    'help',
    'photos',
    'youtube',
    'about',
    'skills',
    'projects',
    'music',
    'piano',
    'quiz',
    'certificate',
    'whoami',
    'clear',
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newEntries: TerminalEntry[] = [{ type: 'input', text: `shreyas@portfolio:~$ ${rawCmd}` }];
    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `AVAILABLE PREDEFINED COMMANDS:
  photos       - List direct links to all uploaded photographs
  youtube      - Display official YouTube channel (@S_S-Wondersverse) info
  about        - Overview of Shreyas Chaturvedi's background & studies
  skills       - List technical & creative domain skillsets
  projects     - View active and prototype engineering projects
  music        - Toggle clean audio playback of the 4 supplied tracks
  piano        - Jump to the Virtual Piano synthesizer
  quiz         - Launch the 5-question easy quiz
  certificate  - Open & download your verified Participation Certificate
  whoami       - Display current explorer session info
  clear        - Clear terminal screen history`,
        });
        break;

      case 'photos':
        newEntries.push({
          type: 'output',
          text: `DIRECT PHOTO ARCHIVE LINKS:
  1. Opening Poster:       /shreyas-opening-poster.png
  2. Cinematic Dhurandhar: /shreyas-cinematic-portrait.png
  3. Original Portrait:    /shreyas-original-portrait.png
  4. Styled Hair Concept:  /shreyas-hairstyle-edited-concept.png`,
        });
        break;

      case 'youtube':
        newEntries.push({
          type: 'output',
          text: `OFFICIAL YOUTUBE CHANNEL:
  Channel:   S&S WonderVerse-Explore and Have Fun!
  Handle:    @S_S-Wondersverse
  URL:       https://youtube.com/@s_s-wondersverse?si=dpecIWTVDZ-elqcR
  Content:   3D Pen Unboxing, Riverfront Lucknow, Badminton, Travel & Train Shorts!`,
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `NAME: ${PORTFOLIO_INFO.name}\nSTATUS: ${PORTFOLIO_INFO.status}\nBIO: ${PORTFOLIO_INFO.bio}`,
        });
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          text: `DOMAINS OF STUDY & PRACTICE:
${PORTFOLIO_INFO.domains.map((d) => `  [+] ${d}`).join('\n')}`,
        });
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: `SELECTED ENGINEERING PROJECTS:
${PROJECTS.map((p) => `  * ${p.title} [${p.status}] -> ${p.category}`).join('\n')}`,
        });
        break;

      case 'music':
        audioEngine.togglePlay();
        newEntries.push({
          type: 'output',
          text: `MUSIC STATION (Clean Audio • 0 Effects):
Tracks:
${AUDIO_TRACKS.map((t, idx) => `  ${idx + 1}. ${t.title} (${t.durationFormatted}) - ${t.genre}`).join('\n')}
Toggled audio playback! Playing unaltered audio.`,
        });
        break;

      case 'piano':
        window.location.hash = 'piano';
        newEntries.push({
          type: 'output',
          text: 'Navigating to Virtual Piano Synthesizer...',
        });
        break;

      case 'quiz':
        window.location.hash = 'quiz';
        newEntries.push({
          type: 'output',
          text: 'Navigating to Easy Knowledge Quiz...',
        });
        break;

      case 'certificate':
        onOpenCertificate();
        newEntries.push({
          type: 'output',
          text: 'Opening verified Participation Certificate generator modal...',
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: 'User: Honored Explorer • Role: Visitor • Permissions: Safe Interactive Read-Only',
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `Command not recognized: "${rawCmd}". For security, arbitrary execution is disabled. Type "help" to see predefined commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <section id="terminal" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive CLI Shell</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-400 to-cyan-400 gold-text-glow">
            Simulated Terminal
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm text-slate-300 font-light">
            Query information about Shreyas’s projects, YouTube channel, photo links, and audio engine using sandboxed predefined commands.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl bg-black border border-emerald-500/30 shadow-2xl shadow-black overflow-hidden font-mono text-xs sm:text-sm">
          {/* Top Window Bar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 ml-2 font-mono">
                shreyas@chaturvedi-terminal:~ (bash)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistory([])}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Clear terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div className="px-4 py-2 bg-zinc-950 border-b border-zinc-900 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-1">Quick:</span>
            {predefinedCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-500/50 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen Body */}
          <div className="p-4 sm:p-6 min-h-[300px] max-h-[420px] overflow-y-auto space-y-3 bg-black/95 text-slate-200">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'input' && (
                  <div className="text-emerald-400 font-semibold">{item.text}</div>
                )}
                {item.type === 'system' && (
                  <div className="text-amber-400/90 whitespace-pre-wrap">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <div className="text-slate-300 whitespace-pre-wrap pl-2 border-l border-emerald-500/30">
                    {item.text}
                  </div>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400 whitespace-pre-wrap pl-2 border-l border-rose-500/30">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Prompt Input Bar */}
          <div className="p-3 bg-zinc-900/80 border-t border-zinc-800 flex items-center gap-2">
            <span className="text-emerald-400 font-bold hidden sm:inline">shreyas@portfolio:~$</span>
            <span className="text-emerald-400 font-bold sm:hidden">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. 'photos', 'youtube', 'about', 'quiz')..."
              className="flex-1 bg-transparent text-slate-100 focus:outline-none text-xs sm:text-sm font-mono caret-emerald-400"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Exec</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
