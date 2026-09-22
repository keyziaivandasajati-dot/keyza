import React from 'react';
import { SaveSlot, GameStateVariables } from '../types';
import { X, Save, Download, Trash2, Clock, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'save' | 'load';
  slots: (SaveSlot | null)[];
  currentSceneId: string;
  currentVariables: GameStateVariables;
  currentPreviewText: string;
  onSaveSlot: (slotIndex: number) => void;
  onLoadSlot: (slot: SaveSlot) => void;
  onDeleteSlot: (slotIndex: number) => void;
}

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  isOpen,
  onClose,
  mode,
  slots,
  onSaveSlot,
  onLoadSlot,
  onDeleteSlot,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            {mode === 'save' ? (
              <Save className="w-5 h-5 text-amber-400" />
            ) : (
              <Download className="w-5 h-5 text-emerald-400" />
            )}
            <h2 className="text-base sm:text-lg font-bold text-neutral-100">
              {mode === 'save' ? 'Simpan Permainan (Save Game)' : 'Muat Permainan (Load Game)'}
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

        {/* Slot List */}
        <div className="p-4 sm:p-6 space-y-3">
          {slots.map((slot, index) => {
            const slotNumber = index + 1;
            const isAuto = index === 0;

            return (
              <div
                key={index}
                className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                      {isAuto ? 'AUTO-SAVE' : `SLOT ${slotNumber}`}
                    </span>
                    {slot && (
                      <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(slot.timestamp).toLocaleTimeString('id-ID')}
                      </span>
                    )}
                  </div>

                  {slot ? (
                    <div>
                      <div className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="truncate">{slot.sceneTitle}</span>
                      </div>
                      <p className="text-xs text-neutral-400 italic truncate mt-0.5">
                        "{slot.previewText}"
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-neutral-500 italic">
                      Slot Kosong
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {mode === 'save' && !isAuto && (
                    <button
                      onClick={() => {
                        sound.playSound('magic');
                        onSaveSlot(index);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Simpan
                    </button>
                  )}

                  {mode === 'load' && slot && (
                    <button
                      onClick={() => {
                        sound.playSound('click');
                        onLoadSlot(slot);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Muat
                    </button>
                  )}

                  {slot && !isAuto && (
                    <button
                      onClick={() => {
                        sound.playSound('click');
                        onDeleteSlot(index);
                      }}
                      title="Hapus save ini"
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-300 border border-neutral-700 hover:border-red-700 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
