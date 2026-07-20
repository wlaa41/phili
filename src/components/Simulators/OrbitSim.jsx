import React, { useState, useEffect } from 'react';
import { Sun, Globe, RotateCw, Sparkles } from 'lucide-react';

export default function OrbitSim() {
  const [model, setModel] = useState('heliocentric'); // 'geocentric' | 'heliocentric'
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + speed * 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [speed]);

  // Math for orbits
  const rad = (angle * Math.PI) / 180;
  
  // Geocentric: Earth at center (0,0), Sun orbits Earth at r=100
  // Heliocentric: Sun at center (0,0), Earth orbits Sun at r=70 (ellipse), Mars at r=120
  const earthX = model === 'heliocentric' ? Math.cos(rad) * 80 : 0;
  const earthY = model === 'heliocentric' ? Math.sin(rad) * 60 : 0;

  const sunX = model === 'heliocentric' ? 0 : Math.cos(rad) * 90;
  const sunY = model === 'heliocentric' ? 0 : Math.sin(rad) * 90;

  // Mars with epicycle in geocentric mode!
  const marsBaseX = model === 'heliocentric' ? Math.cos(rad * 0.5) * 130 : Math.cos(rad * 0.7) * 120;
  const marsBaseY = model === 'heliocentric' ? Math.sin(rad * 0.5) * 100 : Math.sin(rad * 0.7) * 120;
  
  // Epicycle offset for Geocentric Ptolemaic Mars
  const epicycleX = model === 'geocentric' ? Math.cos(rad * 3) * 25 : 0;
  const epicycleY = model === 'geocentric' ? Math.sin(rad * 3) * 25 : 0;

  const marsX = marsBaseX + epicycleX;
  const marsY = marsBaseY + epicycleY;

  return (
    <div className="glass-card rounded-2xl p-6 border border-purple-500/20 shadow-xl my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Interactive Orbit Simulator
          </h4>
          <p className="text-xs text-slate-300">
            Toggle between ancient Geocentric (Ptolemy) and revolutionary Heliocentric (Copernicus/Kepler)!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setModel('geocentric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              model === 'geocentric'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Geocentric (Earth Center)
          </button>
          <button
            onClick={() => setModel('heliocentric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              model === 'heliocentric'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Heliocentric (Sun Center)
          </button>
        </div>
      </div>

      {/* Orbit Canvas simulation view */}
      <div className="relative w-full h-72 bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Background stars grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />

        <svg className="w-full h-full" viewBox="-180 -140 360 280">
          {/* Orbits */}
          {model === 'heliocentric' ? (
            <>
              {/* Elliptical Earth orbit */}
              <ellipse cx="0" cy="0" rx="80" ry="60" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              {/* Elliptical Mars orbit */}
              <ellipse cx="0" cy="0" rx="130" ry="100" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            </>
          ) : (
            <>
              {/* Geocentric orbits */}
              <circle cx="0" cy="0" r="90" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx="0" cy="0" r="120" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
              {/* Ptolemy Epicycle path */}
              <circle cx={marsBaseX} cy={marsBaseY} r="25" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
            </>
          )}

          {/* Sun */}
          <g transform={`translate(${sunX}, ${sunY})`}>
            <circle r="16" fill="#f59e0b" className="animate-pulse" />
            <circle r="22" fill="#fbbf24" opacity="0.3" />
            <text x="0" y="28" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Sun</text>
          </g>

          {/* Earth */}
          <g transform={`translate(${earthX}, ${earthY})`}>
            <circle r="10" fill="#3b82f6" />
            <text x="0" y="20" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Earth</text>
          </g>

          {/* Mars */}
          <g transform={`translate(${marsX}, ${marsY})`}>
            <circle r="7" fill="#ef4444" />
            <text x="0" y="16" textAnchor="middle" fill="#fca5a5" fontSize="9">Mars</text>
          </g>
        </svg>

        {/* Informational overlay label */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          {model === 'heliocentric' ? (
            <span className="text-indigo-300 font-medium">
              ✨ <strong>Copernicus & Kepler:</strong> Planets orbit the Sun in smooth <em>ellipses</em>!
            </span>
          ) : (
            <span className="text-amber-300 font-medium">
              🌀 <strong>Ptolemy Geocentric:</strong> Needs artificial <em>epicycles</em> (mini-loops) to explain retrograde motion!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
