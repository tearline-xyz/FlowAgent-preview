// import { IServerJetton } from '@src/modules/Swap/interface';
// import { COIN_CONTRACT_ADDRESSES } from '@src/const/contractAddr';
export const COIN_CONTRACT_ADDRESSES = {
  pankCakeRouterAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // PancakeSwap V2 Factory
  cake: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
  usdt: '0x55d398326f99059fF775485246999027B3197955',  // BSC-USDT
  wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
};

export const ContractAddr = {
  56: {
    recharge: '0xa40E1d8eA266387088AB3904D982D146e2727f34',
    vecake: '0x5692db8177a81a6c6afc8084c2976c9933ec1bab',
    cake: COIN_CONTRACT_ADDRESSES.cake,
  },
  97: {
    recharge: '0x502f6503BF4E1b37A63ac6e3f199EedcB988Cd6e',
    vecake: '0x5692db8177a81a6c6afc8084c2976c9933ec1bab',
    cake: COIN_CONTRACT_ADDRESSES.cake,
  },
};

import {IServerJetton} from '~/swap/interface';


export const TON_CONSOLE_CONFIG = {
  host: 'https://tonapi.io',
  apiKey: '',
};
export const TON_CENTER_CONFIG = {
  host: 'https://toncenter.com/api/v2/jsonRPC',
  apiKey: '51e1c8ad56ca53d2d88ba2e65c705567c5d7fda461da9391b11d21aa7d72949c',
};
export const STON_CONFIG = {
  api: 'https://api.ston.fi',
  rpc: 'https://ton-api.ston.fi/jsonRPC',
};
export const ConfigFee = {
  feePercent: 0.5,
  referrerAddress: '0x59A9C11A6a990915F72233Cbbf645bD03CaFE8D1',
  solReferrerAddress: '21ojNUjBfBaGi83JWS7L9sDNBD8m2rgRbHnfzPD2gtaE',
};
export const BSC_BNB_JETTON_INFO: IServerJetton = {
  decimals: '18',
  tokenContractAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  tokenLogoUrl: 'https://www.okx.com/cdn/wallet/logo/BNB-20220308.png',
  tokenName: 'BNB',
  tokenSymbol: 'BNB',
};

export const BSC_CAKE_JETTON_INFO: IServerJetton = {
  decimals: '18',
  tokenContractAddress: COIN_CONTRACT_ADDRESSES.cake,
  tokenLogoUrl: 'https://www.okx.com/cdn/wallet/logo/CAKE-20220308.png',
  tokenName: 'Cake',
  tokenSymbol: 'Cake',
};
export const BSC_USDT_JETTON_INFO: IServerJetton = {
  decimals: '18',
  tokenContractAddress: COIN_CONTRACT_ADDRESSES.usdt,
  tokenLogoUrl: 'https://static.oklink.com/cdn/web3/currency/token/small/137-0x1e4a5963abfd975d8c9021ce480b42188849d41d-1?v=1738749219079',
  tokenName: 'USDT',
  tokenSymbol: 'USDT',
};
