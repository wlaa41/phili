import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  Award,
  Key,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundManager';

export default function CheckpointExam({ stage, onCompleteExam, onClose }) {
  const questions = stage.checkpoint.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: value }
  const [showHint, setShowHint] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const currentQ = questions[currentIndex];

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
          userAnswer: q.options[userAns] || "Unanswered",
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
          userAnswer: userAns || "Unanswered",
          correctAnswer: q.correctAnswer
        });
      } else if (q.type === 'essay') {
        // Essay auto-grading based on key point inclusions
        const normalizedEssay = (userAns || "").toLowerCase();
        let matchedKeyPoints = 0;
        q.keyPoints.forEach(kp => {
          if (normalizedEssay.includes(kp.toLowerCase())) matchedKeyPoints++;
        });

        // Points proportional to key points hit (minimum 10 points if written >= 15 words)
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
          userAnswer: userAns || "No response written",
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCompleteExam(stage.id, percentage);
    } else {
      playSound('wrong');
    }
  };

  // Helper for generating dynamic hints
  const getQuestionHint = (q) => {
    if (q.hint) return q.hint;
    if (q.type === 'mcq') {
      return `Think about the core lesson themes: Copernicus put the Sun at the center (1543), Gutenberg printed books, Vesalius mapped anatomy!`;
    }
    if (q.type === 'essay') {
      return `Include key terms like: ${q.keyPoints.slice(0, 3).join(', ')}. Complete sentences get maximum points!`;
    }
    return "Read the question carefully and check the keywords in the slide deck!";
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-purple-500/40 p-6 md:p-8 shadow-2xl relative animate-fade-in my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {stage.checkpoint.title}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-100">
              {stage.title} Exam Checkpoint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all text-xs font-bold"
          >
            Close ✕
          </button>
        </div>

        {/* Results Screen if submitted */}
        {isSubmitted && scoreResult ? (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="inline-block p-4 rounded-3xl bg-slate-900 border-2 border-purple-500/40 shadow-xl mb-2">
              {scoreResult.passed ? (
                <ShieldCheck className="w-16 h-16 text-emerald-400 animate-bounce" />
              ) : (
                <XCircle className="w-16 h-16 text-rose-400" />
              )}
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-100">
                {scoreResult.passed ? "🎉 Stage Door Unlocked!" : "⚡ Needs Review!"}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Your Score: <span className="text-2xl font-black text-amber-400">{scoreResult.percentage}%</span> (Passing Score: {stage.checkpoint.passingScore}%)
              </p>
            </div>

            {/* Score Breakdown List */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-left space-y-3 max-h-64 overflow-y-auto">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Detailed Answer Feedback:
              </h4>
              {scoreResult.questionFeedback.map((fb, idx) => (
                <div key={fb.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">Question {idx + 1} ({fb.type.toUpperCase()})</span>
                    {fb.type === 'essay' ? (
                      <span className="text-amber-400 font-extrabold">{fb.points} / {fb.maxPoints} pts</span>
                    ) : fb.isCorrect ? (
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                    ) : (
                      <span className="text-rose-400 font-extrabold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
                    )}
                  </div>
                  {fb.explanation && (
                    <p className="text-slate-400 text-[11px] italic">{fb.explanation}</p>
                  )}
                  {fb.sampleAnswer && (
                    <div className="bg-purple-950/40 p-2 rounded border border-purple-500/20 text-purple-200 text-[11px]">
                      <strong>Sample Answer:</strong> {fb.sampleAnswer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 pt-4">
              {scoreResult.passed ? (
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105"
                >
                  Proceed to Next Stage Door ➔
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setScoreResult(null);
                    setCurrentIndex(0);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Try Exam Again
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Question Screen */
          <div className="space-y-6">
            
            {/* Question Progress Header */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="uppercase text-amber-400 font-bold px-2 py-0.5 bg-amber-950/60 rounded border border-amber-500/30">
                Type: {currentQ.type.toUpperCase()}
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                {currentQ.question}
              </h4>
            </div>

            {/* PROMINENT GLOWING HINT BUTTON FOR ALL QUESTION TYPES */}
            <div>
              <button
                onClick={() => handleToggleHint(currentQ.id)}
                className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{showHint[currentQ.id] ? "Hide Clue / Hint" : "💡 Need a Clue / Hint?"}</span>
              </button>

              {showHint[currentQ.id] && (
                <div className="mt-2.5 bg-gradient-to-r from-amber-950/90 to-purple-950/90 border border-amber-500/40 p-3.5 rounded-xl text-xs text-amber-100 flex items-start gap-2 animate-fade-in shadow-lg">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block mb-0.5">💡 Professor's Clue:</strong>
                    <span>{getQuestionHint(currentQ)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* QUESTION TYPE 1: MULTIPLE CHOICE */}
            {currentQ.type === 'mcq' && (
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectMCQ(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-semibold transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-purple-900/60 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                          : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                        isSelected ? 'border-purple-400 bg-purple-500 text-white font-bold' : 'border-slate-700 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* QUESTION TYPE 2: IDENTIFICATION */}
            {currentQ.type === 'identification' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Type the exact name, term, or phrase here..."
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            )}

            {/* QUESTION TYPE 3: ESSAY */}
            {currentQ.type === 'essay' && (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  placeholder="Write your reflection / answer here in complete sentences..."
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>💡 Tip: Incorporate key terms and explanations to maximize your score!</span>
                  <span>Word count: {(answers[currentQ.id] || "").trim().split(/\s+/).filter(Boolean).length}</span>
                </div>
              </div>
            )}

            {/* Bottom Nav Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={calculateFinalGrade}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105"
                >
                  Submit & Unlock Stage Door ➔
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Next Question →
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
