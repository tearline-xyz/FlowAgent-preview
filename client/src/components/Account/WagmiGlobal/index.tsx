import React from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  projectId,
  metadata,
  networks,
  wagmiAdapter,
  solanaWeb3JsAdapter,
} from './config';

const queryClient = new QueryClient();

interface WagmiGlobalProps {
  children: React.ReactNode;
}

// Create modal
createAppKit({
  adapters: [
    wagmiAdapter,
    solanaWeb3JsAdapter,
  ],
  projectId,
  metadata,
  networks,
  // themeMode: 'light' as const,
  features: {
    // email: false,
    // socials: [],
    // emailShowWallets: false,
    connectMethodsOrder: ['wallet'],
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  // allWallets: '',
  themeVariables: {
    '--w3m-accent': '#000000',
  },
});

export default function WagmiGlobal({ children }: WagmiGlobalProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
