import React, { useRef, useEffect, useState } from 'react';
import { Award, Download, CheckCircle, Sparkles, X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface CertificateProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRecipientName?: string;
}

export const ParticipationCertificate: React.FC<CertificateProps> = ({
  isOpen,
  onClose,
  defaultRecipientName = 'Honored Explorer',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [recipientName, setRecipientName] = useState(defaultRecipientName);
  const [certId, setCertId] = useState('');
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      setCertId(`SC-EXP-${randomHex}-2026`);
      const now = new Date();
      setIssueDate(
        now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#06b6d4', '#ec4899', '#ffffff'],
      });
    }
  }, [isOpen]);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 1920;
    const h = 1080;
    canvas.width = w;
    canvas.height = h;

    // 1. Background Gradient (Deep Cosmic Black / Navy)
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w / 1.2);
    bgGrad.addColorStop(0, '#0a0815');
    bgGrad.addColorStop(0.6, '#040308');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Subtle Star Dust Particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 90; i++) {
      const px = (Math.sin(i * 99) * 0.5 + 0.5) * w;
      const py = (Math.cos(i * 77) * 0.5 + 0.5) * h;
      const pr = (i % 3) + 1;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Ornate Double Golden Border
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, '#ffd700');
    borderGrad.addColorStop(0.25, '#ffe57f');
    borderGrad.addColorStop(0.5, '#ffb300');
    borderGrad.addColorStop(0.75, '#ffa000');
    borderGrad.addColorStop(1, '#ffd54f');

    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 14;
    ctx.strokeRect(60, 60, w - 120, h - 120);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(84, 84, w - 168, h - 168);

    // Decorative corner notches
    const corners = [
      [84, 84],
      [w - 84, 84],
      [84, h - 84],
      [w - 84, h - 84],
    ];
    ctx.fillStyle = borderGrad;
    corners.forEach(([cx, cy]) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(25, 0);
      ctx.lineTo(0, 25);
      ctx.lineTo(-25, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // 4. Crown & Crest at Top Center
    ctx.save();
    ctx.translate(w / 2, 175);
    ctx.fillStyle = borderGrad;
    ctx.beginPath();
    ctx.moveTo(-50, 15);
    ctx.lineTo(-40, -20);
    ctx.lineTo(-15, 0);
    ctx.lineTo(0, -35);
    ctx.lineTo(15, 0);
    ctx.lineTo(40, -20);
    ctx.lineTo(50, 15);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-52, 16, 104, 10);
    ctx.restore();

    // 5. Header Typography
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fef08a';
    ctx.font = '700 24px "Cinzel", serif';
    ctx.fillText('SHREYAS CHATURVEDI CINEMATIC UNIVERSE', w / 2, 240);

    ctx.fillStyle = borderGrad;
    ctx.font = '900 64px "Cinzel", serif';
    ctx.fillText('CERTIFICATE OF EXPLORATION', w / 2, 315);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('THIS IS PROUDLY CONFERRED UPON', w / 2, 370);

    // 6. Recipient Name with underline glow
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Cinzel Decorative", "Cinzel", serif';
    ctx.fillText(recipientName || 'Honored Explorer', w / 2, 455);

    const nameLineGrad = ctx.createLinearGradient(w / 2 - 350, 0, w / 2 + 350, 0);
    nameLineGrad.addColorStop(0, 'transparent');
    nameLineGrad.addColorStop(0.5, '#ffd700');
    nameLineGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = nameLineGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 350, 485);
    ctx.lineTo(w / 2 + 350, 485);
    ctx.stroke();

    // 7. Citation Body Text
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '300 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'In recognition of your active engagement, intellectual curiosity, and exploration across',
      w / 2,
      545
    );
    ctx.fillText(
      'Robotics, Artificial Intelligence, Web Development, Logical Algorithms, and Musical Harmony.',
      w / 2,
      585
    );

    // Domain Badges
    ctx.fillStyle = '#fde047';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText(
      '#ROBOTICS  •  #ARTIFICIAL_INTELLIGENCE  •  #WEB_DEV  •  #MUSIC_STATION  •  #LOGIC',
      w / 2,
      645
    );

    // 8. Bottom Seals & Signatures
    // Left: Verification & Date
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 18px "JetBrains Mono", monospace';
    ctx.fillText(`VERIFICATION ID: ${certId}`, 180, 890);
    ctx.fillText(`DATE OF ISSUE:   ${issueDate}`, 180, 925);
    ctx.fillText(`STATUS:          OFFICIAL VERIFIED PARTICIPANT`, 180, 960);

    // Center: Royal Golden Embossed Seal with Shreyas's Photo
    ctx.save();
    ctx.translate(w / 2, 880);
    const sealGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 75);
    sealGrad.addColorStop(0, '#fef08a');
    sealGrad.addColorStop(0.7, '#d97706');
    sealGrad.addColorStop(1, '#78350f');

    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.font = '900 13px "Cinzel", serif';
    ctx.fillText('SEAL OF', 0, -15);
    ctx.fillText('EXCELLENCE', 0, 0);
    ctx.font = '700 10px "JetBrains Mono", monospace';
    ctx.fillText('2026 VERIFIED', 0, 16);
    ctx.restore();

    // Right: Signature of Shreyas Chaturvedi
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fde047';
    ctx.font = 'italic bold 42px "Cinzel Decorative", "Cinzel", cursive';
    ctx.fillText('Shreyas Chaturvedi', w - 180, 905);

    // Signature line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w - 460, 925);
    ctx.lineTo(w - 180, 925);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Shreyas Chaturvedi • Creator & Student', w - 180, 955);
  };

  useEffect(() => {
    if (isOpen) {
      drawCertificate();
    }
  }, [isOpen, recipientName, certId, issueDate]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `Shreyas-Chaturvedi-Certificate-${recipientName.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-zinc-950 border border-amber-500/50 p-6 sm:p-8 shadow-2xl shadow-black my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Achievement Unlocked</span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-300">
            Participation Certificate
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personalize your name below and download your high-resolution official exploration certificate.
          </p>
        </div>

        {/* Recipient Name Customization Input */}
        <div className="max-w-md mx-auto mb-6 flex items-center gap-2">
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter Your Full Name"
            maxLength={35}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-amber-500/40 text-slate-100 text-sm font-medium focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={() => drawCertificate()}
            title="Redraw Certificate"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Canvas Preview Frame */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl bg-black aspect-[16/9] w-full flex items-center justify-center mb-6">
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>

        {/* Download & Dismiss Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>High-Resolution PNG • 1920x1080 • Certified Signature</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 w-full sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black hover:opacity-95 shadow-lg shadow-amber-500/30 transition-all w-full sm:w-auto hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
