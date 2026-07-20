import React, { useState } from 'react';
import Header from './components/Header';
import SlideViewer from './components/SlideViewer';
import StageDoor from './components/StageDoor';
import CheckpointExam from './components/CheckpointExam';
import CertificateModal from './components/CertificateModal';
import MemoryGame from './components/MemoryGame';
import StoryIntroModal from './components/StoryIntroModal';
import MobileNav from './components/MobileNav';
import OrbitSim from './components/Simulators/OrbitSim';
import BarometerSim from './components/Simulators/BarometerSim';
import AlgebraSim from './components/Simulators/AlgebraSim';
import HeartSim from './components/Simulators/HeartSim';
import { LESSON_STAGES_BILINGUAL } from './data/lessonData';
import { playSound } from './utils/soundManager';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'tl'
  const [unlockedStages, setUnlockedStages] = useState([1]);
  const [currentStageId, setCurrentStageId] = useState(1);
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'story' | 'memory' | 'sims' | 'exam'
  const [xp, setXp] = useState(100);
  const [badges, setBadges] = useState(["Curious Explorer 🔍"]);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const activeStagesList = LESSON_STAGES_BILINGUAL[lang] || LESSON_STAGES_BILINGUAL.en;
  const currentStage = activeStagesList.find((s) => s.id === currentStageId) || activeStagesList[0];
  const isCurrentStageUnlocked = unlockedStages.includes(currentStageId);

  const handleCompleteExam = (stageId, scorePercentage) => {
    playSound('correct');

    const earnedXp = scorePercentage * 2;
    setXp((prev) => prev + earnedXp);

    if (!badges.includes(currentStage.badge)) {
      setBadges((prev) => [...prev, currentStage.badge]);
    }

    const nextStageId = stageId + 1;
    if (nextStageId <= activeStagesList.length) {
      if (!unlockedStages.includes(nextStageId)) {
        setUnlockedStages((prev) => [...prev, nextStageId]);
        setCurrentStageId(nextStageId);
        playSound('unlock');
      }
    } else {
      setShowCertificateModal(true);
    }
  };

  const handleRewardXP = (amount) => {
    setXp((prev) => prev + amount);
    if (!badges.includes("Memory Master 🧠")) {
      setBadges((prev) => [...prev, "Memory Master 🧠"]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Mobile Smartphone Frame Shell */}
      <div className="mobile-app-shell">
        
        {/* Mobile Top Header with Language Switcher */}
        <Header
          unlockedStages={unlockedStages}
          currentStageId={currentStageId}
          setCurrentStageId={setCurrentStageId}
          xp={xp}
          badges={badges}
          lang={lang}
          setLang={setLang}
          onOpenCertificate={() => setShowCertificateModal(true)}
        />

        {/* Main Body Screen */}
        <main className="p-4">
          
          {/* TAB 1: LESSON SLIDES */}
          {activeTab === 'slides' && (
            <div>
              {isCurrentStageUnlocked ? (
                <SlideViewer
                  stage={currentStage}
                  onTakeExam={() => setShowExamModal(true)}
                  isStageCleared={unlockedStages.includes(currentStage.id + 1) || currentStage.id === 5}
                />
              ) : (
                <StageDoor
                  stage={currentStage}
                  previousStageCompleted={unlockedStages.includes(currentStage.id - 1)}
                  onUnlockAttempt={() => playSound('unlock')}
                />
              )}
            </div>
          )}

          {/* TAB 2: TIME-TRAVEL STORY */}
          {activeTab === 'story' && (
            <StoryIntroModal
              stageId={currentStageId}
              lang={lang}
              onClose={() => setActiveTab('slides')}
            />
          )}

          {/* TAB 3: MEMORY MATCHING GAME */}
          {activeTab === 'memory' && (
            <MemoryGame onRewardXP={handleRewardXP} />
          )}

          {/* TAB 4: INTERACTIVE LAB SIMULATORS */}
          {activeTab === 'sims' && (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="text-center space-y-1 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                  {lang === 'tl' ? 'Galeriya ng Eksperimento' : 'Interactive Lab Gallery'}
                </span>
                <h3 className="text-xl font-black text-slate-100">
                  {lang === 'tl' ? 'Mga Siyentipikong Eksperimento' : 'Hands-On Experiments'}
                </h3>
              </div>
              <OrbitSim />
              <BarometerSim />
              <AlgebraSim />
              <HeartSim />
            </div>
          )}

          {/* TAB 5: DOOR QUIZ EXAM */}
          {activeTab === 'exam' && (
            <div className="max-w-md mx-auto text-center space-y-4 pt-4">
              <div className="mobile-card p-6 border border-amber-500/40 space-y-3">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  Door Checkpoint {currentStage.id}
                </span>
                <h3 className="text-xl font-black text-slate-100">
                  {currentStage.title} Exam
                </h3>
                <p className="text-xs text-slate-300">
                  {lang === 'tl' ? 'Pumasa nang 80%+ upang makuha ang susi sa susunod na pinto!' : 'Pass with 80%+ to unlock the key to Stage ' + (currentStage.id + 1) + '!'}
                </p>
                <button
                  onClick={() => setShowExamModal(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg touch-active"
                >
                  {lang === 'tl' ? 'Simulan ang Door Checkpoint Exam ➔' : 'Start Door Checkpoint Exam ➔'}
                </button>
              </div>
            </div>
          )}

        </main>

        {/* Mobile Bottom Navigation Dock */}
        <MobileNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unlockedStages={unlockedStages}
          currentStageId={currentStageId}
        />

        {/* Exam Checkpoint Modal with Language Props */}
        {showExamModal && (
          <CheckpointExam
            stage={currentStage}
            lang={lang}
            setLang={setLang}
            onCompleteExam={handleCompleteExam}
            onClose={() => setShowExamModal(false)}
          />
        )}

        {/* Certificate Modal */}
        {showCertificateModal && (
          <CertificateModal
            xp={xp}
            badges={badges}
            lang={lang}
            onClose={() => setShowCertificateModal(false)}
          />
        )}

      </div>

    </div>
  );
}
