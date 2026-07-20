import React, { useState } from 'react';
import { Gauge, ArrowDown, Sparkles } from 'lucide-react';

export default function BarometerSim() {
  const [pressure, setPressure] = useState(760); // in mmHg / torr

  // Calculate liquid column height based on pressure slider
  const mercuryHeightPercent = Math.min(100, Math.max(10, (pressure / 1000) * 100));

  return (
    <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 shadow-xl my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-400" />
            Torricelli's Mercury Barometer Simulator
          </h4>
          <p className="text-xs text-slate-300">
            Adjust atmospheric pressure to see mercury move and reveal the <strong>vacuum</strong> space above!
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
          <span className="text-xs text-slate-400">Atmospheric Pressure:</span>
          <span className="text-lg font-extrabold text-emerald-400">{pressure} <span className="text-xs text-slate-300">torr (mmHg)</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Simulation Graphic */}
        <div className="md:col-span-2 relative h-64 bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-56 flex flex-col items-center justify-end">
            
            {/* Glass Tube Outer outline */}
            <div className="w-10 h-48 border-2 border-slate-400/50 rounded-t-full relative overflow-hidden bg-slate-900/40">
              
              {/* Vacuum Space Indicator */}
              <div 
                className="w-full bg-purple-950/80 transition-all duration-300 flex items-center justify-center"
                style={{ height: `${100 - mercuryHeightPercent}%` }}
              >
                {100 - mercuryHeightPercent > 15 && (
                  <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider animate-pulse">
                    VACUUM
                  </span>
                )}
              </div>

              {/* Liquid Mercury Column */}
              <div 
                className="w-full bg-gradient-to-t from-slate-400 via-slate-300 to-slate-200 transition-all duration-300 shadow-[0_0_15px_rgba(203,213,225,0.5)]"
                style={{ height: `${mercuryHeightPercent}%` }}
              />
            </div>

            {/* Inverted Dish Base */}
            <div className="w-28 h-8 bg-slate-700 rounded-b-xl border border-slate-500 relative flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-slate-400 to-slate-300 opacity-90" />
            </div>

            {/* Pressure Arrows pushing down on dish */}
            <div className="absolute top-12 left-0 right-0 flex justify-between px-1 text-emerald-400 animate-bounce">
              <ArrowDown className="w-5 h-5" />
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          <div className="ml-6 space-y-2 text-xs text-slate-300 max-w-xs">
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
              <strong className="text-emerald-400 block mb-1">💡 What's happening?</strong>
              Air pressure pushes DOWN on mercury in the dish, which forces mercury UP the glass tube!
            </div>
            <div className="bg-purple-950/40 p-2.5 rounded-lg border border-purple-500/30 text-purple-200">
              <strong className="text-purple-300 block mb-1">✨ Torricelli's Proof:</strong>
              The empty gap at top has NO AIR—proving <em>vacuums exist in nature</em>!
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-300">
            Control Air Pressure (torr):
          </label>
          <input 
            type="range" 
            min="400" 
            max="1000" 
            step="10"
            value={pressure} 
            onChange={(e) => setPressure(Number(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setPressure(760)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-medium border border-slate-700"
            >
              Standard (760 torr)
            </button>
            <button
              onClick={() => setPressure(500)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-medium border border-slate-700"
            >
              High Altitude (500)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
