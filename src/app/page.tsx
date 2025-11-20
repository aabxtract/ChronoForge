import { ClockCard } from "@/app/components/clock-card";
import { mockClocks } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="my-12 md:my-20">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary via-purple-400 to-accent">
          ChronoForge
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          A universe of time-driven NFTs. Mint a clock, watch it evolve, and own a piece of eternity.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {mockClocks.map((clock) => (
          <ClockCard key={clock.id} clock={clock} />
        ))}
      </div>
    </div>
  );
}
