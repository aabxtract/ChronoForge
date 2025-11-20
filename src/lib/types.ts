export type Theme = 'minimal' | 'cyberpunk' | 'astral' | 'molten';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Eternal';

export type Clock = {
  id: string;
  theme: Theme;
  startTime: number;
  endTime: number;
  evolved: boolean;
};

export type RarityInfo = {
  name: Rarity;
  color: string;
  glowColor: string;
};
