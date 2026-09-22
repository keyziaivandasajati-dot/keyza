import React, { useState, useEffect, useRef } from 'react';
import { SpeakerId } from '../types';
import { ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface DialogueBoxProps {
  speaker: SpeakerId;
  text: string;
  isTyping: boolean;
  onFinishTyping: () => void;
  onNextLine?: () => void;
  hasNextLine?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  text,
  isTyping,
  onFinishTyping,
  onNextLine,
  hasNextLine,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<number | null>(null);
  const onFinishTypingRef = useRef(onFinishTyping);
  const completedTextRef = useRef<string>('');

  // Keep onFinishTyping reference fresh without triggering effect
  useEffect(() => {
    onFinishTypingRef.current = onFinishTyping;
  }, [onFinishTyping]);

  // Typing effect - ONLY runs when `text` changes
  useEffect(() => {
    // If this exact text was already completed, keep it displayed and don't re-type
    if (completedTextRef.current === text) {
      setDisplayedText(text);
      return;
    }

    // Clear any existing timer
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let index = 0;
    setDisplayedText('');

    const interval = window.setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        // Subtle tick sound every 4 characters
        if (index % 4 === 0) {
          sound.playSound('click');
        }
      } else {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        completedTextRef.current = text;
        setDisplayedText(text);
        onFinishTypingRef.current?.();
      }
    }, 18);

    intervalRef.current = interval;

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]);

  const handleBoxClick = () => {
    const isCurrentlyTyping = intervalRef.current !== null || displayedText.length < text.length;

    if (isCurrentlyTyping) {
      // Instant skip typing - cancel interval and complete text immediately
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      completedTextRef.current = text;
      setDisplayedText(text);
      sound.playSound('click');
      onFinishTypingRef.current?.();
    } else if (hasNextLine && onNextLine) {
      // Advance to next line
      sound.playSound('click');
      onNextLine();
    }
  };

  const isTextComplete = displayedText.length >= text.length && intervalRef.current === null;

  return (
    <div
      onClick={handleBoxClick}
      className="cursor-pointer relative w-full bg-gradient-to-b from-neutral-900/95 to-neutral-950/95 border-t-2 border-neutral-700/80 shadow-[0_-15px_40px_rgba(0,0,0,0.85)] p-4 sm:p-6 backdrop-blur-md transition-colors hover:border-neutral-600"
    >
      {/* Speaker Name Badge */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className={`inline-flex items-center px-3.5 py-1 rounded-md text-xs sm:text-sm font-bold tracking-wide uppercase border shadow-sm ${getSpeakerBadgeStyles(speaker)}`}>
          <span>{speaker}</span>
        </div>
        
        {/* Helper Hint */}
        <span className="text-[11px] font-mono text-neutral-400 select-none hidden sm:inline-block">
          {!isTextComplete ? 'Klik untuk percepat' : hasNextLine ? 'Klik untuk lanjut ▼' : 'Tentukan pilihanmu di bawah'}
        </span>
      </div>

      {/* Main Dialogue Content */}
      <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-neutral-100 min-h-[4rem] tracking-wide select-none font-sans">
        {displayedText}
        {!isTextComplete && <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse" />}
      </p>

      {/* Next indicator arrow */}
      {hasNextLine && isTextComplete && (
        <div className="absolute right-6 bottom-4 flex items-center gap-1 text-amber-400 animate-bounce">
          <span className="text-xs font-mono font-semibold">Lanjut</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

function getSpeakerBadgeStyles(speaker: SpeakerId): string {
  switch (speaker) {
    case 'You':
      return 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]';
    case 'The Closet Person':
      return 'bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
    case 'The Guard':
      return 'bg-amber-950 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
    case 'Ice Cream Man':
      return 'bg-sky-950 text-pink-300 border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.25)]';
    case 'The Goat':
      return 'bg-purple-950 text-amber-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.25)]';
    case 'Mirror You':
      return 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-500/50 shadow-[0_0_12px_rgba(217,70,239,0.25)]';
    case 'Walkie-Talkie':
    case 'CCTV Voice':
      return 'bg-red-950 text-red-300 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.25)] font-mono';
    case 'System':
    case 'Intercom':
      return 'bg-stone-900 text-yellow-300 border-yellow-500/50 font-mono tracking-widest';
    case 'Narrator':
    default:
      return 'bg-neutral-800 text-neutral-300 border-neutral-600/50';
  }
}
