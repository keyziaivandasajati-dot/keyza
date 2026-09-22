/**
 * MIDNIGHT AT ROOM 13
 * Visual Novel Misteri × Komedi × Survival
 */

import { useState, useEffect, useCallback } from 'react';
import { Scene, Choice, GameStateVariables, BacklogEntry, SaveSlot } from './types';
import { STORY_SCENES, INITIAL_VARIABLES } from './data/storyData';
import { ALL_ENDINGS } from './data/endings';
import { sound } from './utils/audio';

import { SceneBackground } from './components/SceneBackground';
import { DialogueBox } from './components/DialogueBox';
import { ChoicesBox } from './components/ChoicesBox';
import { EndingScreen } from './components/EndingScreen';
import { EndingGalleryModal } from './components/EndingGalleryModal';
import { BacklogModal } from './components/BacklogModal';
import { SaveLoadModal } from './components/SaveLoadModal';
import { TopBar } from './components/TopBar';
import { TitleScreen } from './components/TitleScreen';

const STORAGE_ENDINGS_KEY = 'midnight_room13_unlocked_endings';
const STORAGE_SLOTS_KEY = 'midnight_room13_save_slots';
const STORAGE_AUTOSAVE_KEY = 'midnight_room13_autosave';

export default function App() {
  // Navigation / screen view state
  const [viewState, setViewState] = useState<'title' | 'playing' | 'ending'>('title');
  const [currentSceneId, setCurrentSceneId] = useState<string>('prologue_start');
  const [dialogueLineIndex, setDialogueLineIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  // Game progression variables
  const [variables, setVariables] = useState<GameStateVariables>(INITIAL_VARIABLES);

  // Backlog / conversation history
  const [backlog, setBacklog] = useState<BacklogEntry[]>([]);

  // Persistent storage state
  const [unlockedEndings, setUnlockedEndings] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ENDINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [saveSlots, setSaveSlots] = useState<(SaveSlot | null)[]>([null, null, null, null]);

  // Audio mute state
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals state
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isBacklogOpen, setIsBacklogOpen] = useState<boolean>(false);
  const [saveLoadMode, setSaveLoadMode] = useState<'save' | 'load' | null>(null);

  // Load save slots on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SLOTS_KEY);
      if (saved) {
        setSaveSlots(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load save slots:', e);
    }
  }, []);

  // Save unlocked endings whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ENDINGS_KEY, JSON.stringify(unlockedEndings));
    } catch (e) {
      console.error('Failed to persist unlocked endings:', e);
    }
  }, [unlockedEndings]);

  // Current active scene
  const currentScene: Scene = STORY_SCENES[currentSceneId] || STORY_SCENES['prologue_start'];

  // Current active dialogue line in progressive scenes
  const hasDialogueLines = currentScene.dialogueLines && currentScene.dialogueLines.length > 0;
  const currentSpeaker = hasDialogueLines
    ? currentScene.dialogueLines![dialogueLineIndex]?.speaker || currentScene.speaker
    : currentScene.speaker;
  const currentText = hasDialogueLines
    ? currentScene.dialogueLines![dialogueLineIndex]?.text || currentScene.text
    : currentScene.text;
  const hasNextLine = hasDialogueLines && dialogueLineIndex < currentScene.dialogueLines!.length - 1;

  // Background music management
  useEffect(() => {
    if (viewState === 'title') {
      sound.setMusic('ambient');
    } else if (viewState === 'playing') {
      sound.setMusic(currentScene.music || 'ambient');
    }
  }, [viewState, currentScene.music]);

  // Screen sound effect trigger on scene load or line change
  useEffect(() => {
    if (viewState === 'playing') {
      const currentLineObj = hasDialogueLines
        ? currentScene.dialogueLines![dialogueLineIndex]
        : null;

      const effectSound = currentLineObj?.soundEffect || currentScene.soundEffect;
      if (effectSound) {
        sound.playSound(effectSound);
      }

      // Record to backlog
      setBacklog((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.text === currentText) return prev;
        return [...prev, { speaker: currentSpeaker, text: currentText, sceneId: currentScene.id }];
      });

      // Auto-save progress
      if (!currentScene.endingId) {
        try {
          const autoSlot: SaveSlot = {
            id: 0,
            timestamp: Date.now(),
            sceneId: currentScene.id,
            sceneTitle: getSceneLocationName(currentScene.background),
            variables,
            previewText: currentText.slice(0, 55) + '...',
          };
          localStorage.setItem(STORAGE_AUTOSAVE_KEY, JSON.stringify(autoSlot));
          setSaveSlots((prev) => {
            const next = [...prev];
            next[0] = autoSlot;
            return next;
          });
        } catch {
          // ignore localStorage error
        }
      }
    }
  }, [currentSceneId, dialogueLineIndex, viewState]);

  // Check for ending triggers
  useEffect(() => {
    if (currentScene.endingId && viewState === 'playing') {
      const endingId = currentScene.endingId;
      setViewState('ending');
      setUnlockedEndings((prev) => (prev.includes(endingId) ? prev : [...prev, endingId]));
    }
  }, [currentScene, viewState]);

  // Handler when typing finishes
  const handleFinishTyping = useCallback(() => {
    setIsTyping(false);
  }, []);

  // Handler to advance progressive dialogue
  const handleNextLine = useCallback(() => {
    setDialogueLineIndex((prev) => prev + 1);
    setIsTyping(true);
  }, []);

  // Handler to select a choice
  const handleSelectChoice = useCallback((choice: Choice) => {
    if (choice.effects) {
      setVariables((prev) => {
        const updated = { ...prev };
        for (const [k, v] of Object.entries(choice.effects!)) {
          const key = k as keyof GameStateVariables;
          if (typeof v === 'boolean') {
            (updated[key] as boolean) = v;
          } else if (typeof v === 'number') {
            (updated[key] as number) = ((prev[key] as number) || 0) + v;
          }
        }
        return updated;
      });
    }

    // Switch scene
    setCurrentSceneId(choice.next);
    setDialogueLineIndex(0);
    setIsTyping(true);
  }, []);

  // New Game starter
  const handleStartNewGame = () => {
    setCurrentSceneId('prologue_start');
    setDialogueLineIndex(0);
    setIsTyping(true);
    setVariables(INITIAL_VARIABLES);
    setBacklog([]);
    setViewState('playing');
    sound.setMuted(isMuted);
    sound.playSound('thunder');
  };

  // Continue from auto-save or slot
  const handleContinueGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTOSAVE_KEY);
      if (saved) {
        const slot: SaveSlot = JSON.parse(saved);
        setCurrentSceneId(slot.sceneId);
        setDialogueLineIndex(0);
        setIsTyping(true);
        setVariables(slot.variables);
        setViewState('playing');
        return;
      }
    } catch {
      // fallback to new game
    }
    handleStartNewGame();
  };

  // Save to slot
  const handleSaveToSlot = (index: number) => {
    const slot: SaveSlot = {
      id: index,
      timestamp: Date.now(),
      sceneId: currentScene.id,
      sceneTitle: getSceneLocationName(currentScene.background),
      variables,
      previewText: currentText.slice(0, 50) + '...',
    };

    setSaveSlots((prev) => {
      const updated = [...prev];
      updated[index] = slot;
      try {
        localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Save slot error:', e);
      }
      return updated;
    });

    setSaveLoadMode(null);
  };

  // Load from slot
  const handleLoadFromSlot = (slot: SaveSlot) => {
    setCurrentSceneId(slot.sceneId);
    setDialogueLineIndex(0);
    setIsTyping(true);
    setVariables(slot.variables);
    setViewState('playing');
    setSaveLoadMode(null);
  };

  // Delete slot
  const handleDeleteSlot = (index: number) => {
    setSaveSlots((prev) => {
      const updated = [...prev];
      updated[index] = null;
      try {
        localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Delete slot error:', e);
      }
      return updated;
    });
  };

  // Sound toggle
  const handleToggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sound.setMuted(newMuted);
  };

  // Secret found easter egg
  const handleSecretFound = (_msg: string) => {
    setVariables((prev) => ({
      ...prev,
      curiosity: prev.curiosity + 1,
      clues: prev.clues + 1,
    }));
  };

  // Current Ending details if on ending screen
  const currentEnding = currentScene.endingId
    ? ALL_ENDINGS.find((e) => e.id === currentScene.endingId) || ALL_ENDINGS[0]
    : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-neutral-950 text-neutral-100 flex flex-col font-sans select-none">
      {/* View: Title Screen */}
      {viewState === 'title' && (
        <TitleScreen
          hasSavedGame={Boolean(saveSlots[0] || localStorage.getItem(STORAGE_AUTOSAVE_KEY))}
          unlockedCount={unlockedEndings.length}
          totalEndings={ALL_ENDINGS.length}
          onNewGame={handleStartNewGame}
          onContinue={handleContinueGame}
          onOpenGallery={() => setIsGalleryOpen(true)}
        />
      )}

      {/* View: Active Playing Visual Novel Screen */}
      {viewState === 'playing' && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Top Control Bar */}
          <TopBar
            locationName={getSceneLocationName(currentScene.background)}
            unlockedEndingsCount={unlockedEndings.length}
            totalEndingsCount={ALL_ENDINGS.length}
            variables={variables}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
            onOpenGallery={() => setIsGalleryOpen(true)}
            onOpenBacklog={() => setIsBacklogOpen(true)}
            onOpenSave={() => setSaveLoadMode('save')}
            onOpenLoad={() => setSaveLoadMode('load')}
            onRestart={() => {
              if (window.confirm('Mulai ulang cerita dari awal? Progress tanpa save manual akan hilang.')) {
                handleStartNewGame();
              }
            }}
          />

          {/* Visual Scene Stage */}
          <div className="relative flex-1 w-full overflow-hidden">
            <SceneBackground
              backgroundId={currentScene.background}
              screenEffect={currentScene.screenEffect}
              onSecretFound={handleSecretFound}
            />
          </div>

          {/* Visual Novel Dialogue & Choice UI Box */}
          <div className="relative z-20 w-full flex flex-col">
            {/* Dialogue text box */}
            <DialogueBox
              key={`${currentSceneId}_${dialogueLineIndex}`}
              speaker={currentSpeaker}
              text={currentText}
              isTyping={isTyping}
              onFinishTyping={handleFinishTyping}
              onNextLine={handleNextLine}
              hasNextLine={hasNextLine}
            />

            {/* Choices Box (appears once all dialogue lines for current scene have finished) */}
            {!hasNextLine && !isTyping && currentScene.choices && currentScene.choices.length > 0 && (
              <ChoicesBox
                choices={currentScene.choices}
                variables={variables}
                onSelectChoice={handleSelectChoice}
              />
            )}
          </div>
        </div>
      )}

      {/* View: Ending Resolution Screen */}
      {viewState === 'ending' && currentEnding && (
        <EndingScreen
          ending={currentEnding}
          unlockedCount={unlockedEndings.length}
          totalEndings={ALL_ENDINGS.length}
          onPlayAgain={handleStartNewGame}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenBacklog={() => setIsBacklogOpen(true)}
        />
      )}

      {/* Modals */}
      <EndingGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        unlockedEndingIds={unlockedEndings}
      />

      <BacklogModal
        isOpen={isBacklogOpen}
        onClose={() => setIsBacklogOpen(false)}
        entries={backlog}
      />

      <SaveLoadModal
        isOpen={saveLoadMode !== null}
        onClose={() => setSaveLoadMode(null)}
        mode={saveLoadMode || 'save'}
        slots={saveSlots}
        currentSceneId={currentSceneId}
        currentVariables={variables}
        currentPreviewText={currentText}
        onSaveSlot={handleSaveToSlot}
        onLoadSlot={handleLoadFromSlot}
        onDeleteSlot={handleDeleteSlot}
      />
    </div>
  );
}

function getSceneLocationName(bg: string): string {
  switch (bg) {
    case 'room13':
      return 'Motel Room 13 (02:13 AM)';
    case 'closet_open':
      return 'Di Dalam Lemari Kamar 13';
    case 'hallway':
      return 'Lorong Lantai 2 Motel';
    case 'kitchen':
      return 'Dapur Motel Cendana Asri';
    case 'freezer':
      return 'Freezer Industri Dapur (-18°C)';
    case 'basement':
      return 'Basement & Ruang Generator';
    case 'control_room':
      return 'Ruang Kontrol Rahasia CCTV';
    case 'rooftop':
      return 'Atap Motel (Rooftop & Rain)';
    case 'forest':
      return 'Hutan Berkabut Belakang Motel';
    case 'exit_road':
      return 'Jalan Keluar Menuju Rumah';
    case 'secret_elevator':
      return 'Lift Antik Dimensi Rahasia';
    case 'dream_void':
      return 'Dimensi Kambing Kosmik';
    case 'mirror_room':
      return 'Kamar Mandi // Cermin Waktu';
    default:
      return 'Motel Cendana Asri';
  }
}
