import React from 'react';
import { BacklogEntry } from '../types';
import { X, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface BacklogModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: BacklogEntry[];
}

export const BacklogModal: React.FC<BacklogModalProps> = ({
  isOpen,
  onClose,
  entries,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-100">
              Riwayat Percakapan (Backlog)
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playSound('click');
              onClose();
            }}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {entries.length === 0 ? (
            <div className="text-center text-neutral-500 py-8 text-sm">
              Belum ada riwayat dialog.
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div key={idx} className="border-b border-neutral-800/80 pb-3 last:border-0">
                <div className="text-xs font-bold text-amber-400 font-mono mb-1 uppercase tracking-wider">
                  {entry.speaker}:
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                  {entry.text}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-neutral-950 border-t border-neutral-800 text-right">
          <button
            onClick={() => {
              sound.playSound('click');
              onClose();
            }}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
