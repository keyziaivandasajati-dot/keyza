export type BackgroundId =
  | 'room13'
  | 'closet_open'
  | 'hallway'
  | 'kitchen'
  | 'freezer'
  | 'basement'
  | 'control_room'
  | 'rooftop'
  | 'forest'
  | 'exit_road'
  | 'secret_elevator'
  | 'dream_void'
  | 'mirror_room';

export type SpeakerId =
  | 'Narrator'
  | 'You'
  | 'Walkie-Talkie'
  | 'The Guard'
  | 'The Closet Person'
  | 'Ice Cream Man'
  | 'The Goat'
  | 'Mirror You'
  | 'Intercom'
  | 'CCTV Voice'
  | 'System';

export type SoundEffectType =
  | 'knock'
  | 'thunder'
  | 'radioStatic'
  | 'footstep'
  | 'generator'
  | 'ding'
  | 'goat'
  | 'sting'
  | 'click'
  | 'alarm'
  | 'magic'
  | 'door'
  | 'flicker';

export type MusicTrack = 'ambient' | 'tension' | 'mystery' | 'comedy' | 'silence';

export type ScreenEffectType =
  | 'none'
  | 'shake'
  | 'flash'
  | 'flicker'
  | 'glitch'
  | 'rain-heavy'
  | 'darkness';

export interface GameStateVariables {
  bravery: number;
  curiosity: number;
  trust: number;
  panic: number;
  clues: number;
  sandal: boolean;
  iceCream: boolean;
  mirror: boolean;
  simulationKnowledge: number;
  goatFollowed: boolean;
  noodlesCooked: boolean;
  closetBefriended: boolean;
  interactedWardrobeCount: number;
}

export interface Choice {
  text: string;
  next: string;
  requirement?: Partial<GameStateVariables>;
  requirementHint?: string;
  effects?: Partial<GameStateVariables>;
  soundEffect?: SoundEffectType;
  flavorTag?: 'Absurd' | 'Berani' | 'Paranoid' | 'Penasaran' | 'Santai' | 'Secret' | 'True Mystery';
}

export interface DialogueLine {
  speaker: SpeakerId;
  text: string;
  screenEffect?: ScreenEffectType;
  soundEffect?: SoundEffectType;
}

export interface Scene {
  id: string;
  background: BackgroundId;
  speaker: SpeakerId;
  text: string;
  dialogueLines?: DialogueLine[];
  choices: Choice[];
  music?: MusicTrack;
  screenEffect?: ScreenEffectType;
  soundEffect?: SoundEffectType;
  endingId?: string;
}

export interface Ending {
  id: string;
  code: string; // e.g. "ENDING A"
  title: string; // e.g. "ESCAPED"
  tagline: string;
  description: string;
  rarity: 'Common' | 'Surreal' | 'Absurd' | 'Secret' | 'True Mystery';
  route: string;
  iconName: string;
}

export interface SaveSlot {
  id: number;
  timestamp: number;
  sceneId: string;
  sceneTitle: string;
  variables: GameStateVariables;
  previewText: string;
}

export interface BacklogEntry {
  speaker: SpeakerId;
  text: string;
  sceneId: string;
}
