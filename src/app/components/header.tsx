import Link from "next/link";
import { Timer } from "lucide-react";
import { WalletConnectButton } from "./wallet-connect-button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Timer className="h-6 w-6 text-primary" />
            <span className="font-bold">ChronoForge</span>
          </Link>
          <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/mint"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Mint
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              My Clocks
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
