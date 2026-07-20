import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy, Brain, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/soundManager';
import confetti from 'canvas-confetti';

const BILINGUAL_PAIRS = {
  en: [
    { id: 'p1', scientist: 'Nicolaus Copernicus', fact: 'Heliocentric Model (Sun at center, 1543)', icon: '☀️' },
    { id: 'p2', scientist: 'Andres Vesalius', fact: 'On the Fabric of the Human Body (Anatomy, 1543)', icon: '🫀' },
    { id: 'p3', scientist: 'Galileo Galilei', fact: "Observed Jupiter's 4 Moons with Telescope (1610)", icon: '🔭' },
    { id: 'p4', scientist: 'Francis Bacon', fact: 'Father of Empiricism & Scientific Method (1620)', icon: '🧪' },
    { id: 'p5', scientist: 'Evangelista Torricelli', fact: 'Mercury Barometer & Vacuum Discovery (torr)', icon: '🌡️' },
    { id: 'p6', scientist: 'William Harvey', fact: 'Discovered Heart is a Mechanical Pump (1628)', icon: '❤️' },
    { id: 'p7', scientist: 'François Viète', fact: 'Pioneered Symbolic Algebra (Vowels = Unknowns)', icon: '🔤' },
    { id: 'p8', scientist: 'John Napier', fact: 'Invented Logarithms & Decimal Point', icon: '🔢' }
  ],
  tl: [
    { id: 'p1', scientist: 'Nicolaus Copernicus', fact: 'Heliocentric Model (Araw sa gitna, 1543)', icon: '☀️' },
    { id: 'p2', scientist: 'Andres Vesalius', fact: 'Anatomiya ng Katawan ng Tao (1543)', icon: '🫀' },
    { id: 'p3', scientist: 'Galileo Galilei', fact: '4 na Buwan ng Jupiter at Teleskopyo (1610)', icon: '🔭' },
    { id: 'p4', scientist: 'Francis Bacon', fact: 'Ama ng Empiricism at Scientific Method (1620)', icon: '🧪' },
    { id: 'p5', scientist: 'Evangelista Torricelli', fact: 'Mercury Barometer at Vacuum (torr)', icon: '🌡️' },
    { id: 'p6', scientist: 'William Harvey', fact: 'Bomba ng Puso at Sirkulasyon ng Dugo (1628)', icon: '❤️' },
    { id: 'p7', scientist: 'François Viète', fact: 'Sistematikong Algebra (Vowels = Unknowns)', icon: '🔤' },
    { id: 'p8', scientist: 'John Napier', fact: 'Logarithms at Decimal Point', icon: '🔢' }
  ]
};

export default function MemoryGame({ lang = 'en', onRewardXP }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const activePairs = BILINGUAL_PAIRS[lang] || BILINGUAL_PAIRS.en;
  const isTl = lang === 'tl';

  // Initialize & shuffle deck
  const initializeGame = () => {
    playSound('flip');
    const deck = [];
    activePairs.forEach((pair) => {
      deck.push({
        uniqueId: pair.id + '-scientist',
        pairId: pair.id,
        type: 'scientist',
        text: pair.scientist,
        icon: pair.icon
      });
      deck.push({
        uniqueId: pair.id + '-fact',
        pairId: pair.id,
        type: 'fact',
        text: pair.fact,
        icon: '💡'
      });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [lang]);

  const handleCardClick = (index) => {
    // Prevent clicking if 2 cards already flipped, or if card is already flipped/matched
    if (
      flippedIndices.length >= 2 ||
      flippedIndices.includes(index) ||
      matchedIds.includes(cards[index].pairId)
    ) {
      return;
    }

    playSound('flip');
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          playSound('match');
          const newMatched = [...matchedIds, firstCard.pairId];
          setMatchedIds(newMatched);
          setFlippedIndices([]);

          if (newMatched.length === activePairs.length) {
            setIsWon(true);
            playSound('fanfare');
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            if (onRewardXP) onRewardXP(150);
          }
        }, 400);
      } else {
        // NO MATCH -> Flip back
        setTimeout(() => {
          playSound('wrong');
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="mobile-card p-4 md:p-6 shadow-2xl relative overflow-hidden space-y-4 max-w-md mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            {isTl ? 'Laro sa Memorya' : '1600s Memory Challenge'}
          </span>
          <h3 className="text-base font-black text-slate-100">
            {isTl ? 'Pag-isahin ang Siyentipiko at Teyorya!' : 'Match Scientist & Breakthrough!'}
          </h3>
        </div>

        <button
          onClick={initializeGame}
          className="p-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-xl text-slate-300 transition-all text-xs font-bold flex items-center gap-1 touch-active"
          title="Shuffle"
        >
          <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
          <span>{isTl ? 'I-shuffle' : 'Shuffle'}</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex justify-between items-center bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs">
        <span className="text-slate-400">
          {isTl ? 'Mga Galaw:' : 'Moves:'} <strong className="text-amber-400">{moves}</strong>
        </span>
        <span className="text-slate-400">
          {isTl ? 'Pares:' : 'Matched:'} <strong className="text-emerald-400">{matchedIds.length} / {activePairs.length}</strong>
        </span>
      </div>

      {/* Victory Banner */}
      {isWon && (
        <div className="p-4 bg-gradient-to-r from-amber-950 via-purple-950 to-emerald-950 border-2 border-amber-500 rounded-2xl text-center space-y-1 animate-bounce shadow-2xl">
          <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="text-lg font-black text-amber-200">🎉 {isTl ? 'Napakagaling!' : 'Memory Master Victory!'}</h4>
          <p className="text-[11px] text-slate-200">
            {isTl ? `Nahanap mo ang 8 pares sa ${moves} na galaw! +150 XP!` : `Matched all 8 pairs in ${moves} moves! +150 XP!`}
          </p>
        </div>
      )}

      {/* 4x4 Grid of Cards */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.pairId);
          const isMatched = matchedIds.includes(card.pairId);

          return (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              className="h-24 perspective-1000 cursor-pointer touch-active select-none"
            >
              <div
                className={`relative w-full h-full rounded-xl transition-transform duration-500 transform-style-3d shadow-md ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Face (Cover / Unflipped) */}
                <div className="absolute inset-0 bg-slate-900 border-2 border-slate-800 rounded-xl flex flex-col items-center justify-center p-1 backface-hidden shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-300 font-black text-xs">
                    ?
                  </div>
                </div>

                {/* Back Face (Flipped / Revealed) */}
                <div
                  className={`absolute inset-0 rounded-xl border-2 p-1.5 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 shadow-xl ${
                    isMatched
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-slate-900 border-purple-500 text-slate-100'
                  }`}
                >
                  <span className="text-base">{card.icon}</span>
                  <p className="text-[9px] font-bold leading-tight line-clamp-3">
                    {card.text}
                  </p>
                  <span className={`text-[8px] uppercase tracking-wider font-extrabold px-1 rounded ${
                    card.type === 'scientist' ? 'bg-amber-950 text-amber-300' : 'bg-indigo-950 text-indigo-300'
                  }`}>
                    {card.type === 'scientist' ? (isTl ? 'Siyentipiko' : 'Scientist') : (isTl ? 'Teyorya' : 'Fact')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
