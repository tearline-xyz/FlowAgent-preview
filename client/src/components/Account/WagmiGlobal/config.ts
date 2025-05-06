import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  mainnet,
  arbitrum,
  solana,
  bsc,
  bscTestnet,
  optimism,
  zksync,
  base,
  beam,
  berachain,
  blast,
  bob,
  bronos,
  btr,
  bxn,
  cannon,
  canto,
  celo,
  corn,
  cronos,
  curtis,
  cyber,
  darwinia,
  linea,
  metis,
  okc,
  opBNB,
  sei,
  fantom,
  mantle,
  merlin,
  polygon,
  scroll,
  tron,
  xLayer,
  zetachain,
  avalanche,
  confluxESpace,
  opBNBTestnet
} from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
// import {
//   PhantomWalletAdapter,
//   SolflareWalletAdapter,
// } from '@solana/wallet-adapter-wallets';

// Get projectId from https://cloud.reown.com
export const projectId = '9a10921ec64f1100d1b307ce3ad706d5';
if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const metadata = {
  name: 'Tearline',
  description:
    'Web3 Questions? Get Degen-Level Answers Beyond GPT – Airdrops Included!',
  url: 'https://tlib.test.tearline.io',
  icons: ['https://www.tearline.xyz/statics/image1/home/home-logo.png'],
};

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [
  mainnet,
  arbitrum,
  solana,
  bsc,
  optimism,
  zksync,
  base,
  beam,
  berachain,
  blast,
  // bob,
  // bronos,
  // btr,
  // bxn,
  cannon,
  canto,
  // celo,
  // corn,
  cronos,
  curtis,
  cyber,
  darwinia,
  linea,
  metis,
  okc,
  opBNB,
  sei,
  fantom,
  mantle,
  merlin,
  polygon,
  scroll,
  tron,
  xLayer,
  zetachain,
  avalanche,
  confluxESpace,
  bscTestnet,
  opBNBTestnet
] as [AppKitNetwork, ...AppKitNetwork[]];
export const ChainSwitch = {
  1: mainnet,
  42161: arbitrum,
  501: solana,
  56: bsc,
  10: optimism,
  324: zksync,
  8453: base,
  4337: beam,
  80094: berachain,
  81457: blast,
  60808: bob,
  1039: bronos,
  200901: btr,
  4999: bxn,
  13370: cannon,
  7700: canto,
  42220: celo,
  21000000: corn,
  25: cronos,
  33111: curtis,
  7560: cyber,
  46: darwinia,
  59144: linea,
  1088: metis,
  66: okc,
  204: opBNB,
  1329: sei,
  250: fantom,
  5000: mantle,
  4200: merlin,
  137: polygon,
  534352: scroll,
  728126428: tron,
  196: xLayer,
  7000: zetachain,
  43114: avalanche,
  1030: confluxESpace,
  97: bscTestnet,
  5611:opBNBTestnet,
};
//Set up the Wagmi Adapter (Config)
// @ts-ignore
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

// Set up Solana Adapter
export const solanaWeb3JsAdapter: any = new SolanaAdapter({
  wallets: [],
});

export const config = wagmiAdapter.wagmiConfig;
