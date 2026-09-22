import React from 'react';
import { Choice, GameStateVariables } from '../types';
import { Lock, Sparkles, AlertCircle, Compass, ShieldAlert, Coffee } from 'lucide-react';
import { sound } from '../utils/audio';

interface ChoicesBoxProps {
  choices: Choice[];
  variables: GameStateVariables;
  onSelectChoice: (choice: Choice) => void;
}

export const ChoicesBox: React.FC<ChoicesBoxProps> = ({
  choices,
  variables,
  onSelectChoice,
}) => {
  if (!choices || choices.length === 0) return null;

  const checkRequirement = (req?: Partial<GameStateVariables>): boolean => {
    if (!req) return true;
    for (const [key, val] of Object.entries(req)) {
      const varKey = key as keyof GameStateVariables;
      if (typeof val === 'boolean') {
        if (variables[varKey] !== val) return false;
      } else if (typeof val === 'number') {
        if ((variables[varKey] as number) < val) return false;
      }
    }
    return true;
  };

  const getTagIcon = (tag?: string) => {
    switch (tag) {
      case 'Berani':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-400 mr-1.5" />;
      case 'Absurd':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400 mr-1.5" />;
      case 'Paranoid':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-400 mr-1.5" />;
      case 'Penasaran':
        return <Compass className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />;
      case 'Santai':
        return <Coffee className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />;
      case 'Secret':
        return <Sparkles className="w-3.5 h-3.5 text-yellow-400 mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-neutral-950/95 border-t border-neutral-800 p-4 sm:p-5 flex flex-col gap-2.5 z-20">
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1 mb-1">
        <span>TENTUKAN KEPUTUSANMU:</span>
        <span className="text-[11px] text-neutral-400">Pilihan menentukan jalan cerita</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {choices.map((choice, index) => {
          const isUnlocked = checkRequirement(choice.requirement);

          return (
            <button
              key={index}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  sound.playSound(choice.soundEffect || 'click');
                  onSelectChoice(choice);
                }
              }}
              className={`group relative text-left p-3.5 sm:p-4 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-neutral-900/90 hover:bg-neutral-800/95 border-neutral-700 hover:border-amber-500/70 shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.18)] cursor-pointer active:scale-[0.99]'
                  : 'bg-neutral-950/60 border-neutral-800/80 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Tag & Requirement Header */}
              <div className="flex items-center justify-between w-full mb-1.5 text-xs">
                <div className="flex items-center font-semibold">
                  {getTagIcon(choice.flavorTag)}
                  <span className="text-neutral-400 group-hover:text-amber-300 transition-colors">
                    {choice.flavorTag || 'Opsi'}
                  </span>
                </div>
                {!isUnlocked && (
                  <span className="inline-flex items-center text-[10px] text-red-400 font-mono gap-1 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/50">
                    <Lock className="w-3 h-3" />
                    Terkunci
                  </span>
                )}
              </div>

              {/* Choice Text */}
              <div className="text-sm sm:text-base font-medium text-neutral-100 group-hover:text-amber-200 transition-colors">
                {choice.text}
              </div>

              {/* Requirement Hint if locked */}
              {!isUnlocked && choice.requirementHint && (
                <div className="mt-2 text-[11px] text-neutral-400 font-mono">
                  🔒 {choice.requirementHint}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
