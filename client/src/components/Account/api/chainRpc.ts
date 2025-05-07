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
  chainId: 501, // Solana 的链 ID
  name: 'Solana',
  currency: 'SOL',
  explorerUrl: 'https://explorer.solana.com', // Solana 区块浏览器 URL
  rpcUrl: 'https://api.mainnet-beta.solana.com', // Solana RPC URL
};

export const tonMainnet = {
  chainId: 607, // TON 的链 ID（请确认正确的链 ID）
  name: 'TON',
  currency: 'TON',
  explorerUrl: 'https://tonscan.org', // TON 区块浏览器 URL
  rpcUrl: 'https://toncenter.com/api/v2/jsonRPC', // TON RPC URL（请确认）
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
    chainId: 501, // Solana 的链 ID
    name: 'Solana',
    currency: 'SOL',
    explorerUrl: 'https://explorer.solana.com', // Solana 区块浏览器 URL
    rpcUrl: 'https://api.mainnet-beta.solana.com', // Solana RPC URL
  },
  {
    chainId: 607, // TON 的链 ID（请确认正确的链 ID）
    name: 'TON',
    currency: 'TON',
    explorerUrl: 'https://tonscan.org', // TON 区块浏览器 URL
    rpcUrl: 'https://toncenter.com/api/v2/jsonRPC', // TON RPC URL（请确认）
  },
  // {
  //   chainId: 8453,
  //   name: 'Blast',
  //   currency: 'BLAST',
  //   explorerUrl: 'https://blastscan.io', // 请确认是否有合适的区块浏览器
  //   rpcUrl: 'https://rpc.blast.io' // 请确认 RPC URL
  // },
  {
    chainId: 4200,
    name: 'Merlin',
    currency: 'MERL',
    explorerUrl: 'https://merlinscan.com', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.merlin.xyz', // 请确认 RPC URL
  },
  {
    chainId: 7000,
    name: 'Zeta',
    currency: 'ZETA',
    explorerUrl: 'https://zetascan.com', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.zeta.io', // 请确认 RPC URL
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
    explorerUrl: 'https://manta.network', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.manta.network', // 请确认 RPC URL
  },
  {
    chainId: 196,
    name: 'X Layer',
    currency: 'XLAYER',
    explorerUrl: 'https://xlayer.com', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.xlayer.com', // 请确认 RPC URL
  },
  {
    chainId: 534352,
    name: 'Scroll',
    currency: 'SCRL',
    explorerUrl: 'https://scroll.io', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.scroll.io', // 请确认 RPC URL
  },
  {
    chainId: 8453,
    name: 'Base',
    currency: 'BASE',
    explorerUrl: 'https://basescan.org', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.base.org', // 请确认 RPC URL
  },
  {
    chainId: 5000,
    name: 'Mantle',
    currency: 'MNTL',
    explorerUrl: 'https://mantlescan.com', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.mantle.xyz', // 请确认 RPC URL
  },
  {
    chainId: 59144,
    name: 'Linea',
    currency: 'LINEA',
    explorerUrl: 'https://lineascan.com', // 请确认是否有合适的区块浏览器
    rpcUrl: 'https://rpc.linea.network', // 请确认 RPC URL
  },
  {
    chainId: 1101,
    name: 'Polygon zkEvm',
    currency: 'zkEVM',
    explorerUrl: 'https://explorer.zkevm.polygondot.com',
    rpcUrl: 'https://zkevm-rpc.com/', // 请确认 RPC URL
  },
  {
    chainId: 784,
    name: 'SUI',
    currency: 'SUI',
    explorerUrl: '', // SUI 的区块浏览器（请查找）
    rpcUrl: '', // SUI 的 RPC URL（请查找）
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
