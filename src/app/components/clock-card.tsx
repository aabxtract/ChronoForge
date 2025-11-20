"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ClockSVG } from "./clock-svg";
import { getClockState, formatDuration } from "@/lib/time";
import type { Clock } from "@/lib/types";
import { cn } from "@/lib/utils";
import Sparkles from "./sparkles";

interface ClockCardProps {
  clock: Clock;
}

export function ClockCard({ clock }: ClockCardProps) {
  const [currentState, setCurrentState] = useState(() => getClockState(clock));

  useEffect(() => {
    if (currentState.isEvolved) return;

    const interval = setInterval(() => {
      const newState = getClockState(clock);
      setCurrentState(newState);
      if (newState.isEvolved) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clock, currentState.isEvolved]);

  const { timeRemaining, percentage, rarity, isEvolved } = currentState;
  const isLegendary = rarity.name === "Legendary";

  return (
    <Card
      asChild
      className="relative group w-full h-full overflow-hidden bg-card/50 backdrop-blur-lg border-border/20 hover:border-primary/50 transition-all duration-300 flex flex-col"
      style={{ '--glow-color': rarity.glowColor } as React.CSSProperties}
    >
      <Link href={`/clocks/${clock.id}`}>
        {isLegendary && !isEvolved && <Sparkles />}
        <CardHeader className="p-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold capitalize">{clock.theme} Clock</span>
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{ color: rarity.color, backgroundColor: `${rarity.color}20` }}
            >
              {rarity.name}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex items-center justify-center">
          <div
            className={cn(
              "relative w-full aspect-square transition-all duration-500",
              isLegendary && !isEvolved && "animate-pulse-glow"
            )}
            style={{ filter: `drop-shadow(0 0 15px var(--glow-color))` }}
          >
            <ClockSVG
              percentage={percentage}
              rarity={rarity.name}
              theme={clock.theme}
              isEvolved={isEvolved}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 flex-shrink-0">
          <div className="w-full text-center">
            <p className="font-mono text-2xl tracking-wider text-foreground">
              {formatDuration(timeRemaining)}
            </p>
            <p className="text-xs text-muted-foreground">Time Remaining</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
