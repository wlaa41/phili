import React, { useState } from 'react';
import { Award, Printer } from 'lucide-react';

export default function CertificateModal({ xp, badges, lang = 'en', onClose }) {
  const [studentName, setStudentName] = useState(lang === 'tl' ? "Dalubhasa ng STS" : "Scholar of STS");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full glass-panel rounded-3xl border-2 border-amber-500/50 p-6 shadow-2xl relative text-center my-6 space-y-4">
        
        {/* Certificate Header Stamp */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-slate-950 font-black shadow-xl shadow-amber-500/30">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500/40">
            Ramon Magsaysay Memorial Colleges - Marbel, Inc.
          </span>
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
            {lang === 'tl' ? 'Katibayan ng Kaganapan sa Rebolusyong Siyentipiko' : 'Certificate of Scientific Revolution Mastery'}
          </h2>
          <p className="text-[10px] text-slate-400">
            GE403 – Science, Technology, and Society | 1st Semester AY 2025–2026
          </p>
        </div>

        {/* Certificate Body */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-amber-500/30 space-y-3 text-slate-200 text-xs">
          <p>{lang === 'tl' ? 'Pinatutunayan nito na si' : 'This certifies that'}</p>
          
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="text-xl font-black text-amber-300 bg-transparent border-b-2 border-amber-500 text-center focus:outline-none w-full py-1"
          />

          <p className="text-[11px] text-slate-300 leading-relaxed">
            {lang === 'tl' 
              ? 'ay matagumpay na nakapasa sa lahat ng 5 Stage Door Checkpoints at naipakita ang buong kaalaman sa Rebolusyong Siyentipiko—kabilang sina Copernicus, Galileo, Kepler, Vesalius, Harvey, Bacon, Torricelli, Viète, at Napier!'
              : 'has successfully conquered all 5 Stage Locked Checkpoints and demonstrated complete mastery over the Scientific Revolution—including Copernicus, Galileo, Kepler, Vesalius, Harvey, Bacon, Torricelli, Viète, and Napier!'
            }
          </p>

          <div className="pt-1 flex justify-center gap-4 text-xs text-amber-400 font-bold">
            <span>🏆 Total: {xp} XP</span>
            <span>🎓 Status: Master Scholar</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2 pt-1">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg"
          >
            {lang === 'tl' ? 'Magpatuloy' : 'Continue'}
          </button>
        </div>

      </div>
    </div>
  );
}
