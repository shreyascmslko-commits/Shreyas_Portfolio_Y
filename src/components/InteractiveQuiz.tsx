import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/portfolioData';

interface InteractiveQuizProps {
  onUnlockCertificate: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ onUnlockCertificate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            <span>Interactive Exploration Challenge</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-400 to-cyan-400 gold-text-glow">
            Knowledge & Logic Quiz
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4 mb-4" />

          <p className="text-sm text-slate-300 font-light">
            Test your knowledge across robotics, artificial intelligence, audio synthesis, and programming logic to unlock your personalized Participation Certificate.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 via-black to-zinc-950 border border-pink-500/30 p-6 sm:p-10 shadow-2xl shadow-black relative overflow-hidden cinematic-card-glow">
          {!isCompleted ? (
            <div>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-slate-800">
                <span className="text-pink-400">
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-amber-400">Score: {score} Points</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mb-8 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options Grid */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-800 bg-zinc-900/60 text-slate-300 hover:border-slate-700 hover:bg-zinc-900';
                  if (isAnswered) {
                    if (idx === currentQ.answerIndex) {
                      btnStyle = 'border-emerald-500/80 bg-emerald-500/20 text-emerald-200 shadow-md shadow-emerald-500/20';
                    } else if (idx === selectedOption) {
                      btnStyle = 'border-rose-500/80 bg-rose-500/20 text-rose-200 shadow-md shadow-rose-500/20';
                    } else {
                      btnStyle = 'opacity-40 border-slate-900 bg-black text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all duration-200 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs border border-current">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswered && idx === currentQ.answerIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.answerIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 animate-fade-in">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                    Explanation:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next Question Trigger */}
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!isAnswered}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-95 shadow-md shadow-pink-500/25 transition-all"
                >
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'Finish & See Results' : 'Next Question ▹'}
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 p-0.5 mx-auto mb-6 flex items-center justify-center shadow-xl shadow-amber-500/20">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <Award className="w-10 h-10 text-amber-400" />
                </div>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                Challenge Complete!
              </h3>
              <p className="text-base text-slate-300 mb-6 font-light">
                You scored <span className="font-bold text-amber-400 text-xl">{score}</span> out of{' '}
                <span className="font-bold text-slate-100 text-xl">{QUIZ_QUESTIONS.length}</span>!
              </p>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-zinc-900/60 border border-slate-800 mb-8 text-xs text-slate-300 font-light leading-relaxed">
                {score >= 4
                  ? 'Outstanding analytical acumen! You demonstrate a keen understanding of logic, robotics, and creative computation.'
                  : 'Great effort! Exploring technology and arts is all about continuous discovery and curiosity.'}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-full text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>

                <button
                  onClick={onUnlockCertificate}
                  className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Claim & Download Certificate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
