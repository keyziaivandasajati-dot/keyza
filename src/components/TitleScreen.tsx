import React from 'react';
import { Play, RotateCcw, Trophy, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface TitleScreenProps {
  hasSavedGame: boolean;
  unlockedCount: number;
  totalEndings: number;
  onNewGame: () => void;
  onContinue: () => void;
  onOpenGallery: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  hasSavedGame,
  unlockedCount,
  totalEndings,
  onNewGame,
  onContinue,
  onOpenGallery,
}) => {
  return (
    <div className="relative w-full h-full bg-[#0b0f19] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none">
      {/* Background Ambience & Rain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a12] via-[#0f172a] to-[#1a130f]" />
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

      {/* Heavy Rain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -inset-y-full inset-x-0 w-full h-[200%] animate-[rain_0.7s_linear_infinite] bg-[repeating-linear-gradient(105deg,transparent,transparent_20px,rgba(200,230,255,0.45)_21px,rgba(200,230,255,0.45)_22px)]" />
      </div>

      {/* Top Banner */}
      <div className="relative z-10 w-full flex justify-between items-center text-xs font-mono text-amber-400/80 border-b border-amber-900/40 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>MOTEL CENDANA ASRI // 02:13 AM</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Audio Aktif</span>
        </div>
      </div>

      {/* Title & Dramatic Hero Section */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono text-amber-400 mb-4 tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Visual Novel • Misteri • Komedi • Survival
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-100 tracking-wider font-serif uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] mb-3 leading-tight">
          Midnight <br className="sm:hidden" />
          <span className="text-amber-400 drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
            at Room 13
          </span>
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-lg leading-relaxed font-sans mb-8">
          Kamu menginap sendirian di sebuah motel tua. Pukul 02:13, suara ketukan ganjil terdengar dari dalam lemari. Pilihanmu menentukan apakah kamu bertahan hidup, memecahkan simulasi, atau terjebak dalam kamping sosis di atap.
        </p>

        {/* Menu Actions */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <button
            onClick={() => {
              sound.playSound('door');
              onNewGame();
            }}
            className="w-full group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold py-3.5 px-6 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all cursor-pointer text-base active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Mulai Cerita Baru (New Game)</span>
          </button>

          {hasSavedGame && (
            <button
              onClick={() => {
                sound.playSound('click');
                onContinue();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 font-semibold py-3 px-6 rounded-xl border border-neutral-700 hover:border-amber-400 transition-all cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Lanjutkan Permainan (Continue)</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playSound('click');
              onOpenGallery();
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950/80 hover:bg-neutral-900 text-amber-300 font-medium py-2.5 px-6 rounded-xl border border-amber-900/50 hover:border-amber-600 transition-all cursor-pointer text-xs"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Galeri Ending ({unlockedCount} / {totalEndings} Selesai)</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-400 border-t border-neutral-900 pt-4 gap-2 font-mono">
        <span>14 Branching Endings • Sistem Pilihan Bebas • Tanpa Sprite • Dialog Bahasa Indonesia</span>
        <span className="text-amber-400/70">Klik di mana saja untuk mengaktifkan audio visual novel</span>
      </div>
    </div>
  );
};
