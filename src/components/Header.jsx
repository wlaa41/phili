import React, { useState } from 'react';
import { Award, Sparkles, Volume2, VolumeX, Smile, Globe } from 'lucide-react';
import { JOKES_COLLECTION_BILINGUAL } from '../data/lessonData';
import { setMuted, isMuted, playSound } from '../utils/soundManager';

export default function Header({ 
  unlockedStages, 
  currentStageId, 
  setCurrentStageId, 
  xp, 
  badges,
  lang,
  setLang,
  onOpenCertificate
}) {
  const [activeJoke, setActiveJoke] = useState(null);
  const [muted, setSoundMuted] = useState(isMuted());

  const triggerRandomJoke = () => {
    playSound('flip');
    const jokes = JOKES_COLLECTION_BILINGUAL[lang] || JOKES_COLLECTION_BILINGUAL.en;
    const randomIdx = Math.floor(Math.random() * jokes.length);
    setActiveJoke(jokes[randomIdx]);
  };

  const handleToggleSound = () => {
    const nextMuted = !muted;
    setSoundMuted(nextMuted);
    setMuted(nextMuted);
    if (!nextMuted) playSound('flip');
  };

  const handleToggleLanguage = () => {
    playSound('flip');
    const nextLang = lang === 'en' ? 'tl' : 'en';
    setLang(nextLang);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-4 py-2.5">
      <div className="flex justify-between items-center max-w-md mx-auto">
        
        {/* Left Branding */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-purple-500/30">
            GE
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-wider text-purple-400 uppercase">GE403 STS</span>
              <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded font-bold">
                Stage {currentStageId}/5
              </span>
            </div>
            <h1 className="text-xs font-black text-slate-100 tracking-tight leading-tight">
              {lang === 'tl' ? 'Rebolusyong Siyentipiko' : 'Scientific Revolution'}
            </h1>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5">
          
          {/* Tagalog / English Switcher Toggle */}
          <button
            onClick={handleToggleLanguage}
            className="flex items-center gap-1 px-2 py-1 bg-purple-950 border border-purple-500/40 rounded-xl text-purple-200 font-extrabold text-xs touch-active shadow-sm"
            title="Switch Language (English / Tagalog)"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase text-[11px]">{lang === 'en' ? 'EN' : 'TL'}</span>
          </button>

          {/* XP Pill */}
          <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-500/40 px-2 py-1 rounded-xl text-amber-300 font-extrabold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>{xp}</span>
          </div>

          {/* Certificate Trigger if earned */}
          {badges.length > 1 && (
            <button
              onClick={onOpenCertificate}
              className="p-1.5 bg-purple-950 border border-purple-500/40 rounded-xl text-amber-300"
              title="Certificate & Badges"
            >
              <Award className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Joke Button */}
          <button
            onClick={triggerRandomJoke}
            className="p-1.5 bg-slate-900 border border-slate-800 rounded-xl text-purple-300"
            title="Science Joke"
          >
            <Smile className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300"
          >
            {!muted ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>
        </div>

      </div>

      {/* Joke Banner Popup */}
      {activeJoke && (
        <div className="mt-2 bg-gradient-to-r from-purple-900 to-indigo-900 border border-purple-500/30 p-2 rounded-xl text-center text-xs font-medium text-purple-100 flex items-center justify-between gap-2">
          <span>😂 "{activeJoke}"</span>
          <button onClick={() => setActiveJoke(null)} className="text-purple-300 font-bold text-xs">✕</button>
        </div>
      )}
    </header>
  );
}
