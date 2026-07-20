import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Lightbulb, 
  Brain, 
  Smile, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import OrbitSim from './Simulators/OrbitSim';
import BarometerSim from './Simulators/BarometerSim';
import AlgebraSim from './Simulators/AlgebraSim';
import HeartSim from './Simulators/HeartSim';
import { playSound } from '../utils/soundManager';

export default function SlideViewer({ stage, onTakeExam, isStageCleared }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeHoverFact, setActiveHoverFact] = useState(null);

  const currentSlide = stage.slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === stage.slides.length - 1;

  const handleNext = () => {
    playSound('flip');
    if (currentSlideIndex < stage.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setActiveHoverFact(null);
    }
  };

  const handlePrev = () => {
    playSound('flip');
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setActiveHoverFact(null);
    }
  };

  const handleHoverFactEnter = (factObj) => {
    playSound('hover');
    setActiveHoverFact(factObj);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      
      {/* Mobile Top Story Reel Progress Bars */}
      <div className="flex gap-1.5 px-1">
        {stage.slides.map((_, idx) => (
          <div key={idx} className="flex-1 story-bar">
            <div 
              className="story-bar-fill"
              style={{ width: idx < currentSlideIndex ? '100%' : idx === currentSlideIndex ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      {/* Main Mobile Card */}
      <div className="mobile-card p-5 relative overflow-hidden shadow-2xl space-y-4">
        
        {/* Card Category Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">
              {currentSlide.category}
            </span>
            <h2 className="text-xl font-black text-slate-100 leading-tight">
              {currentSlide.title}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono shrink-0 px-2 py-0.5 bg-slate-900 rounded-lg border border-slate-800">
            {currentSlideIndex + 1}/{stage.slides.length}
          </span>
        </div>

        {/* Slide Body Text */}
        <div className="text-slate-200 text-xs leading-relaxed space-y-3">
          <p className="font-medium text-slate-100 leading-normal">{currentSlide.content}</p>

          <ul className="space-y-2 pt-1">
            {currentSlide.bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0 mt-1" />
                <span className="text-slate-300 text-xs font-normal leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* PROMINENT MOBILE HOVER FACT CHIPS */}
        {currentSlide.hoverFacts && currentSlide.hoverFacts.length > 0 && (
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              Hover Facts & Gossip (Tap chips):
            </span>
            
            <div className="flex flex-wrap gap-2">
              {currentSlide.hoverFacts.map((factObj, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHoverFactEnter(factObj)}
                  className="min-h-[40px] px-3.5 py-2 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-1.5 touch-active shadow-sm"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{factObj.keyword}</span>
                </button>
              ))}
            </div>

            {/* Active Fact Drawer */}
            {activeHoverFact && (
              <div className="p-3.5 bg-gradient-to-r from-amber-950 to-purple-950 border border-amber-500/60 rounded-2xl animate-fade-in space-y-1 shadow-lg">
                <span className="text-[10px] font-black uppercase text-amber-400 block">
                  🔍 Secret: {activeHoverFact.keyword}
                </span>
                <p className="text-[11px] text-amber-100 font-medium leading-relaxed">
                  {activeHoverFact.fact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mini Interactive Simulators on mobile */}
        {stage.interactiveType === 'orbit' && currentSlideIndex === 2 && <OrbitSim />}
        {stage.interactiveType === 'barometer' && currentSlideIndex === 1 && <BarometerSim />}
        {stage.interactiveType === 'algebra' && currentSlideIndex === 1 && <AlgebraSim />}
        {stage.interactiveType === 'heart' && currentSlideIndex === 0 && <HeartSim />}

        {/* Mnemonic & Joke Cards */}
        {currentSlide.mnemonic && (
          <div className="bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/30 text-xs space-y-1">
            <span className="text-[10px] font-bold text-purple-300 uppercase block">
              🧠 Acronym: {currentSlide.mnemonic.title}
            </span>
            <div className="font-mono font-bold text-purple-200 text-xs">
              "{currentSlide.mnemonic.acronym}"
            </div>
            <p className="text-[11px] text-purple-300/80 leading-snug">{currentSlide.mnemonic.meaning}</p>
          </div>
        )}

        {/* Mobile Prev / Next Controls */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-800 gap-2">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="min-h-[44px] px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 disabled:opacity-30 font-bold text-xs touch-active flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          
          <button
            onClick={handleNext}
            disabled={isLastSlide}
            className="min-h-[44px] px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-xs touch-active flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Exam Trigger CTA */}
      <button
        onClick={() => {
          playSound('unlock');
          onTakeExam();
        }}
        className="w-full min-h-[52px] py-3.5 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2 touch-active"
      >
        <span>{isStageCleared ? "Retake Stage Door Exam" : `Take Stage ${stage.id} Door Exam`}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}
