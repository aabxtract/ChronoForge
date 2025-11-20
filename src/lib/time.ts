import type { Clock, Rarity, RarityInfo } from './types';

export const rarityConfig: Record<Rarity, RarityInfo> = {
  Common: { name: 'Common', color: '#9ca3af', glowColor: 'rgba(156, 163, 175, 0.3)' },
  Uncommon: { name: 'Uncommon', color: '#34d399', glowColor: 'rgba(52, 211, 153, 0.4)' },
  Rare: { name: 'Rare', color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.5)' },
  Epic: { name: 'Epic', color: '#c084fc', glowColor: 'rgba(192, 132, 252, 0.6)' },
  Legendary: { name: 'Legendary', color: '#fcd34d', glowColor: 'rgba(252, 211, 77, 0.8)' },
  Eternal: { name: 'Eternal', color: '#7DF9FF', glowColor: 'rgba(125, 249, 255, 0.9)' },
};

export const getClockState = (clock: Clock) => {
  const now = Date.now();
  const { startTime, endTime } = clock;

  if (now >= endTime) {
    return {
      timeRemaining: 0,
      percentage: 0,
      rarity: rarityConfig.Eternal,
      isEvolved: true,
    };
  }

  const totalDuration = endTime - startTime;
  const elapsed = now - startTime;
  const percentage = 1 - elapsed / totalDuration;
  const timeRemaining = endTime - now;

  let rarity: RarityInfo;
  const p = percentage * 100;

  if (p > 75) {
    rarity = rarityConfig.Common;
  } else if (p > 40) {
    rarity = rarityConfig.Uncommon;
  } else if (p > 20) {
    rarity = rarityConfig.Rare;
  } else if (p > 5) {
    rarity = rarityConfig.Epic;
  } else {
    rarity = rarityConfig.Legendary;
  }

  return {
    timeRemaining,
    percentage,
    rarity,
    isEvolved: clock.evolved,
  };
};

export const formatDuration = (ms: number) => {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
