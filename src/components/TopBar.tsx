import React, { useState } from 'react';
import { Volume2, VolumeX, Trophy, BookOpen, Save, Download, RotateCcw, Info, Footprints } from 'lucide-react';
import { sound } from '../utils/audio';
import { GameStateVariables } from '../types';

interface TopBarProps {
  locationName: string;
  unlockedEndingsCount: number;
  totalEndingsCount: number;
  variables: GameStateVariables;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenGallery: () => void;
  onOpenBacklog: () => void;
  onOpenSave: () => void;
  onOpenLoad: () => void;
  onRestart: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  locationName,
  unlockedEndingsCount,
  totalEndingsCount,
  variables,
  isMuted,
  onToggleSound,
  onOpenGallery,
  onOpenBacklog,
  onOpenSave,
  onOpenLoad,
  onRestart,
}) => {
  const [showStats, setShowStats] = useState(false);

  return (
    <header className="relative w-full z-30 bg-neutral-950/90 border-b border-neutral-800/80 px-3 sm:px-6 py-2.5 backdrop-blur-md flex items-center justify-between shadow-md">
      {/* Title & Location Info */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black tracking-wider text-xs sm:text-sm text-amber-300 uppercase truncate">
              Midnight at Room 13
            </span>
            <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800 text-[10px] font-mono text-red-400 font-bold animate-pulse">
              02:13 AM
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono truncate flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-ping" />
            {locationName}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Sandal Status Indicator */}
        {variables.sandal && (
          <div
            title="Sandal Karet Motel Terpasang di Kantong"
            className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 px-2 py-1 rounded-md text-xs font-mono font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse"
          >
            <Footprints className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Sandal 13</span>
          </div>
        )}

        {/* Stats Inspector Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playSound('click');
              setShowStats(!showStats);
            }}
            title="Lihat status & petunjuk variabel"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Clues: {variables.clues}</span>
          </button>

          {/* Stats Popover Dropdown */}
          {showStats && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-neutral-900 border border-neutral-700 rounded-xl p-3.5 shadow-2xl z-50 text-xs font-mono text-neutral-300 space-y-2">
              <div className="font-bold text-amber-400 border-b border-neutral-800 pb-1 flex justify-between">
                <span>STATUS KARAKTER:</span>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-neutral-500 hover:text-neutral-300 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div>Bravery: <span className="text-amber-300">{variables.bravery}</span></div>
                <div>Curiosity: <span className="text-cyan-300">{variables.curiosity}</span></div>
                <div>Trust: <span className="text-emerald-300">{variables.trust}</span></div>
                <div>Panic: <span className="text-red-400">{variables.panic}</span></div>
                <div>Clues: <span className="text-yellow-300">{variables.clues}</span></div>
                <div>Knowledge: <span className="text-purple-300">{variables.simulationKnowledge}</span></div>
              </div>
              <div className="pt-1.5 border-t border-neutral-800/80 text-[10px] text-neutral-400 italic">
                *Clues & Knowledge diperlukan untuk membuka True Mystery Ending.
              </div>
            </div>
          )}
        </div>

        {/* Backlog */}
        <button
          onClick={() => {
            sound.playSound('click');
            onOpenBacklog();
          }}
          title="Buka Log Percakapan"
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Log</span>
        </button>

        {/* Save & Load */}
        <button
          onClick={() => {
            sound.playSound('click');
            onOpenSave();
          }}
          title="Simpan Permainan"
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Save className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline">Save</span>
        </button>

        <button
          onClick={() => {
            sound.playSound('click');
            onOpenLoad();
          }}
          title="Muat Permainan"
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">Load</span>
        </button>

        {/* Ending Gallery */}
        <button
          onClick={() => {
            sound.playSound('click');
            onOpenGallery();
          }}
          title="Buka Galeri Ending"
          className="p-1.5 sm:px-3 sm:py-1 rounded-lg bg-amber-950/70 hover:bg-amber-900/80 border border-amber-600/60 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>{unlockedEndingsCount}/{totalEndingsCount}</span>
        </button>

        {/* Audio Mute / Unmute */}
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
            isMuted
              ? 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300'
              : 'bg-neutral-800 border-neutral-600 text-amber-300 hover:bg-neutral-700'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          <span className="hidden md:inline">{isMuted ? 'Mute' : 'Sound'}</span>
        </button>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          title="Ulangi dari awal (Restart)"
          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950/60 border border-neutral-700 hover:border-red-700 text-neutral-400 hover:text-red-300 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
