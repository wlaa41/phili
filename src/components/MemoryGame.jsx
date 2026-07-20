import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy, Brain, CheckCircle2, Award } from 'lucide-react';
import { playSound } from '../utils/soundManager';
import confetti from 'canvas-confetti';

const MEMORY_PAIRS = [
  {
    id: 'p1',
    scientist: 'Nicolaus Copernicus',
    fact: 'Heliocentric Model (Sun at center, 1543)',
    icon: '☀️',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'p2',
    scientist: 'Andres Vesalius',
    fact: 'On the Fabric of the Human Body (Anatomy, 1543)',
    icon: '🫀',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'p3',
    scientist: 'Galileo Galilei',
    fact: "Observed Jupiter's 4 Moons with Telescope (1610)",
    icon: '🔭',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'p4',
    scientist: 'Francis Bacon',
    fact: 'Father of Empiricism & Scientific Method (1620)',
    icon: '🧪',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'p5',
    scientist: 'Evangelista Torricelli',
    fact: 'Mercury Barometer & Vacuum Discovery (torr)',
    icon: '🌡️',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'p6',
    scientist: 'William Harvey',
    fact: 'Discovered Heart is a Mechanical Blood Pump (1628)',
    icon: '❤️',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'p7',
    scientist: 'François Viète',
    fact: 'Pioneered Symbolic Algebra (Vowels = Unknowns)',
    icon: '🔤',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'p8',
    scientist: 'John Napier',
    fact: 'Invented Logarithms & Popularized Decimal Point',
    icon: '🔢',
    color: 'from-yellow-500 to-amber-600'
  }
];

export default function MemoryGame({ onRewardXP }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize & shuffle cards
  const initializeGame = () => {
    playSound('flip');
    const deck = [];
    MEMORY_PAIRS.forEach((pair) => {
      deck.push({
        uniqueId: pair.id + '-scientist',
        pairId: pair.id,
        type: 'scientist',
        text: pair.scientist,
        icon: pair.icon,
        color: pair.color
      });
      deck.push({
        uniqueId: pair.id + '-fact',
        pairId: pair.id,
        type: 'fact',
        text: pair.fact,
        icon: '💡',
        color: pair.color
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
  }, []);

  const handleCardClick = (index) => {
    // Ignore if already flipped 2 cards, or if clicking already matched/flipped card
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIds.includes(cards[index].pairId)) {
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
        // MATCH FOUND!
        setTimeout(() => {
          playSound('match');
          const newMatched = [...matchedIds, firstCard.pairId];
          setMatchedIds(newMatched);
          setFlippedIndices([]);

          // Check Win condition
          if (newMatched.length === MEMORY_PAIRS.length) {
            setIsWon(true);
            playSound('fanfare');
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            if (onRewardXP) onRewardXP(150);
          }
        }, 500);
      } else {
        // WRONG MATCH
        setTimeout(() => {
          playSound('wrong');
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-purple-500/30 my-8 shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-300 rounded-full text-xs font-bold mb-1">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            1600s Memory Challenge Mini-Game
          </div>
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200">
            Flip & Match Scientific Revolutions!
          </h3>
          <p className="text-xs text-slate-300">
            Flip 2 matching cards to link the Scientist with their breakthrough discovery!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Moves</span>
            <span className="text-lg font-black text-amber-400">{moves}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Matches</span>
            <span className="text-lg font-black text-emerald-400">{matchedIds.length} / {MEMORY_PAIRS.length}</span>
          </div>
          <button
            onClick={initializeGame}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5"
            title="Reshuffle & Restart"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="mb-6 p-6 bg-gradient-to-r from-amber-950/90 via-purple-950/90 to-emerald-950/90 border-2 border-amber-500/50 rounded-2xl text-center space-y-2 animate-bounce shadow-2xl">
          <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
          <h4 className="text-2xl font-black text-amber-200">🎉 Memory Mastermind Victory!</h4>
          <p className="text-xs text-slate-200">
            You matched all 8 Scientific Revolution discoveries in <strong>{moves} moves</strong>! +150 XP Earned!
          </p>
        </div>
      )}

      {/* 4x4 Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.pairId);
          const isMatched = matchedIds.includes(card.pairId);

          return (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              className="h-28 md:h-32 perspective-1000 cursor-pointer group"
            >
              <div
                className={`relative w-full h-full rounded-2xl transition-all duration-500 transform-style-3d shadow-lg ${
                  isFlipped ? 'rotate-y-180' : 'hover:scale-105'
                }`}
              >
                {/* Front of Card (Hidden Face / Question Mark) */}
                <div className="absolute inset-0 bg-slate-900 border-2 border-slate-800 group-hover:border-purple-500/50 rounded-2xl flex flex-col items-center justify-center p-3 backface-hidden shadow-inner">
                  <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 font-black text-lg mb-1">
                    ?
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">Flip Card</span>
                </div>

                {/* Back of Card (Flipped Revealed Face) */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 p-3 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 shadow-xl ${
                    isMatched
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900 border-purple-500/60 text-slate-100'
                  }`}
                >
                  <span className="text-2xl mt-1">{card.icon}</span>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    {card.text}
                  </p>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                    card.type === 'scientist' ? 'bg-amber-950 text-amber-300' : 'bg-indigo-950 text-indigo-300'
                  }`}>
                    {card.type === 'scientist' ? 'Scientist' : 'Discovery'}
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
