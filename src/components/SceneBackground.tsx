import React, { useState, useEffect } from 'react';
import { BackgroundId, ScreenEffectType } from '../types';
import { sound } from '../utils/audio';

interface SceneBackgroundProps {
  backgroundId: BackgroundId;
  screenEffect?: ScreenEffectType;
  onSecretFound?: (message: string) => void;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  backgroundId,
  screenEffect = 'none',
  onSecretFound,
}) => {
  const [wardrobeClicks, setWardrobeClicks] = useState(0);
  const [secretFeedback, setSecretFeedback] = useState<string | null>(null);

  // Clear secret feedback after 4 seconds
  useEffect(() => {
    if (secretFeedback) {
      const timer = setTimeout(() => setSecretFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [secretFeedback]);

  const handleWardrobeClick = () => {
    sound.playSound('knock');
    const newCount = wardrobeClicks + 1;
    setWardrobeClicks(newCount);
    if (newCount === 3) {
      const msg = 'Rahasia Terbuka: Terdengar suara dari dalam lemari: "Woi santai ngetuknya, cat kayu jatinya rontok!" (Curiosity +1)';
      setSecretFeedback(msg);
      onSecretFound?.(msg);
    } else if (newCount > 3) {
      setSecretFeedback('Lemari ini sudah tidak merespons ketukanmu.');
    }
  };

  const handleClockClick = () => {
    sound.playSound('click');
    setSecretFeedback('Jam Digital: 02:13 AM. Angka "13" berkedip warna merah darah dengan agak terlalu dramatis.');
  };

  const handleGoatPedestalClick = () => {
    sound.playSound('goat');
    setSecretFeedback('Kambing kosmik mengangguk hormat ke arahmu: "Mbaaaa~ (Restu semesta menyertaimu)."');
  };

  const handleCCTVClick = () => {
    sound.playSound('radioStatic');
    setSecretFeedback('CCTV Monitor 13: Menampilkan dirimu sedang berdiri menatap layar ini 3 detik yang lalu.');
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none transition-all duration-700 ${getEffectClasses(screenEffect)}`}>
      {/* Background Scenic SVGs & Vector Composites */}
      {renderScene(backgroundId, {
        onWardrobeClick: handleWardrobeClick,
        onClockClick: handleClockClick,
        onGoatPedestalClick: handleGoatPedestalClick,
        onCCTVClick: handleCCTVClick,
      })}

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-black/25 to-black/75" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-35" />

      {/* Rain Effect Simulation */}
      {(backgroundId === 'room13' || backgroundId === 'rooftop' || backgroundId === 'forest' || backgroundId === 'exit_road' || screenEffect === 'rain-heavy') && (
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute -inset-y-full inset-x-0 w-full h-[200%] animate-[rain_0.65s_linear_infinite] bg-[repeating-linear-gradient(105deg,transparent,transparent_18px,rgba(200,230,255,0.45)_19px,rgba(200,230,255,0.45)_20px)]" />
        </div>
      )}

      {/* Secret Click Interaction Feedback Banner */}
      {secretFeedback && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 max-w-md w-11/12 bg-neutral-900/95 border border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.25)] rounded-lg px-4 py-2.5 text-amber-200 text-xs sm:text-sm text-center animate-bounce z-40 backdrop-blur-md">
          <span className="font-semibold text-amber-400 mr-1.5">✦ RAHASIA DITEMUKAN:</span>
          {secretFeedback}
        </div>
      )}
    </div>
  );
};

function getEffectClasses(effect: ScreenEffectType): string {
  switch (effect) {
    case 'shake':
      return 'animate-[wiggle_0.25s_ease-in-out_infinite]';
    case 'flash':
      return 'animate-[pulse_0.2s_ease-in-out_2] brightness-150';
    case 'flicker':
      return 'animate-[flicker_1.5s_infinite]';
    case 'glitch':
      return 'hue-rotate-90 saturate-200 contrast-125';
    case 'darkness':
      return 'brightness-50 contrast-150';
    default:
      return '';
  }
}

interface SceneHandlers {
  onWardrobeClick: () => void;
  onClockClick: () => void;
  onGoatPedestalClick: () => void;
  onCCTVClick: () => void;
}

function renderScene(id: BackgroundId, handlers: SceneHandlers) {
  switch (id) {
    case 'room13':
      return (
        <div className="relative w-full h-full bg-[#12161f]">
          {/* Wallpaper pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Rainy Window */}
          <div className="absolute top-10 left-12 w-48 h-64 border-4 border-[#3d271d] bg-[#090d16] overflow-hidden shadow-2xl rounded-sm">
            <div className="absolute inset-0 bg-blue-950/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full bg-[#3d271d]" />
              <div className="h-0.5 w-full bg-[#3d271d] absolute" />
            </div>
            {/* Distant lightning highlight */}
            <div className="absolute bottom-4 left-4 w-12 h-8 bg-amber-400/20 rounded-full blur-xl" />
          </div>

          {/* Wooden Wardrobe (Interactive) */}
          <div
            onClick={handlers.onWardrobeClick}
            title="Klik lemari untuk menyelidiki..."
            className="group cursor-pointer absolute right-16 bottom-8 w-44 h-80 bg-gradient-to-b from-[#4a2e1b] to-[#28180d] border-2 border-[#5c3a22] shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-t-sm flex flex-col justify-between p-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="w-full text-center text-[10px] text-amber-500/40 font-mono tracking-widest uppercase">
              Lemari Jati 1984
            </div>
            {/* Door slit & handles */}
            <div className="relative w-full h-56 flex justify-center items-center">
              <div className="w-0.5 h-full bg-black/60 shadow-[0_0_8px_rgba(0,0,0,0.9)]" />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-6 bg-amber-600 rounded-sm shadow-md group-hover:bg-amber-400 transition-colors" />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-6 bg-amber-600 rounded-sm shadow-md group-hover:bg-amber-400 transition-colors" />
            </div>
            <div className="text-[9px] text-center text-amber-200/50 group-hover:text-amber-300 transition-colors">
              🔍 Ketuk untuk selidiki
            </div>
          </div>

          {/* Motel Bed & Desk */}
          <div className="absolute left-10 bottom-0 w-80 h-36 bg-[#211714] border-t-4 border-[#3a2923] rounded-t-md shadow-2xl">
            {/* Bedding */}
            <div className="absolute left-4 right-4 top-4 bottom-0 bg-[#3b2b28] rounded-t-sm border-t border-amber-900/40">
              <div className="absolute -top-3 left-4 w-24 h-8 bg-neutral-300/80 rounded-sm shadow-inner" />
              <div className="absolute inset-x-2 bottom-0 top-10 bg-[#4d1d24] rounded-t-sm" />
            </div>
          </div>

          {/* Nightstand & Digital Clock (Interactive) */}
          <div
            onClick={handlers.onClockClick}
            title="Klik jam digital"
            className="cursor-pointer absolute left-96 bottom-0 w-28 h-32 bg-[#2d1e18] border-t-2 border-[#4a342b] p-2 flex flex-col items-center shadow-lg hover:brightness-110"
          >
            {/* Lamp base & warm tungsten glow */}
            <div className="w-8 h-2 bg-amber-700 rounded-t" />
            <div className="w-1.5 h-10 bg-amber-600" />
            <div className="w-14 h-8 bg-amber-200/90 rounded-t-lg shadow-[0_0_35px_rgba(251,191,36,0.6)]" />
            {/* Digital Clock Screen */}
            <div className="mt-3 px-2 py-1 bg-black rounded border border-red-900/70 shadow-inner">
              <span className="font-mono font-bold text-red-500 tracking-wider text-xs animate-pulse">02:13 AM</span>
            </div>
          </div>
        </div>
      );

    case 'closet_open':
      return (
        <div className="relative w-full h-full bg-[#1c120c] flex items-center justify-center">
          {/* Inside Closet Wood Texture */}
          <div className="absolute inset-6 bg-[#2a1b12] border-4 border-[#4a3121] shadow-2xl rounded p-6 flex flex-col justify-between">
            {/* Hanging Clothes & Coat Hangers */}
            <div className="w-full flex justify-around items-start opacity-70">
              <div className="w-12 h-36 bg-stone-700/80 rounded-b shadow-lg" />
              <div className="w-14 h-44 bg-amber-950/90 rounded-b shadow-lg" />
              <div className="w-10 h-32 bg-stone-800/80 rounded-b shadow-lg" />
            </div>
            {/* Pedestal with mysterious Green Sandal & Walkie Talkie */}
            <div className="w-full bg-[#1e130c] p-6 rounded border border-amber-800/40 flex justify-center items-center gap-10 shadow-inner">
              {/* Green Sandal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-28 bg-emerald-700 rounded-full border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center relative rotate-12">
                  <div className="w-8 h-10 border-t-4 border-emerald-300 rounded-t-full absolute top-6" />
                  <span className="text-[8px] font-mono text-emerald-200 font-bold">13-ALPHA</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold mt-2">Sandal Karet Motel</span>
              </div>
              {/* Walkie Talkie */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-24 bg-neutral-900 border border-neutral-700 rounded-md flex flex-col items-center p-1.5 shadow-2xl">
                  <div className="w-1.5 h-6 bg-neutral-600 -mt-6 rounded-t" />
                  <div className="w-full h-4 bg-amber-950/80 border border-amber-700/50 rounded flex items-center justify-center">
                    <span className="text-[8px] font-mono text-red-500 font-bold">CH-13</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 my-2">
                    <div className="w-3 h-1.5 bg-neutral-700 rounded" />
                    <div className="w-3 h-1.5 bg-neutral-700 rounded" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                </div>
                <span className="text-[10px] text-neutral-300 font-semibold mt-2">Walkie-Talkie Jadul</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'hallway':
      return (
        <div className="relative w-full h-full bg-[#181a20] overflow-hidden">
          {/* Corridor Perspective Ceiling & Floor */}
          <div className="absolute inset-0 flex justify-center items-center">
            {/* Floor with aged red carpet runner */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#12141a]">
              <div className="mx-auto w-1/3 h-full bg-[#521c1f] shadow-2xl border-x-2 border-[#802c32]/30" />
            </div>
            {/* Ceiling with flickering fluorescent lamp */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-[#1b1e28]">
              <div className="mx-auto w-1/4 h-3 bg-neutral-200 shadow-[0_0_40px_rgba(255,255,255,0.7)] animate-[flicker_2s_infinite]" />
            </div>
          </div>

          {/* Perspective walls with numbered doors */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#212430] to-transparent p-4 flex flex-col justify-around">
            <div className="w-16 h-36 bg-[#2b1c15] border-2 border-[#422d23] rounded-sm p-1 shadow-lg">
              <span className="text-[10px] font-mono text-amber-300 font-bold">11</span>
            </div>
            <div className="w-20 h-44 bg-[#2b1c15] border-2 border-[#422d23] rounded-sm p-1 shadow-lg">
              <span className="text-[10px] font-mono text-amber-300 font-bold">13</span>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#212430] to-transparent p-4 flex flex-col justify-around items-end">
            <div className="w-16 h-36 bg-[#2b1c15] border-2 border-[#422d23] rounded-sm p-1 shadow-lg text-right">
              <span className="text-[10px] font-mono text-amber-300 font-bold">12</span>
            </div>
            <div className="w-20 h-44 bg-[#2b1c15] border-2 border-[#422d23] rounded-sm p-1 shadow-lg text-right">
              <span className="text-[10px] font-mono text-amber-300 font-bold">14</span>
            </div>
          </div>

          {/* End of corridor with red EXIT sign & silhouette */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="px-3 py-1 bg-red-950 border border-red-600 rounded text-[9px] font-mono font-bold text-red-400 tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.6)]">
              EXIT →
            </div>
            {/* Goat silhouette */}
            <div className="mt-6 flex flex-col items-center opacity-85">
              <div className="w-8 h-6 bg-amber-900/90 rounded-t-lg relative">
                <div className="w-1.5 h-3 bg-amber-700 absolute -top-2 left-1 rotate-12 rounded" />
                <div className="w-1.5 h-3 bg-amber-700 absolute -top-2 right-1 -rotate-12 rounded" />
              </div>
              <div className="w-12 h-9 bg-amber-950 rounded-lg flex justify-around items-end p-1">
                <div className="w-1.5 h-4 bg-stone-900" />
                <div className="w-1.5 h-4 bg-stone-900" />
                <div className="w-1.5 h-4 bg-stone-900" />
                <div className="w-1.5 h-4 bg-stone-900" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'kitchen':
      return (
        <div className="relative w-full h-full bg-[#1f1915]">
          {/* Tiled walls */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          {/* Kitchen counter */}
          <div className="absolute bottom-0 inset-x-8 h-40 bg-[#382b24] border-t-4 border-[#523e34] rounded-t-md p-4 flex justify-between items-start shadow-2xl">
            {/* Stove with boiling noodles */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-10 bg-neutral-800 rounded border border-neutral-600 flex items-center justify-center relative">
                <div className="w-14 h-8 bg-neutral-700 rounded-full border-2 border-neutral-500 flex items-center justify-center">
                  <div className="w-8 h-4 bg-amber-500/80 rounded-full animate-pulse" />
                </div>
                {/* Steam puffs */}
                <div className="absolute -top-6 w-4 h-6 bg-white/30 rounded-full blur-sm animate-bounce" />
              </div>
              <span className="text-[10px] text-amber-300 font-mono mt-1 font-semibold">Panci Rebusan Mie</span>
            </div>

            {/* Instant Noodle Cups Stack */}
            <div className="flex gap-2">
              <div className="w-10 h-14 bg-red-700 border border-amber-400 rounded-t-sm text-[8px] text-white flex items-center justify-center font-bold">
                MIE
              </div>
              <div className="w-10 h-14 bg-amber-600 border border-amber-300 rounded-t-sm text-[8px] text-white flex items-center justify-center font-bold">
                KARI
              </div>
            </div>

            {/* Heavy Stainless Steel Freezer Door */}
            <div className="w-32 h-64 -mt-28 bg-gradient-to-b from-slate-400 to-slate-600 border-2 border-slate-300 rounded-sm shadow-2xl p-2 flex flex-col justify-between">
              <div className="text-[9px] font-mono text-center font-bold text-slate-900 bg-slate-200/80 rounded py-0.5">
                FREEZER UTAMA
              </div>
              <div className="w-3 h-14 bg-slate-800 rounded self-end shadow-md border border-slate-500" />
              <div className="text-[8px] text-sky-950 font-bold text-center bg-cyan-200/70 rounded">
                -18°C BEKU
              </div>
            </div>
          </div>
        </div>
      );

    case 'freezer':
      return (
        <div className="relative w-full h-full bg-[#0a192f] flex flex-col justify-between p-8 overflow-hidden">
          {/* Frosty particles */}
          <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-black/80" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="px-3 py-1 bg-cyan-950/80 border border-cyan-500 rounded text-cyan-300 text-xs font-mono">
              SUHU: -24°C // PENYIMPANAN ES KRIM
            </div>
            <div className="text-xs text-cyan-200/60 font-mono">
              Ruang Pendingin Motel Cendana
            </div>
          </div>

          {/* Ice cream tubs and Technician silhouette */}
          <div className="relative z-10 flex justify-around items-end">
            <div className="flex gap-3">
              <div className="w-16 h-20 bg-pink-600 rounded-t-lg border-2 border-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.4)] flex items-center justify-center text-[9px] text-white font-bold">
                STRAWBERRY
              </div>
              <div className="w-16 h-20 bg-amber-100 rounded-t-lg border-2 border-amber-300 shadow-[0_0_15px_rgba(254,240,138,0.4)] flex items-center justify-center text-[9px] text-stone-900 font-bold">
                VANILA
              </div>
              <div className="w-16 h-20 bg-amber-900 rounded-t-lg border-2 border-amber-600 shadow-[0_0_15px_rgba(180,83,9,0.4)] flex items-center justify-center text-[9px] text-white font-bold">
                COKLAT
              </div>
            </div>

            {/* Technician in orange parka */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-12 bg-orange-600 rounded-t-full border border-orange-400 relative">
                <div className="w-16 h-4 bg-amber-100 rounded-full absolute -top-1 -left-1 shadow" />
              </div>
              <div className="w-24 h-28 bg-orange-700 rounded-t-md border-t-2 border-orange-400 flex items-center justify-center">
                <span className="text-[10px] text-orange-200 font-mono font-bold">TEKNISI</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'basement':
      return (
        <div className="relative w-full h-full bg-[#111713] overflow-hidden">
          {/* Dusty pipes overhead */}
          <div className="absolute top-0 inset-x-0 h-16 flex justify-around">
            <div className="w-full h-4 bg-[#4a3b2c] border-b border-amber-900/60 shadow-lg" />
          </div>

          {/* Generator Diesel */}
          <div className="absolute bottom-8 left-12 w-48 h-56 bg-[#1f2923] border-2 border-emerald-900/60 rounded-md p-3 shadow-2xl flex flex-col justify-between">
            <div className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
              GENERATOR 50KVA
            </div>
            <div className="w-full h-24 bg-neutral-900 rounded border border-neutral-700 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-dashed border-emerald-500/50 animate-spin" />
            </div>
            <div className="text-[8px] font-mono text-emerald-300">STATUS: BERDENGUNG</div>
          </div>

          {/* Steel Security Door */}
          <div className="absolute bottom-8 right-16 w-44 h-64 bg-neutral-800 border-4 border-neutral-600 rounded-t-md shadow-2xl p-4 flex flex-col justify-between items-center">
            <div className="text-[10px] font-mono text-amber-400 font-bold bg-neutral-900 px-2 py-1 rounded border border-amber-600/40 text-center">
              RUANG KONTROL
            </div>
            {/* Keycard / Sandal Scanner */}
            <div className="w-12 h-16 bg-neutral-900 border border-neutral-500 rounded p-1 flex flex-col items-center justify-around shadow-inner">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <div className="text-[7px] font-mono text-neutral-400 text-center">SCAN DI SINI</div>
            </div>
            <div className="w-32 h-6 bg-yellow-600/80 border border-yellow-400/60 flex items-center justify-center font-mono text-[8px] font-bold text-black tracking-wider">
              DILARANG MASUK
            </div>
          </div>
        </div>
      );

    case 'control_room':
      return (
        <div className="relative w-full h-full bg-[#080d0b] p-6 flex flex-col justify-between overflow-hidden">
          {/* CRT Monitor Grid (Interactive) */}
          <div
            onClick={handlers.onCCTVClick}
            title="Klik monitor CCTV untuk beralih kamera"
            className="cursor-pointer grid grid-cols-4 gap-3 bg-neutral-950/80 p-3 rounded-md border border-emerald-800/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          >
            {[
              { cam: 'CAM 01: LOBI', status: 'KOSONG' },
              { cam: 'CAM 07: LORONG', status: 'KAMBING DETECTED' },
              { cam: 'CAM 13: ROOM 13', status: '02:13 AM REPLAY' },
              { cam: 'CAM 22: ATAP', status: 'HUJAN BADAI' },
            ].map((item, idx) => (
              <div key={idx} className="h-24 bg-emerald-950/40 border border-emerald-500/40 rounded p-1.5 flex flex-col justify-between hover:border-emerald-400 transition-colors">
                <div className="flex justify-between items-center text-[8px] font-mono text-emerald-400">
                  <span>{item.cam}</span>
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                </div>
                <div className="text-center font-mono text-[9px] text-emerald-300 font-bold">
                  {item.status}
                </div>
                <div className="text-[7px] font-mono text-emerald-600">LIVE FEED // 30 FPS</div>
              </div>
            ))}
          </div>

          {/* Master Control Console */}
          <div className="bg-neutral-900 border-t-2 border-emerald-700/60 p-4 rounded-t-lg flex justify-around items-center shadow-2xl">
            {/* Red Button: Emergency Override */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-red-700 rounded-full border-4 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] flex items-center justify-center active:scale-95 transition-transform">
                <div className="w-6 h-6 bg-red-500 rounded-full" />
              </div>
              <span className="text-[9px] font-mono text-red-400 font-bold mt-1">HENTIKAN SIMULASI</span>
            </div>

            {/* Yellow Button: Snack Dispenser */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-amber-500 rounded-full border-4 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.7)] flex items-center justify-center active:scale-95 transition-transform">
                <div className="w-6 h-6 bg-amber-300 rounded-full" />
              </div>
              <span className="text-[9px] font-mono text-amber-300 font-bold mt-1">SNACK GRATIS</span>
            </div>

            {/* System Status Indicators */}
            <div className="text-right font-mono text-[9px] text-emerald-400">
              <div>STATUS: SIMULASI AKTIF</div>
              <div>SUBJEK: PLAYER 13</div>
              <div className="text-amber-400">SIKLUS: 104 / OKTOBER</div>
            </div>
          </div>
        </div>
      );

    case 'rooftop':
      return (
        <div className="relative w-full h-full bg-[#0c121d] flex flex-col justify-between p-8 overflow-hidden">
          {/* Night Sky & Distant City Horizon */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a12] via-[#0f172a] to-[#1e293b]" />
          
          {/* Flickering Neon Motel Sign */}
          <div className="relative z-10 flex justify-between items-start">
            <div className="px-4 py-2 bg-black/60 border border-red-500/50 rounded shadow-[0_0_25px_rgba(239,68,68,0.5)]">
              <span className="font-mono text-2xl font-black text-red-500 tracking-widest animate-[flicker_1.2s_infinite]">
                M TEL 13
              </span>
            </div>
            {/* Water Tower */}
            <div className="w-24 h-32 flex flex-col items-center opacity-70">
              <div className="w-20 h-16 bg-[#3d271d] border border-amber-900 rounded-t-md shadow-lg" />
              <div className="w-16 h-12 flex justify-between">
                <div className="w-1.5 h-full bg-stone-700" />
                <div className="w-1.5 h-full bg-stone-700" />
              </div>
            </div>
          </div>

          {/* Rooftop Survival Camp Base */}
          <div className="relative z-10 bg-neutral-900/80 border border-amber-700/40 p-4 rounded-lg backdrop-blur-sm flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-amber-600/30 border border-amber-500 rounded flex items-center justify-center text-amber-300 font-mono text-xs">
                ☕ KOPI
              </div>
              <div className="w-12 h-12 bg-red-600/30 border border-red-500 rounded flex items-center justify-center text-red-300 font-mono text-xs">
                🌭 SOSIS
              </div>
            </div>
            <div className="text-right text-xs text-neutral-300 font-mono">
              <span className="text-amber-400 font-bold">KEMPING ATAP SURVIVAL</span>
              <p className="text-[10px] text-neutral-400">Bersama Pak Satpam & Doni</p>
            </div>
          </div>
        </div>
      );

    case 'forest':
      return (
        <div className="relative w-full h-full bg-[#080d09] flex flex-col justify-end p-8 overflow-hidden">
          {/* Dark misty silhouettes of twisted pine trees */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0d1710] to-[#050a06]" />
          
          <div className="relative z-10 flex justify-around items-end opacity-75">
            <div className="w-12 h-64 bg-emerald-950/80 rounded-t-full" />
            <div className="w-16 h-80 bg-emerald-950/90 rounded-t-full" />
            <div className="w-10 h-56 bg-emerald-950/70 rounded-t-full" />
            <div className="w-14 h-72 bg-emerald-950/85 rounded-t-full" />
          </div>

          {/* Mystery Wooden Door #13 appearing in the woods */}
          <div className="relative z-20 self-center mb-6 w-32 h-56 bg-[#382316] border-4 border-[#523522] rounded-t shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between p-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-bold text-amber-300 text-xs">
              13
            </div>
            <div className="w-2 h-6 bg-amber-500 rounded self-end mr-2" />
            <div className="text-[9px] text-amber-200/60 font-mono">Pintu Misterius Hutan</div>
          </div>
        </div>
      );

    case 'exit_road':
      return (
        <div className="relative w-full h-full bg-[#090e17] flex flex-col justify-between p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080e] via-[#0d1424] to-[#161f36]" />
          
          {/* Road highway with wet reflection */}
          <div className="relative z-10 flex justify-between items-center">
            <div className="text-amber-400 font-mono text-sm tracking-wider">
              JALAN RAYA UTAMA → PULANG KE RUMAH
            </div>
            <div className="px-3 py-1 bg-emerald-900/60 border border-emerald-400 text-emerald-200 text-xs rounded font-mono">
              STATUS: AMAN
            </div>
          </div>

          {/* Car Dashboard silhouette */}
          <div className="relative z-10 bg-neutral-950 border-t-2 border-neutral-700 h-28 rounded-t-3xl p-4 flex justify-between items-center shadow-2xl">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500/40 flex items-center justify-center text-xs font-mono text-emerald-400">
                80 km/h
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/40 flex items-center justify-center text-xs font-mono text-amber-300">
                FULL
              </div>
            </div>
            <div className="text-right text-xs text-neutral-300 font-mono">
              <div className="text-emerald-400 font-bold">RADIO MOTEL: MATI</div>
              <div className="text-[10px] text-neutral-400">Menjauhi Room 13</div>
            </div>
          </div>
        </div>
      );

    case 'secret_elevator':
      return (
        <div className="relative w-full h-full bg-[#1b140b] flex flex-col justify-between p-8 overflow-hidden">
          {/* Art deco elevator cage */}
          <div className="absolute inset-4 border-4 border-amber-600/70 rounded-lg p-6 bg-[#261d12] flex flex-col justify-between shadow-2xl">
            {/* Dial floor indicator */}
            <div className="w-full flex justify-center">
              <div className="w-44 h-20 bg-amber-950 border-2 border-amber-500 rounded-t-full flex items-center justify-center relative shadow-lg">
                <div className="w-1 h-12 bg-amber-400 absolute bottom-1 origin-bottom rotate-45" />
                <span className="text-amber-300 font-mono font-bold text-sm tracking-widest">
                  DIMENSI ???
                </span>
              </div>
            </div>

            {/* Elevator panel with strange buttons */}
            <div className="w-32 mx-auto bg-amber-900/80 border border-amber-500 rounded p-3 flex flex-col items-center gap-2 shadow-inner">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 font-black text-xs flex items-center justify-center shadow">
                Ω
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 font-black text-xs flex items-center justify-center shadow">
                Ψ
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-400 text-stone-900 font-black text-xs flex items-center justify-center shadow animate-pulse">
                🐐
              </div>
            </div>

            <div className="text-center text-xs text-amber-400/80 font-mono">
              Lift Khusus Staff Supranatural & Kambing
            </div>
          </div>
        </div>
      );

    case 'dream_void':
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-indigo-950 via-purple-950 to-amber-950 flex flex-col justify-between p-8 overflow-hidden">
          {/* Floating Cosmic Sandals */}
          <div className="absolute inset-0 pointer-events-none flex justify-around items-center opacity-60">
            <div className="w-12 h-20 bg-emerald-500 rounded-full border border-emerald-300 rotate-45 animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
            <div className="w-12 h-20 bg-emerald-500 rounded-full border border-emerald-300 -rotate-45 animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
            <div className="w-12 h-20 bg-emerald-500 rounded-full border border-emerald-300 rotate-12 animate-spin shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
          </div>

          {/* Pedestal with the Cosmic Goat (Interactive) */}
          <div
            onClick={handlers.onGoatPedestalClick}
            title="Klik Kambing Kosmik untuk berinteraksi"
            className="cursor-pointer relative z-10 mx-auto my-auto flex flex-col items-center group"
          >
            <div className="text-4xl filter drop-shadow-[0_0_25px_rgba(251,191,36,0.9)] group-hover:scale-110 transition-transform">
              🐐
            </div>
            <div className="w-36 h-8 bg-amber-500 rounded-t-lg border-2 border-amber-300 mt-2 shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center">
              <span className="text-[10px] font-mono font-black text-stone-900 tracking-wider">
                SANG KAMBING KOSMIK
              </span>
            </div>
            <div className="text-[9px] text-amber-200 mt-1 font-mono group-hover:text-white">
              (Klik untuk salam hormat)
            </div>
          </div>
        </div>
      );

    case 'mirror_room':
      return (
        <div className="relative w-full h-full bg-[#10141b] flex items-center justify-center p-6">
          {/* Bathroom Tile background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Big Foggy Mirror Frame */}
          <div className="relative w-96 h-80 bg-neutral-900 border-8 border-neutral-700 rounded-md shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
            {/* Fluorescent Light Strip above */}
            <div className="w-full h-2 bg-blue-100 shadow-[0_0_25px_rgba(255,255,255,0.8)] rounded-full animate-pulse" />
            
            {/* Reflection of Mirror You holding sandal */}
            <div className="flex flex-col items-center justify-center my-auto relative">
              <div className="w-20 h-20 rounded-full bg-neutral-700 border-2 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.4)] flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="mt-2 px-3 py-1 bg-emerald-950 border border-emerald-400 rounded text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1.5 shadow">
                <span>🩴</span>
                <span>MIRROR YOU (DENGAN SANDAL)</span>
              </div>
            </div>

            <div className="text-[9px] text-neutral-400 font-mono text-center">
              Cermin Kamar Mandi Room 13 // Refleksi Waktu Paralel
            </div>
          </div>
        </div>
      );

    default:
      return <div className="w-full h-full bg-neutral-900" />;
  }
}
