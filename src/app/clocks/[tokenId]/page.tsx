"use client";

import { useState, useEffect } from "react";
import { mockClocks } from "@/lib/mock-data";
import { ClockSVG } from "@/app/components/clock-svg";
import { getClockState, formatDuration } from "@/lib/time";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Clock, Tag, Zap, Calendar, GitCommitHorizontal } from "lucide-react";
import Sparkles from "@/app/components/sparkles";
import { cn } from "@/lib/utils";

export default function ClockDetailPage({ params }: { params: { tokenId: string } }) {
  const clock = mockClocks.find((c) => c.id === params.tokenId);
  
  const [currentState, setCurrentState] = useState(() => {
    if (!clock) return null;
    return getClockState(clock);
  });

  useEffect(() => {
    if (!clock || (currentState && currentState.isEvolved)) return;

    const interval = setInterval(() => {
      const newState = getClockState(clock);
      setCurrentState(newState);
      if (newState.isEvolved) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clock, currentState]);

  if (!clock || !currentState) {
    return notFound();
  }

  const { timeRemaining, rarity, isEvolved, percentage } = currentState;
  const isLegendary = rarity.name === 'Legendary';

  const stats = [
    { icon: Tag, label: "Theme", value: clock.theme, color: 'text-primary' },
    { icon: Zap, label: "Rarity", value: rarity.name, color: 'text-electric' },
    { icon: Calendar, label: "Ends On", value: new Date(clock.endTime).toLocaleString() },
    { icon: GitCommitHorizontal, label: "Token ID", value: `#${clock.id}` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="lg:col-span-2 flex items-center justify-center">
        <div
            className={cn(
              "relative w-full max-w-lg aspect-square transition-all duration-500",
              isLegendary && !isEvolved && "animate-pulse-glow"
            )}
            style={{ '--glow-color': rarity.glowColor, filter: `drop-shadow(0 0 25px var(--glow-color))` } as React.CSSProperties}
          >
            {isLegendary && !isEvolved && <Sparkles />}
            <ClockSVG
              percentage={percentage}
              rarity={rarity.name}
              theme={clock.theme}
              isEvolved={isEvolved}
            />
          </div>
      </div>
      <div className="lg:col-span-1">
        <Card className="bg-card/50 backdrop-blur-lg border-border/20">
          <CardHeader>
            <CardTitle className="text-3xl capitalize">
              {clock.theme} Clock #{clock.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center my-6">
              <p className="text-sm text-muted-foreground">Time Remaining</p>
              <p className="font-mono text-5xl tracking-wider text-foreground my-2">
                {formatDuration(timeRemaining)}
              </p>
              <div className="w-full bg-muted rounded-full h-2.5 mt-4">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${percentage * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              {stats.map(stat => (
                <div key={stat.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                    <span>{stat.label}</span>
                  </div>
                  <span className="font-mono capitalize text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
