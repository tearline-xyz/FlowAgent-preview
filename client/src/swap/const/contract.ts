
import { AllChainData } from '~/swap/interface';
// https://github.com/okx/OKX-DEX-Aggregator-ABI
export const ContractAddress = {
  Ethereum: '0x40aA958dd87FC8305b97f2BA922CDdCa374bcD7f',
  Tron: 'THRAE2VhGNAcvPKtT96AqyXtSQwhiU1XL8',
  'zkSync Era': '0xc67879F4065d3B9fe1C09EE990B891Aa8E3a4c2f',
  Optimism: '0x68D6B739D2020067D1e2F713b999dA97E4d54812',
  Polygon: '0x3B86917369B83a6892f553609F3c2F439C184e31',
  'BNB Chain': '0x2c34A2Fb1d0b4f55de51E1d0bDEfaDDce6b7cDD6',
  OKC: '0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58',
  'Avalanche C': '0x40aA958dd87FC8305b97f2BA922CDdCa374bcD7f',
  Fantom: '0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58',
  Arbitrum: '0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58',
  Linea: '0x57df6092665eb6058DE53939612413ff4B09114E',
  'Conflux eSpace': '0x68D6B739D2020067D1e2F713b999dA97E4d54812',
  Base: '0x57df6092665eb6058DE53939612413ff4B09114E',
  Mantle: '0x57df6092665eb6058DE53939612413ff4B09114E',
  Scroll: '0x57df6092665eb6058DE53939612413ff4B09114E',
  Manta: '0x57df6092665eb6058DE53939612413ff4B09114E',
  Metis: '0x57df6092665eb6058DE53939612413ff4B09114E',
  Blast: '0x5fD2Dc91FF1dE7FF4AEB1CACeF8E9911bAAECa68',
  Zeta: '0x03B5ACdA01207824cc7Bc21783Ee5aa2B8d1D2fE',
  'Polygon zkEvm': '0x57df6092665eb6058DE53939612413ff4B09114E',
  Merlin: '0x8b773D83bc66Be128c60e07E17C8901f7a64F000',
  'X Layer': '0x8b773D83bc66Be128c60e07E17C8901f7a64F000',
};

export const DexRouterAddress = {
  Ethereum: '0x7D0CcAa3Fac1e5A943c5168b6CEd828691b46B36',
  Solana: '6m2CDdhRgxpH4WjvdzxAYbGxwdGUz5MziiL5jek2kBma',
  SUI: '0x3b6c18953596cbd2e3f7d5878126085a2ee56236e6363c9b0c6c81b8a0f87d1c',
  Tron: 'TCkwEw4NdkaTJ1atJg5jZ18NgtHfpzZTC5',
  Ton: 'EQBjfOGw4Iq6FYZplhwZ5rRNb7Htac7WJh8g_eQcGTswxVqP',
  'zkSync Era': '0xb9061E38FeE7d30134F56aEf7117E2F6d1580666',
  Optimism: '0xf332761c673b59B21fF6dfa8adA44d78c12dEF09',
  Polygon: '0xA748D6573acA135aF68F2635BE60CB80278bd855',
  'BNB Chain': '0x9333C74BDd1E118634fE5664ACA7a9710b108Bab',
  OKC: '0xf6Aab105CB9e66e03CAD2c2F3f8558242593385c',
  'Avalanche C': '0x1daC23e41Fc8ce857E86fD8C1AE5b6121C67D96d',
  Fantom: '0xf332761c673b59B21fF6dfa8adA44d78c12dEF09',
  Arbitrum: '0xf332761c673b59B21fF6dfa8adA44d78c12dEF09',
  Linea: '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  'Conflux eSpace': '0x0112bc6fDB78345e612B862a6B388FfeB00E2320',
  Base: '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  Mantle: '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  Scroll: '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  Solana2: '6m2CDdhRgxpH4WjvdzxAYbGxwdGUz5MziiL5jek2kBma',
  Manta: '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  Metis: '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  Blast: '0x2E86f54943faFD2cB62958c3deed36C879e3E944',
  Zeta: '0x0DaB5A5294AfAae76Ce990993fC10b896A01DBd1',
  'Polygon zkEvm': '0x6b2C0c7be2048Daa9b5527982C29f48062B34D58',
  Merlin: '0x127a986cE31AA2ea8E1a6a0F0D5b7E5dbaD7b0bE',
  'X Layer': '0x127a986cE31AA2ea8E1a6a0F0D5b7E5dbaD7b0bE',
};

// TODO 添加剩余默认代币地址 sui
export const DefaultTokenAddr = {
  SOL: '11111111111111111111111111111111',
  ETH: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  TON: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
  APT: '0x1::aptos_coin::AptosCoin',
  BNB: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
};

export const logoList: AllChainData[] = [
  {
    chainId: 137,
    chainName: 'Polygon',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x3B86917369B83a6892f553609F3c2F439C184e31',
    imgUrl: 'Polygon.png',
  },
  {
    chainId: 195,
    chainName: 'TRON',
    symbol: 'TRON',
    dexTokenApproveAddress: 'THRAE2VhGNAcvPKtT96AqyXtSQwhiU1XL8',
    imgUrl: 'TRON.png',
  },
  {
    chainId: 43114,
    chainName: 'Avalanche C',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x40aA958dd87FC8305b97f2BA922CDdCa374bcD7f',
    imgUrl: 'AVAX.png',
  },
  {
    chainId: 1,
    chainName: 'Ethereum',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x40aA958dd87FC8305b97f2BA922CDdCa374bcD7f',
    imgUrl: 'ETH.png',
  },
  {
    chainId: 66,
    chainName: 'OKTC',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58',
    imgUrl: 'OKTC.png',
  },
  {
    chainId: 56,
    chainName: 'BNB Chain',
    symbol: 'BNB',
    dexTokenApproveAddress: '0x2c34A2Fb1d0b4f55de51E1d0bDEfaDDce6b7cDD6',
    imgUrl: 'BNB.png',
  },
  {
    chainId: 250,
    chainName: 'Fantom',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58',
    imgUrl: 'Fantom.png',
  },
  {
    chainId: 42161,
    chainName: 'Arbitrum',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58',
    imgUrl: 'Arbitrum.png',
  },
  {
    chainId: 10,
    chainName: 'Optimism',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x68D6B739D2020067D1e2F713b999dA97E4d54812',
    imgUrl: 'Optimism.png',
  },
  {
    chainId: 25,
    chainName: 'Cronos',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x70cbb871e8f30fc8ce23609e9e0ea87b6b222f58',
    imgUrl: 'Cronos.png',
  },
  {
    chainId: 501,
    chainName: 'Solana',
    symbol: 'SOL',
    dexTokenApproveAddress: '',
    imgUrl: 'Solana.png',
  },
  {
    chainId: 324,
    chainName: 'zkSync Era',
    symbol: 'ETH',
    dexTokenApproveAddress: '0xc67879F4065d3B9fe1C09EE990B891Aa8E3a4c2f',
    imgUrl: 'zkSyncEra.png',
  },
  {
    chainId: 1030,
    chainName: 'Conflux eSpace',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x68D6B739D2020067D1e2F713b999dA97E4d54812',
    imgUrl: 'ConfluxeSpace.png',
  },
  {
    chainId: 784,
    chainName: 'SUI',
    symbol: 'SUI',
    dexTokenApproveAddress: '',
    imgUrl: 'SUI.png',
  },
  {
    chainId: 1101,
    chainName: 'Polygon zkEvm',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'PolygonzkEvm.png',
  },
  {
    chainId: 59144,
    chainName: 'Linea',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'Linea.png',
  },
  {
    chainId: 5000,
    chainName: 'Mantle',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'Mantle.png',
  },
  {
    chainId: 8453,
    chainName: 'Base',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'Base.png',
  },
  {
    chainId: 534352,
    chainName: 'Scroll',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'Scroll.png',
  },
  {
    chainId: 196,
    chainName: 'X Layer',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x8b773D83bc66Be128c60e07E17C8901f7a64F000',
    imgUrl: 'XLayer.png',
  },
  {
    chainId: 169,
    chainName: 'Manta Pacific',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'MantaPacific.png',
  },
  {
    chainId: 1088,
    chainName: 'Metis',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x57df6092665eb6058DE53939612413ff4B09114E',
    imgUrl: 'Metis.png',
  },
  {
    chainId: 7000,
    chainName: 'Zeta',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x03B5ACdA01207824cc7Bc21783Ee5aa2B8d1D2fE',
    imgUrl: 'Zeta.png',
  },
  {
    chainId: 4200,
    chainName: 'Merlin',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x8b773D83bc66Be128c60e07E17C8901f7a64F000',
    imgUrl: 'Merlin.png',
  },
  {
    chainId: 81457,
    chainName: 'Blast',
    symbol: 'ETH',
    dexTokenApproveAddress: '0x5fD2Dc91FF1dE7FF4AEB1CACeF8E9911bAAECa68',
    imgUrl: 'Blast.png',
  },
  {
    chainId: 607,
    chainName: 'TON',
    symbol: 'Ton',
    dexTokenApproveAddress: '',
    imgUrl: 'TON.png',
  },
  {
    chainId: 97,
    chainName: 'BNB',
    symbol: 'BNB',
    dexTokenApproveAddress: '',
    imgUrl: 'BNB.png',
  },
  {
    chainId: 204,
    chainName: 'BNB',
    symbol: 'BNB',
    dexTokenApproveAddress: '',
    imgUrl: 'BNB.png',
  },
  {
    chainId: 5611,
    chainName: 'BNB',
    symbol: 'BNB',
    dexTokenApproveAddress: '',
    imgUrl: 'BNB.png',
  },
].map(d => ({
  ...d,
  imgUrl: `https://www.tearline.xyz/statics/image1/chain/${d.imgUrl}`,
}));

export function getChainLogo(chainId: number | undefined | any) {
  let info: AllChainData[] = logoList.filter(
    (d: AllChainData) => Number(d.chainId) === Number(chainId),
  );
  if (info && info.length) {
    return info[0].imgUrl;
  }
}

export function getChainInfo(
  chainId: number | undefined | any,
  keyName: string,
) {
  let info: AllChainData[] = logoList.filter(
    (d: AllChainData) => Number(d.chainId) === Number(chainId),
  );
  if (info && info.length) {
    return info[0][keyName];
  }
}

export function getChainDexTokenApproveAddress(
  chainId: number | undefined | any,
) {
  let info: AllChainData[] = logoList.filter(
    (d: AllChainData) => Number(d.chainId) === Number(chainId),
  );
  if (info && info.length) {
    return info[0].dexTokenApproveAddress;
  }
}
