export interface AllChainData {
  chainId: number;
  chainName: string;
  dexTokenApproveAddress: string;
  imgUrl?: string;
  symbol?: string;
}

export interface IServerJetton {
  decimals: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSymbol: string;
  balance?: string;
  tokenPrice?: string;
  isRiskToken?: boolean;
  amountUsdt?: number;
}

export interface DexProtocolInterface {
  dexName: string;
  percent: string;
}

export interface SubRouterListInterface {
  dexProtocol: DexProtocolInterface[];
  fromToken: {
    decimal: string;
    isHoneyPot: boolean;
    taxRate: string;
    tokenContractAddress: string;
    tokenSymbol: string;
    tokenUnitPrice: string;
  };
  toToken: {
    decimal: string;
    isHoneyPot: boolean;
    taxRate: string;
    tokenContractAddress: string;
    tokenSymbol: string;
    tokenUnitPrice: string;
  };
}

export interface DexRouterListInteface {
  router: string;
  routerPercent: string;
  subRouterList: SubRouterListInterface[];
}

export interface QuoteCompareListInterface {
  amountOut: string;
  dexLogo: string;
  dexName: string;
  tradeFee: string;
}

export interface SwapDataInfo {
  dexRouterList: DexRouterListInteface;
  priceImpactPercentage: string;
  quoteCompareList: QuoteCompareListInterface[];
  baseUsdtPrice: number | string;
  tokenUsdtPrice: number | string;
  estimateGasFee: number | string;
  tradeFee: number | string;
  minimumReceived: number;
  maxQuoteObject: QuoteCompareListInterface;
}

export interface TokenAssetsInterface {
  chainIndex: string;
  tokenAddress: string;
  address: string;
  symbol: string;
  balance: string;
  tokenPrice: string;
  tokenType: string;
  isRiskToken: boolean;
  transferAmount: string;
  availableAmount: string;
}

export interface SwapParams {
  chain_id: number | string;
  amount: string;
  from_token_address: string | any;
  to_token_address: string | any;
  slippage: string;
  user_wallet_address: string | any;
  referrer_address?: string;
  swap_receiver_address?: string;
  fee_percent?: string;
  gas_limit?: string;
  gas_level?: string;
  dex_ids?: string;
  price_impact_protection_percentage?: string;
  call_data_memo?: string;
  to_token_referrer_address?: string;
  compute_unit_price?: string;
  compute_unit_limit?: string;
  from_token_referrer_wallet_address?: string;
  to_token_referrer_wallet_address?: string;
}
export interface TransactionParams {
  from_amount: string;
  from_coin: string;
  to_amount: string;
  to_coin: string;
  outputChain?: string;
  inputChain?: string;
}

export interface LiquidityInterface {
  id: number;
  chain_id: number;
  name: string;
  logo: string;
  checked: boolean;
}

export interface ChatTransaction {
  chain_id: number;
  chain_name: string;
  from_amount: string;
  from_coin: string;
  from_decimal: number;
  from_symbol: string;
  to_amount: string;
  to_coin: string;
  to_decimal: number;
  to_symbol: string;
}
