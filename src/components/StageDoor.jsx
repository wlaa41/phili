import React from 'react';
import { Lock, Key, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

export default function StageDoor({ stage, previousStageCompleted, onUnlockAttempt }) {
  return (
    <div className="max-w-3xl mx-auto my-12 p-8 glass-panel rounded-3xl border border-purple-500/30 text-center relative overflow-hidden shadow-2xl animate-glow">
      {/* Background glowing keyhole accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Stage Lock Icon Graphic */}
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 rounded-3xl bg-slate-900 border-2 border-purple-500/40 flex items-center justify-center shadow-xl mx-auto text-purple-400 animate-float">
          <Lock className="w-12 h-12 text-amber-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-xl shadow-lg font-bold text-xs flex items-center gap-1">
          <Key className="w-4 h-4" /> Locked Door
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/30">
          Stage {stage.id} Gatekeeper
        </span>
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200">
          {stage.title}
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          {stage.description}
        </p>
      </div>

      {/* Unlock condition requirement card */}
      <div className="bg-slate-900/80 rounded-2xl p-4 max-w-lg mx-auto border border-slate-800 text-left mb-8 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-slate-200">Door Pass Code Requirement:</h4>
          <p className="text-slate-400">
            You must pass the <strong>Stage {stage.id - 1} Checkpoint Exam</strong> with a score of 80% or higher to receive the golden key to this stage.
          </p>
        </div>
      </div>

      {/* Action Button */}
      {previousStageCompleted ? (
        <button
          onClick={onUnlockAttempt}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
        >
          <Key className="w-5 h-5 text-slate-950" />
          <span>Insert Key & Unlock Door {stage.id}</span>
        </button>
      ) : (
        <div className="text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-500/30 px-6 py-3 rounded-xl inline-flex items-center gap-2">
          🔒 Clear Stage {stage.id - 1} Checkpoint Quiz First!
        </div>
      )}
    </div>
  );
}
