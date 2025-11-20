"use client";

import type { Rarity, Theme } from "@/lib/types";
import { rarityConfig } from "@/lib/time";

interface ClockSVGProps {
  percentage: number;
  rarity: Rarity;
  theme: Theme;
  isEvolved: boolean;
}

const EvolvedForm = ({ theme }: { theme: Theme }) => {
  // Simple "Eternal Sigil" as a placeholder for evolved art
  const sigilPaths: Record<Theme, string> = {
    minimal: "M10 50 L50 10 L90 50 L50 90 Z",
    cyberpunk: "M10 10 H90 V90 H10 Z M20 20 V80 H80 V20 Z",
    astral: "M50 10 C 20 20, 20 80, 50 90 S 80 80, 80 20, 50 10",
    molten: "M50 10 C 5 40, 95 60, 50 90 S 5 60, 95 40, 50 10",
  };
  const color = rarityConfig.Eternal.color;

  return (
    <g>
      <defs>
        <filter id="eternalGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={sigilPaths[theme]}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#eternalGlow)"
        className="animate-pulse-glow"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="12"
        fill={color}
        className="font-bold"
      >
        ETERNAL
      </text>
    </g>
  );
};

export function ClockSVG({ percentage, rarity, theme, isEvolved }: ClockSVGProps) {
  const rarityInfo = rarityConfig[rarity];
  const strokeWidth = 5;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isEvolved ? 0 : circumference * (1 - percentage);

  if (isEvolved) {
    return (
       <svg viewBox="0 0 100 100" className="w-full h-full">
         <EvolvedForm theme={theme} />
       </svg>
    )
  }

  const themeStyles: Record<Theme, { ring: string, track: string }> = {
    minimal: { ring: rarityInfo.color, track: "rgba(255, 255, 255, 0.1)" },
    cyberpunk: { ring: `url(#cyberGradient)`, track: "#374151" },
    astral: { ring: `url(#astralGradient)`, track: "#1e293b" },
    molten: { ring: `url(#moltenGradient)`, track: "#4b5563" },
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
      <defs>
        <radialGradient id="cyberGradient">
          <stop offset="0%" stopColor={rarityInfo.color} />
          <stop offset="100%" stopColor="#7DF9FF" />
        </radialGradient>
        <radialGradient id="astralGradient">
          <stop offset="0%" stopColor={rarityInfo.color} />
          <stop offset="100%" stopColor="#A020F0" />
        </radialGradient>
        <radialGradient id="moltenGradient">
          <stop offset="0%" stopColor={rarityInfo.color} />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke={themeStyles[theme].track}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke={themeStyles[theme].ring}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-1000 ease-linear"
      />
    </svg>
  );
}
