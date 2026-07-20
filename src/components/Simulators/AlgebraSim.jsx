import React, { useState } from 'react';
import { Variable, CheckCircle2, HelpCircle } from 'lucide-react';

export default function AlgebraSim() {
  const [vowelVal, setVowelVal] = useState(5); // A = unknown
  const [consonantVal, setConsonantVal] = useState(3); // B = known

  // Viète equation: B * A + B = 18 => 3 * A + 3 = 18 => 3A = 15 => A = 5
  const result = consonantVal * vowelVal + consonantVal;

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 shadow-xl my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 flex items-center gap-2">
            <Variable className="w-5 h-5 text-cyan-400" />
            François Viète's Symbolic Algebra Decoder
          </h4>
          <p className="text-xs text-slate-300">
            Viète pioneered using <strong>VOWELS (A, E, I)</strong> for <em>unknowns</em> and <strong>CONSONANTS (B, C, D)</strong> for <em>knowns</em>!
          </p>
        </div>
        <div className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs text-cyan-300">
          16th-Century Innovation
        </div>
      </div>

      <div className="bg-slate-950/90 rounded-xl p-6 border border-slate-800 text-center space-y-4">
        <div className="text-2xl md:text-3xl font-mono font-bold tracking-widest text-slate-100 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-amber-400">B</span> × <span className="text-cyan-400">A</span> + <span className="text-amber-400">B</span> = <span className="text-emerald-400">{result}</span>
        </div>

        <div className="flex justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400" />
            <strong>A (Vowel):</strong> Unknown Quantity
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <strong>B (Consonant):</strong> Known Value
          </div>
        </div>

        {/* Sliders to test Viète's notation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left border-t border-slate-800">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold text-cyan-300 mb-2">
              Set Unknown Vowel <span className="font-mono text-cyan-400">A</span> = {vowelVal}
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={vowelVal}
              onChange={(e) => setVowelVal(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold text-amber-300 mb-2">
              Set Known Consonant <span className="font-mono text-amber-400">B</span> = {consonantVal}
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={consonantVal}
              onChange={(e) => setConsonantVal(Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
