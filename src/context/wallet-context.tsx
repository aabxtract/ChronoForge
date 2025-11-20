"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = () => {
    const mockAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setAddress(mockAddress);
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: `Address: ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    toast({
      title: "Wallet Disconnected",
    });
  };

  return (
    <WalletContext.Provider value={{ isConnected, address, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
