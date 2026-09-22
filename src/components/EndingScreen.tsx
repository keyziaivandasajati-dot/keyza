import React, { useEffect } from 'react';
import { Ending } from '../types';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { RotateCcw, Trophy, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface EndingScreenProps {
  ending: Ending;
  unlockedCount: number;
  totalEndings: number;
  onPlayAgain: () => void;
  onOpenGallery: () => void;
  onOpenBacklog: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  ending,
  unlockedCount,
  totalEndings,
  onPlayAgain,
  onOpenGallery,
  onOpenBacklog,
}) => {
  useEffect(() => {
    // Sound & celebratory particles
    sound.playSound('magic');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#38bdf8', '#a855f7'],
    });
  }, []);

  const getRarityBadge = (rarity: Ending['rarity']) => {
    switch (rarity) {
      case 'True Mystery':
        return 'bg-amber-950 text-amber-300 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      case 'Secret':
        return 'bg-purple-950 text-purple-300 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
      case 'Surreal':
        return 'bg-sky-950 text-sky-300 border-sky-400';
      case 'Absurd':
        return 'bg-emerald-950 text-emerald-300 border-emerald-400';
      case 'Common':
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-600';
    }
  };

  return (
    <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in overflow-y-auto">
      <div className="max-w-xl w-full bg-neutral-900 border-2 border-amber-500/70 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.2)] flex flex-col items-center my-auto">
        {/* Top Tag & Progress */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Ending Unlocked!
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getRarityBadge(ending.rarity)}`}>
            {ending.rarity}
          </span>
        </div>

        {/* Ending Code & Title */}
        <div className="text-xs font-mono text-neutral-400 tracking-widest uppercase mb-1">
          {ending.code} // ROUTE: {ending.route}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-200 tracking-wide mb-2 font-serif">
          {ending.title}
        </h1>

        {/* Tagline */}
        <div className="italic text-amber-400/90 text-sm sm:text-base font-medium mb-5">
          "{ending.tagline}"
        </div>

        {/* Full Narrative Resolution */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-neutral-300 leading-relaxed text-left mb-6 shadow-inner font-sans">
          {ending.description}
        </div>

        {/* Gallery Collection Stats Banner */}
        <div className="w-full bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3 mb-6 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Koleksi Ending:</span>
          </div>
          <span className="font-bold text-amber-400">
            {unlockedCount} dari {totalEndings} Selesai ({Math.round((unlockedCount / totalEndings) * 100)}%)
          </span>
        </div>

        {/* Action Controls */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold py-3 px-5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer text-sm sm:text-base active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Main Lagi (New Game)
          </button>

          <button
            onClick={onOpenGallery}
            className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold py-3 px-4 rounded-xl border border-neutral-600 hover:border-amber-400 transition-all cursor-pointer text-sm"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Galeri Ending ({unlockedCount}/{totalEndings})
          </button>

          <button
            onClick={onOpenBacklog}
            className="inline-flex items-center justify-center gap-2 bg-neutral-800/60 hover:bg-neutral-700/80 text-neutral-300 py-3 px-4 rounded-xl border border-neutral-700 transition-all cursor-pointer text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Baca Log
          </button>
        </div>
      </div>
    </div>
  );
};
