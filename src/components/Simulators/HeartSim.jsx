import React, { useState, useEffect } from 'react';
import { Heart, Activity, Play, RotateCcw } from 'lucide-react';

export default function HeartSim() {
  const [mode, setMode] = useState('harvey'); // 'harvey' | 'galen'
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 border border-rose-500/20 shadow-xl my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            William Harvey's Heart Pump Simulator
          </h4>
          <p className="text-xs text-slate-300">
            Compare Galen's ancient 'ebb & flow' theory with Harvey's continuous one-way mechanical pump!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setMode('harvey')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'harvey'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Harvey (Continuous One-Way Pump)
          </button>
          <button
            onClick={() => setMode('galen')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'galen'
                ? 'bg-slate-700 text-slate-300 hover:text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Galen (Ancient Ebb & Flow)
          </button>
        </div>
      </div>

      <div className="relative h-60 bg-slate-950/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Heart icon center */}
        <div className={`relative transition-transform duration-300 ${pulse ? 'scale-110' : 'scale-95'}`}>
          <div className="w-20 h-20 bg-rose-950/80 rounded-full border-2 border-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-rose-400">
            Heart Pump
          </span>
        </div>

        {/* Animated Circulation Flow lines */}
        {mode === 'harvey' ? (
          <div className="w-full flex justify-between items-center px-12 absolute inset-0 pointer-events-none">
            {/* Veins (Blue) coming in */}
            <div className="flex items-center gap-2 text-blue-400 animate-pulse">
              <span className="text-xs font-mono font-bold">Veins (Returning) ➔</span>
              <div className="w-24 h-1 bg-blue-500/60 rounded-full" />
            </div>

            {/* Arteries (Red) going out */}
            <div className="flex items-center gap-2 text-rose-400 animate-pulse">
              <div className="w-24 h-1 bg-rose-500/60 rounded-full" />
              <span className="text-xs font-mono font-bold">➔ Arteries (Pumping Out)</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center absolute inset-0 pointer-events-none text-amber-400 text-xs">
            <span className="animate-bounce font-mono">
              ↔ Back-and-Forth Ebb & Flow (Incorrect Ancient Myth) ↔
            </span>
          </div>
        )}

        <div className="absolute bottom-3 bg-slate-900/90 px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
          {mode === 'harvey' ? (
            <span className="text-rose-300">
              🩸 <strong>William Harvey (1628):</strong> Blood circulates in a <em>continuous one-way loop</em> driven by the heart!
            </span>
          ) : (
            <span className="text-amber-300">
              ⚠️ <strong>Ancient Galen View:</strong> Thought blood was constantly created in the liver and sloshed back and forth!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
