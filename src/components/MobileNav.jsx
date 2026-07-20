import React from 'react';
import { BookOpen, Brain, Sparkles, Key, Award, Compass } from 'lucide-react';
import { playSound } from '../utils/soundManager';

export default function MobileNav({ activeTab, setActiveTab, unlockedStages, currentStageId }) {
  const tabs = [
    { id: 'slides', label: 'Lessons', icon: BookOpen },
    { id: 'story', label: 'Story', icon: Compass },
    { id: 'memory', label: 'Match', icon: Brain },
    { id: 'sims', label: 'Lab Sim', icon: Sparkles },
    { id: 'exam', label: 'Door Quiz', icon: Key },
  ];

  return (
    <nav className="mobile-bottom-nav px-3 py-2 flex justify-around items-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              playSound('flip');
              setActiveTab(tab.id);
            }}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all touch-active ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span className="text-[10px] font-bold tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
