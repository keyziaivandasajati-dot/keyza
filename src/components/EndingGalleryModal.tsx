import React from 'react';
import { Ending } from '../types';
import { ALL_ENDINGS } from '../data/endings';
import { X, Trophy, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface EndingGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedEndingIds: string[];
}

export const EndingGalleryModal: React.FC<EndingGalleryModalProps> = ({
  isOpen,
  onClose,
  unlockedEndingIds,
}) => {
  if (!isOpen) return null;

  const unlockedSet = new Set(unlockedEndingIds);
  const total = ALL_ENDINGS.length;
  const unlockedCount = ALL_ENDINGS.filter((e) => unlockedSet.has(e.id)).length;
  const percentage = Math.round((unlockedCount / total) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border-2 border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-200">
                Galeri Ending ({unlockedCount} / {total})
              </h2>
              <p className="text-xs text-neutral-400">
                Temukan seluruh 14 ending untuk mengungkap seluruh misteri motel
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSound('click');
              onClose();
            }}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center gap-4">
          <div className="flex-1 bg-neutral-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 min-w-[3rem] text-right">
            {percentage}%
          </span>
        </div>

        {/* Ending Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {ALL_ENDINGS.map((ending) => {
            const isUnlocked = unlockedSet.has(ending.id);

            return (
              <div
                key={ending.id}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-neutral-950/90 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.08)]'
                    : 'bg-neutral-950/40 border-neutral-800/80 opacity-60'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {ending.code}
                  </span>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      <CheckCircle2 className="w-3 h-3" />
                      Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-neutral-100 mb-1">
                  {isUnlocked ? ending.title : '??? — Locked'}
                </h3>

                {/* Tagline / Clue */}
                <p className="text-xs text-amber-300/80 italic mb-2">
                  {isUnlocked
                    ? `"${ending.tagline}"`
                    : getEndingHint(ending.id)}
                </p>

                {/* Description or mystery hint */}
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {isUnlocked
                    ? ending.description
                    : 'Jelajahi pilihan rute lain untuk membuka ending ini.'}
                </p>

                {isUnlocked && (
                  <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>Route: {ending.route}</span>
                    <span className="text-amber-400 font-semibold">{ending.rarity}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400">
          <div className="flex items-center gap-1 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tips: Setiap pilihan di Room 13 membawa ke route berbeda.</span>
          </div>
          <button
            onClick={() => {
              sound.playSound('click');
              onClose();
            }}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg font-medium cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

function getEndingHint(id: string): string {
  switch (id) {
    case 'ENDING_A':
      return 'Petunjuk: Matikan tombol utama di Ruang Kontrol Bawah Tanah.';
    case 'ENDING_B':
      return 'Petunjuk: Ada tombol kuning di Ruang Kontrol untuk yang lapar.';
    case 'ENDING_C':
      return 'Petunjuk: Apa jadinya kalau tombol merah & kuning ditekan bersamaan?';
    case 'ENDING_D':
      return 'Petunjuk: Masuklah ke dapur motel dan buat sesuatu yang gurih.';
    case 'ENDING_E':
      return 'Petunjuk: Gunakan sandal hijau motel pada scanner digital.';
    case 'ENDING_F':
      return 'Petunjuk: Tatap cermin kamar mandi Room 13.';
    case 'ENDING_G':
      return 'Petunjuk: Bicaralah dengan sosok di cermin sambil memegang sandal.';
    case 'ENDING_H':
      return 'Petunjuk: Temui pria kedinginan di dalam freezer dapur.';
    case 'ENDING_I':
      return 'Petunjuk: Dengarkan suara ketukan lemari... lalu kembali tidur santai.';
    case 'ENDING_J':
      return 'Petunjuk: Lari menembus hutan malam lewat tangga darurat.';
    case 'ENDING_K':
      return 'Petunjuk: Ikuti kambing misterius yang makan brosur di lorong.';
    case 'ENDING_L':
      return 'Petunjuk: Temui Pak Satpam di atap motel saat hujan.';
    case 'ENDING_M':
      return 'Petunjuk: Kumpulkan 3 clue dan akses terminal SUBJECT_LOGS di Ruang Kontrol.';
    case 'ENDING_N':
      return 'Petunjuk: Keluar motel dengan santai menuju mobilmu.';
    default:
      return 'Petunjuk: Masih belum diketahui.';
  }
}
