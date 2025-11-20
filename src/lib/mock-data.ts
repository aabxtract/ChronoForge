import type { Clock } from './types';

const now = Date.now();

export const mockClocks: Clock[] = [
  {
    id: '1',
    theme: 'minimal',
    startTime: now - 10000,
    endTime: now + 3600 * 1000, // 1 hour
    evolved: false,
  },
  {
    id: '2',
    theme: 'cyberpunk',
    startTime: now - 3600 * 1000 * 5,
    endTime: now + 3600 * 1000 * 19, // 1 day total, 5 hours passed
    evolved: false,
  },
  {
    id: '3',
    theme: 'astral',
    startTime: now - 3600 * 1000 * 24 * 2,
    endTime: now + 3600 * 1000 * 24 * 5, // 7 days total, 2 days passed
    evolved: false,
  },
  {
    id: '4',
    theme: 'molten',
    startTime: now - 3600 * 1000 * 10,
    endTime: now + 3600 * 1000 * 2, // 12 hours total, 10 hours passed (Rare)
    evolved: false,
  },
  {
    id: '5',
    theme: 'cyberpunk',
    startTime: now - 3600 * 1000 * 23,
    endTime: now + 3600 * 1000 * 1, // 24 hours total, 23 passed (Epic)
    evolved: false,
  },
  {
    id: '6',
    theme: 'minimal',
    startTime: now - 3600 * 1000 * 0.95,
    endTime: now + 3600 * 1000 * 0.05, // 1 hour total, almost done (Legendary)
    evolved: false,
  },
  {
    id: '7',
    theme: 'astral',
    startTime: now - 3600 * 1000 * 2,
    endTime: now - 1000, // Expired
    evolved: true,
  },
  {
    id: '8',
    theme: 'molten',
    startTime: now - 3600 * 1000 * 24 * 7,
    endTime: now + 3600 * 1000 * 24 * 7, // 14 days total, 7 days passed
    evolved: false,
  },
];
