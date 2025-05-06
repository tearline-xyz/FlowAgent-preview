import React from 'react';
// import { createAppKit } from '@reown/appkit'
import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { WagmiProvider } from 'wagmi';
// import { AppKitProvider } from '@reown/appkit/react';
import {
  mainnet,
  arbitrum,
  sepolia,
  solana,
  solanaTestnet,
  solanaDevnet,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/types";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// @ts-ignore
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum, sepolia, solana, solanaTestnet, solanaDevnet]

// 0. Get projectId from https://cloud.reown.com
const projectId = 'c3eda7efff976a9b64507bc95eefc2f2'
const queryClient = new QueryClient();

// 1. Create the Wagmi adapter
// @ts-ignore
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});
// 2. Create Solana adapter
export const solanaWeb3JsAdapter: any = new SolanaAdapter({
  wallets: [],
});
// 3. Set up the metadata - Optional

export const metadata = {
  name: 'Tearline',
  description:
    'Web3 Questions? Get Degen-Level Answers Beyond GPT – Airdrops Included!',
  url: 'https://tlib.test.tearline.io',
  icons: ['https://www.tearline.xyz/statics/image1/home/home-logo.png'],
};
// 4. Create the AppKit instance
// @ts-ignore
const appKitCreate=createAppKit({
  adapters: [
    wagmiAdapter,
    solanaWeb3JsAdapter
  ],
  networks,
  metadata,
  projectId,
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
})
console.log('modal----', appKitCreate);

interface WagmiGlobalProps {
  children: React.ReactNode;
}
export default function WagmiGlobal({ children }: WagmiGlobalProps) {

  console.log(2222,'WagmiGlobal');
  return (
    // <AppKitProvider value={appKitCreate}>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
    // </AppKitProvider>
  );
}
