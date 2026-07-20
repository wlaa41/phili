import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ShieldCheck,
  Lightbulb,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundManager';

export default function CheckpointExam({ stage, lang, setLang, onCompleteExam, onClose }) {
  const questions = stage.checkpoint.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: value }
  const [showHint, setShowHint] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const currentQ = questions[currentIndex];
  const isTl = lang === 'tl';

  const handleSelectMCQ = (optionIndex) => {
    if (isSubmitted) return;
    playSound('flip');
    setAnswers({ ...answers, [currentQ.id]: optionIndex });
  };

  const handleTextChange = (value) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const handleToggleHint = (qId) => {
    playSound('hover');
    setShowHint((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleToggleLang = () => {
    playSound('flip');
    if (setLang) setLang(lang === 'en' ? 'tl' : 'en');
  };

  const handleNext = () => {
    playSound('flip');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playSound('flip');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateFinalGrade = () => {
    let earnedPoints = 0;
    const totalPoints = questions.length * 20; // Each question is worth 20%
    const questionFeedback = [];

    questions.forEach((q) => {
      const userAns = answers[q.id];

      if (q.type === 'mcq') {
        const isCorrect = userAns === q.correct;
        if (isCorrect) earnedPoints += 20;
        questionFeedback.push({
          id: q.id,
          type: 'mcq',
          isCorrect,
          question: q.question,
          userAnswer: userAns !== undefined ? q.options[userAns] : (isTl ? "Walang sagot" : "Unanswered"),
          correctAnswer: q.options[q.correct],
          explanation: q.explanation
        });
      } else if (q.type === 'identification') {
        const normalizedUser = (userAns || "").toLowerCase().trim();
        const matches = q.acceptableAnswers.some(ans => normalizedUser.includes(ans.toLowerCase()));
        if (matches) earnedPoints += 20;
        questionFeedback.push({
          id: q.id,
          type: 'identification',
          isCorrect: matches,
          question: q.question,
          userAnswer: userAns || (isTl ? "Walang sagot" : "Unanswered"),
          correctAnswer: q.correctAnswer
        });
      } else if (q.type === 'essay') {
        const normalizedEssay = (userAns || "").toLowerCase();
        let matchedKeyPoints = 0;
        q.keyPoints.forEach(kp => {
          if (normalizedEssay.includes(kp.toLowerCase())) matchedKeyPoints++;
        });

        const wordCount = (userAns || "").trim().split(/\s+/).filter(Boolean).length;
        let points = 0;
        if (wordCount >= 8) {
          const ratio = Math.min(1, matchedKeyPoints / Math.max(1, q.keyPoints.length));
          points = Math.round(10 + ratio * 10);
        }

        earnedPoints += points;
        questionFeedback.push({
          id: q.id,
          type: 'essay',
          points,
          maxPoints: 20,
          userAnswer: userAns || (isTl ? "Walang isinulat na sagot" : "No response written"),
          sampleAnswer: q.sampleAnswer,
          matchedKeyPoints,
          totalKeyPoints: q.keyPoints.length
        });
      }
    });

    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const passed = percentage >= stage.checkpoint.passingScore;

    setScoreResult({
      earnedPoints,
      totalPoints,
      percentage,
      passed,
      questionFeedback
    });

    setIsSubmitted(true);

    if (passed) {
      playSound('fanfare');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onCompleteExam(stage.id, percentage);
    } else {
      playSound('wrong');
    }
  };

  const getQuestionHint = (q) => {
    if (q.hint) return q.hint;
    if (q.type === 'mcq') {
      return isTl 
        ? "Isipin ang mga pangunahing aralin: Copernicus (Araw sa gitna, 1543), Gutenberg (printing press), Vesalius (anatomiya)!" 
        : "Think about the core lesson themes: Copernicus put the Sun at the center (1543), Gutenberg printed books, Vesalius mapped anatomy!";
    }
    if (q.type === 'essay') {
      return isTl 
        ? `Isama ang mga salitang: ${q.keyPoints.slice(0, 3).join(', ')}. Isulat sa kumpletong pangungusap!`
        : `Include key terms like: ${q.keyPoints.slice(0, 3).join(', ')}. Complete sentences get maximum points!`;
    }
    return isTl ? "Basahing mabuti ang tanong at tingnan ang mga salita sa slide deck!" : "Read the question carefully and check the keywords in the slide deck!";
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-purple-500/40 p-4 sm:p-6 shadow-2xl relative animate-fade-in my-auto max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Quiz Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3 shrink-0">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
              {stage.checkpoint.title}
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-100">
              {stage.title} Exam
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Tagalog Switcher Toggle Button */}
            <button
              onClick={handleToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-950 border border-purple-500/40 rounded-xl text-amber-300 font-extrabold text-xs touch-active shadow-sm min-h-[36px]"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase text-[11px]">{isTl ? 'TL 🇵🇭' : 'EN 🌐'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all text-xs font-bold min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Results Screen if submitted */}
        {isSubmitted && scoreResult ? (
          <div className="space-y-4 text-center animate-fade-in py-2">
            <div className="inline-block p-3 rounded-2xl bg-slate-900 border border-purple-500/40 shadow-xl">
              {scoreResult.passed ? (
                <ShieldCheck className="w-12 h-12 text-emerald-400 animate-bounce" />
              ) : (
                <XCircle className="w-12 h-12 text-rose-400" />
              )}
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-100">
                {scoreResult.passed 
                  ? (isTl ? "🎉 Nabuksan na ang Pinto!" : "🎉 Stage Door Unlocked!")
                  : (isTl ? "⚡ Kailangan pang Mag-aral!" : "⚡ Needs Review!")
                }
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isTl ? "Iyong Marka:" : "Your Score:"} <span className="text-lg font-black text-amber-400">{scoreResult.percentage}%</span> ({isTl ? "Kailangang Marka:" : "Passing:"} {stage.checkpoint.passingScore}%)
              </p>
            </div>

            {/* Score Breakdown List */}
            <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 text-left space-y-2 max-h-56 overflow-y-auto">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                {isTl ? "Pagsusuri sa Sagot:" : "Detailed Feedback:"}
              </h4>
              {scoreResult.questionFeedback.map((fb, idx) => (
                <div key={fb.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{isTl ? "Tanong" : "Question"} {idx + 1}</span>
                    {fb.type === 'essay' ? (
                      <span className="text-amber-400 font-extrabold">{fb.points} / {fb.maxPoints} pts</span>
                    ) : fb.isCorrect ? (
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {isTl ? "Tama" : "Correct"}</span>
                    ) : (
                      <span className="text-rose-400 font-extrabold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {isTl ? "Mali" : "Incorrect"}</span>
                    )}
                  </div>
                  {fb.explanation && (
                    <p className="text-slate-400 text-[11px] italic leading-snug">{fb.explanation}</p>
                  )}
                  {fb.sampleAnswer && (
                    <div className="bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20 text-purple-200 text-[11px] leading-snug">
                      <strong>{isTl ? "Modelong Sagot:" : "Sample Answer:"}</strong> {fb.sampleAnswer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              {scoreResult.passed ? (
                <button
                  onClick={onClose}
                  className="w-full min-h-[48px] py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg touch-active flex items-center justify-center gap-2"
                >
                  {isTl ? "Magpatuloy sa Susunod na Pinto ➔" : "Proceed to Next Stage Door ➔"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setScoreResult(null);
                    setCurrentIndex(0);
                  }}
                  className="w-full min-h-[48px] py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg touch-active flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> {isTl ? "Subukang Muli" : "Try Exam Again"}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Question Screen */
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            
            <div className="space-y-3">
              {/* Question Progress Header */}
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>{isTl ? "Tanong" : "Question"} {currentIndex + 1} / {questions.length}</span>
                <span className="uppercase text-amber-400 font-bold px-2 py-0.5 bg-amber-950 rounded border border-amber-500/30 text-[10px]">
                  {currentQ.type.toUpperCase()}
                </span>
              </div>

              {/* Question Text */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* PROMINENT GLOWING HINT BUTTON */}
              <div>
                <button
                  onClick={() => handleToggleHint(currentQ.id)}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all shadow-md touch-active"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                  <span>
                    {showHint[currentQ.id] 
                      ? (isTl ? "Itago ang Clue" : "Hide Clue / Hint") 
                      : (isTl ? "💡 Kailangan ng Clue / Hint?" : "💡 Need a Clue / Hint?")
                    }
                  </span>
                </button>

                {showHint[currentQ.id] && (
                  <div className="mt-2 bg-gradient-to-r from-amber-950 to-purple-950 border border-amber-500/40 p-3 rounded-xl text-xs text-amber-100 flex items-start gap-2 animate-fade-in shadow-lg">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block mb-0.5">{isTl ? "Clue ng Propesor:" : "Professor's Clue:"}</strong>
                      <span className="leading-snug block">{getQuestionHint(currentQ)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* QUESTION TYPE 1: MULTIPLE CHOICE */}
              {currentQ.type === 'mcq' && (
                <div className="space-y-2 pt-1">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = answers[currentQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectMCQ(optIdx)}
                        className={`w-full text-left min-h-[48px] py-3 px-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center gap-3 touch-active leading-snug whitespace-normal break-words shadow-sm ${
                          isSelected
                            ? 'bg-purple-900/70 border-purple-500 text-white shadow-lg shadow-purple-500/30 ring-1 ring-purple-400'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                          isSelected ? 'border-purple-400 bg-purple-500 text-white font-bold' : 'border-slate-700 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* QUESTION TYPE 2: IDENTIFICATION */}
              {currentQ.type === 'identification' && (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    placeholder={isTl ? "Isulat ang eksaktong pangalan o salita..." : "Type the exact name, term, or phrase here..."}
                    value={answers[currentQ.id] || ""}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full min-h-[48px] bg-slate-900 border border-slate-700 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              )}

              {/* QUESTION TYPE 3: ESSAY */}
              {currentQ.type === 'essay' && (
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={4}
                    placeholder={isTl ? "Isulat ang iyong sagot dito sa buong pangungusap..." : "Write your reflection / answer here in complete sentences..."}
                    value={answers[currentQ.id] || ""}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>💡 {isTl ? "Isama ang mga pangunahing salita!" : "Incorporate key terms to maximize score!"}</span>
                    <span>{isTl ? "Dami ng salita:" : "Words:"} {(answers[currentQ.id] || "").trim().split(/\s+/).filter(Boolean).length}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Nav Controls */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-800 gap-2 mt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-2xl text-xs font-bold disabled:opacity-30 border border-slate-800"
              >
                ← {isTl ? "Nakalipas" : "Previous"}
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={calculateFinalGrade}
                  className="min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg touch-active"
                >
                  {isTl ? "Ipasok ang Sagot ➔" : "Submit & Unlock ➔"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="min-h-[44px] px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-bold transition-all touch-active"
                >
                  {isTl ? "Susunod na Tanong →" : "Next Question →"}
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
