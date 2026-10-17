/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OpeningHero } from './components/OpeningHero';
import { AboutSection } from './components/AboutSection';
import { InterestsAndProjects } from './components/InterestsAndProjects';
import { PhotoGallery } from './components/PhotoGallery';
import { MusicPlayer } from './components/MusicPlayer';
import { LearningJourney } from './components/LearningJourney';
import { SimulatedTerminal } from './components/SimulatedTerminal';
import { VirtualPiano } from './components/VirtualPiano';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { ParticipationCertificate } from './components/ParticipationCertificate';
import { AchievementsSection } from './components/AchievementsSection';
import { YouTubeShowcase } from './components/YouTubeShowcase';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { FloatingMusicBar } from './components/FloatingMusicBar';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('Honored Explorer');

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenCertificate = (customName?: string) => {
    if (customName) {
      setRecipientName(customName);
    }
    setCertificateOpen(true);
  };

  return (
    <div className={`min-h-screen bg-black text-slate-100 ${theme === 'light' ? 'bg-zinc-950 text-slate-100' : ''}`}>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* Main Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCertificate={() => handleOpenCertificate()}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 1. Opening Screen with Ornate Circular Poster */}
        <OpeningHero />

        {/* 2. About Me */}
        <AboutSection />

        {/* 3. Interests & Projects */}
        <InterestsAndProjects />

        {/* 4. Photograph Gallery */}
        <PhotoGallery />

        {/* 5. Music Player Station (All 4 tracks) */}
        <MusicPlayer />

        {/* 6. Learning Journey Timeline */}
        <LearningJourney />

        {/* 7. Simulated Terminal CLI */}
        <SimulatedTerminal onOpenCertificate={() => handleOpenCertificate()} />

        {/* 8. Virtual Piano Synthesizer */}
        <VirtualPiano />

        {/* 9. Interactive Quiz */}
        <InteractiveQuiz onUnlockCertificate={() => handleOpenCertificate('Explorer & Quiz Finisher')} />

        {/* 10. Achievements & Milestones */}
        <AchievementsSection />

        {/* 11. YouTube Video Showcase */}
        <YouTubeShowcase />

        {/* 12. Contact & Connections */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenCertificate={() => handleOpenCertificate()} />

      {/* Floating Utilities */}
      <BackToTop />
      <FloatingMusicBar />

      {/* Modal: Participation Certificate Generator & Downloader */}
      <ParticipationCertificate
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        defaultRecipientName={recipientName}
      />
    </div>
  );
}
