import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/context/wallet-context";
import { AppHeader } from "@/app/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChronoForge",
  description: "Mint time-based NFTs that evolve as they approach expiration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <WalletProvider>
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}
