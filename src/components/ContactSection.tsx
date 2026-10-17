import React, { useState } from 'react';
import { Mail, Github, Youtube, Linkedin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Save message locally in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('shreyas_portfolio_messages') || '[]');
      existing.push({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('shreyas_portfolio_messages', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Connect & Collaborate</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cyan-400 to-amber-400 gold-text-glow">
            Get In Touch
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm text-slate-300 font-light">
            Interested in discussing robotics hardware, coding ideas, machine learning concepts, or musical acoustic collaborations? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Channels & Social Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-slate-800 space-y-6">
              <h3 className="font-cinzel text-lg font-bold text-amber-300">
                Connection Channels
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                As a student developer, I am always enthusiastic about exploring technical projects, participating in open-source discussions, and sharing robotics prototypes.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${PORTFOLIO_INFO.socialPlaceholders.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-slate-800/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-black text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">Email Address (Placeholder)</div>
                    <div className="text-xs font-mono text-slate-200">{PORTFOLIO_INFO.socialPlaceholders.email}</div>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_INFO.socialPlaceholders.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-slate-800/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-black text-cyan-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">GitHub Profile</div>
                    <div className="text-xs font-mono text-slate-200">github.com/shreyas-chaturvedi</div>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_INFO.socialPlaceholders.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-slate-800/80 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-black text-red-400">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">YouTube Channel</div>
                    <div className="text-xs font-mono text-slate-200">youtube.com/@shreyas-chaturvedi</div>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_INFO.socialPlaceholders.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-slate-800/80 text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-black text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">LinkedIn Network</div>
                    <div className="text-xs font-mono text-slate-200">linkedin.com/in/shreyas-chaturvedi</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-amber-500/30 cinematic-card-glow">
              <h3 className="font-cinzel text-xl font-bold text-slate-100 mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 font-light mb-6">
                Your message is safely recorded and stored right in your local browser sandbox.
              </p>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 flex items-center gap-3 mb-6 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs">
                    <strong>Thank you!</strong> Your message has been safely recorded in local storage.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maya@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Robotics Prototype & Audio Synthesis"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your thoughts, feedback, or collaboration ideas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black hover:opacity-95 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
