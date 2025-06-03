export const JSON_RPC_URL = 'https://cloudflare-eth.com';

export const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: JSON_RPC_URL,
};

export const bscMainnet = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/',
};

export const polygonMainnet = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com/',
};

export const solanaMainnet = {
  chainId: 501,
  name: 'Solana',
  currency: 'SOL',
  explorerUrl: 'https://explorer.solana.com',
  rpcUrl: 'https://api.mainnet-beta.solana.com',
};

export const tonMainnet = {
  chainId: 607,
  name: 'TON',
  currency: 'TON',
  explorerUrl: 'https://tonscan.org',
  rpcUrl: 'https://toncenter.com/api/v2/jsonRPC',
};

export const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: JSON_RPC_URL,
  },
  {
    chainId: 56,
    name: 'Binance Smart Chain',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
  {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com/',
  },
  {
    chainId: 501,
    name: 'Solana',
    currency: 'SOL',
    explorerUrl: 'https://explorer.solana.com',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  },
  {
    chainId: 607,
    name: 'TON',
    currency: 'TON',
    explorerUrl: 'https://tonscan.org',
    rpcUrl: 'https://toncenter.com/api/v2/jsonRPC',
  },
  // {
  //   chainId: 8453,
  //   name: 'Blast',
  //   currency: 'BLAST',
  //   explorerUrl: 'https://blastscan.io',
  //   rpcUrl: 'https://rpc.blast.io'
  // },
  {
    chainId: 4200,
    name: 'Merlin',
    currency: 'MERL',
    explorerUrl: 'https://merlinscan.com',
    rpcUrl: 'https://rpc.merlin.xyz',
  },
  {
    chainId: 7000,
    name: 'Zeta',
    currency: 'ZETA',
    explorerUrl: 'https://zetascan.com',
    rpcUrl: 'https://rpc.zeta.io',
  },
  {
    chainId: 1088,
    name: 'Metis',
    currency: 'METIS',
    explorerUrl: 'https://explorer.metis.io',
    rpcUrl: 'https://andromeda.metis.io/?owner=1088',
  },
  {
    chainId: 169,
    name: 'Manta Pacific',
    currency: 'MANTA',
    explorerUrl: 'https://manta.network',
    rpcUrl: 'https://rpc.manta.network',
  },
  {
    chainId: 196,
    name: 'X Layer',
    currency: 'XLAYER',
    explorerUrl: 'https://xlayer.com',
    rpcUrl: 'https://rpc.xlayer.com',
  },
  {
    chainId: 534352,
    name: 'Scroll',
    currency: 'SCRL',
    explorerUrl: 'https://scroll.io',
    rpcUrl: 'https://rpc.scroll.io',
  },
  {
    chainId: 8453,
    name: 'Base',
    currency: 'BASE',
    explorerUrl: 'https://basescan.org',
    rpcUrl: 'https://rpc.base.org',
  },
  {
    chainId: 5000,
    name: 'Mantle',
    currency: 'MNTL',
    rpcUrl: 'https://rpc.mantle.xyz',
  },
  {
    chainId: 59144,
    name: 'Linea',
    currency: 'LINEA',
    explorerUrl: 'https://lineascan.com',
    rpcUrl: 'https://rpc.linea.network',
  },
  {
    chainId: 1101,
    name: 'Polygon zkEvm',
    currency: 'zkEVM',
    explorerUrl: 'https://explorer.zkevm.polygondot.com',
    rpcUrl: 'https://zkevm-rpc.com/',
  },
  {
    chainId: 784,
    name: 'SUI',
    currency: 'SUI',
    explorerUrl: '',
    rpcUrl: '',
  },
  {
    chainId: 1030,
    name: 'Conflux eSpace',
    currency: 'CFX',
    explorerUrl: 'https://confluxscan.net',
    rpcUrl: 'https://evm.confluxnetwork.org',
  },
  {
    chainId: 324,
    name: 'zkSync Era',
    currency: 'ETH',
    explorerUrl: 'https://zkscan.io',
    rpcUrl: 'https://zksync2-mainnet.zksync.io',
  },
  {
    chainId: 25,
    name: 'Cronos',
    currency: 'CRO',
    explorerUrl: 'https://cronoscan.com',
    rpcUrl: 'https://evm.cronos.org',
  },
  {
    chainId: 10,
    name: 'Optimism',
    currency: 'ETH',
    explorerUrl: 'https://optimistic.etherscan.com',
    rpcUrl: 'https://mainnet.optimism.io',
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.com',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  {
    chainId: 250,
    name: 'Fantom',
    currency: 'FTM',
    explorerUrl: 'https://ftmscan.com',
    rpcUrl: 'https://rpcapi.fantom.network',
  },
  {
    chainId: 66,
    name: 'OKTC',
    currency: 'OKT',
    explorerUrl: 'https://www.oklink.com/okexchain',
    rpcUrl: 'https://exchainrpc.okex.org',
  },
  {
    chainId: 43114,
    name: 'Avalanche C',
    currency: 'AVAX',
    explorerUrl: 'https://snowtrace.io',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  },
  {
    chainId: 195,
    name: 'TRON',
    currency: 'TRX',
    explorerUrl: 'https://tronscan.org',
    rpcUrl: 'https://api.tronstack.io/rpc',
  },
  {
    chainId: 97,
    name: 'BNB',
    currency: 'BNB',
    explorerUrl: 'https://testnet.bscscan.com/',
    rpcUrl: 'https://bsc-dataseed.binance.org',
  },
  {
    chainId: 204,
    name: 'OPBNB',
    currency: 'OPBNB',
    explorerUrl: 'https://opbnbscan.com',
    rpcUrl: 'https://opbnb-mainnet-rpc.bnbchain.org',
  },
  {
    chainId: 5611,
    name: 'OPBNB',
    currency: 'OPBNB',
    explorerUrl: 'https://testnet.opbnbscan.com',
    rpcUrl: 'https://opbnb-testnet-rpc.bnbchain.org',
  },
];
