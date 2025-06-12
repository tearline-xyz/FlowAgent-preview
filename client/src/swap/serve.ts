
import request from '~/axios';
import { Api } from '~/axios/api';

import { DefaultTokenAddr } from '~/swap/const/contract';

export const FILE_BASE_URL = 'https://static.tearline.xyz';
export function getJettonImgUrl(path: string): string {
  if (path.indexOf('http') === 0) {
    return path;
  }
  return `${FILE_BASE_URL}/${path}`;
}


export async function axiosSupportedChain() {
  return request({
    url: Api.swap.supportedChain,
    method: 'get',
  }).then((res: any) => {
    if (res.code === 0) {
      // 56 501 1
      const order = [56, 501, 1];
      res.data.forEach(d => {
        d.chainId = d.id;
        d.chainName = d.name;
        d.dexTokenApproveAddress = d.dex_token_approve_address;
      });
      res.data.sort((a, b) => {
        const indexA = order.indexOf(a.id);
        const indexB = order.indexOf(b.id);


        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });
    }
    return Promise.resolve(res);
  });
}

export async function axiosAllTokens(params: { chain_id: number }) {
  return request({
    url: Api.swap.allTokens,
    method: 'get',
    params: params,
  }).then((res: any) => {
    if (res.code === 0) {
      res.data.forEach((d: any) => {
        d.logo_url = getJettonImgUrl(d.logo_url);
        d.tokenContractAddress = d.contract_address;
        d.tokenLogoUrl = d.logo_url;
        d.tokenName = d.name;
        d.tokenSymbol = d.symbol;
      });
    }
    return Promise.resolve(res);
  });
}

export async function axiosLiquidity(params: { chain_id: number }) {
  return request({
    url: Api.swap.liquidity,
    method: 'get',
    params: params,
  }).then((res: any) => {
    if (res.code === 0) {
      res.data.forEach((d: any) => {
        d.logo = getJettonImgUrl(d.logo);
      });
    }
    return Promise.resolve(res);
  });
}

export async function axiosApproveTransaction(params: {
  chain_id: number;
  token_contract_address: string;
  approve_amount: string;
}) {
  return request({
    url: Api.swap.approveTransaction,
    method: 'get',
    params: {
      ...params,
      chain_index: params.chain_id,
    },
  });
}

export async function axiosAggregatorQuote(params: {
  chain_id: number | any;
  amount: string | any;
  from_token_address: string | any;
  to_token_address: string | any;
  dex_ids?: string | any;
  price_impact_protection_percentage?: string | any;
  fee_percent?: string | any;
}) {
  return request({
    url: Api.swap.quote,
    method: 'get',
    params: {
      ...params,
      chain_index: params.chain_id,
      swap_mode: 'exactIn',
    },
  });
}

export async function axiosSwap(params: any) {
  console.log('params', params);
  const searchParams: any = new URLSearchParams(params);
  const url = `${Api.swap.swap}?${searchParams.toString()}`;
  return request({
    url: url,
    method: 'post',
    data: {
      ...params,
      chain_index: params.chain_id,
      swap_mode: 'exactIn',
    },
  });
}

// https://www.okx.com/zh-hans/web3/build/docs/waas/walletapi-api-get-realtime-pricelist
export async function axiosRealTimePrice(params: any) {
  return request({
    url: Api.swap.realTimePrice,
    method: 'post',
    data: params,
  });
}

export async function getChainAssets(params: { address: any; chains: any }) {
  return request({
    url: Api.swap.walletAllTokenBalances,
    method: 'get',
    params: params,
  }).then((res: any) => {
    if (res.code === 0 && res.data.length) {
      res.data[0].tokenAssets.forEach((d: any) => {
        // if (d.tokenAddress === '') {
        //   d.tokenAddress = DefaultTokenAddr.ETH
        // }
        if (d.symbol === 'ETH' && d.tokenAddress === '') {
          d.tokenAddress = DefaultTokenAddr.ETH;
        }
        if (d.symbol === 'BNB' && d.tokenAddress === '') {
          d.tokenAddress = DefaultTokenAddr.BNB;
        }
        if (d.symbol === 'SOL' && d.tokenAddress === '') {
          d.tokenAddress = DefaultTokenAddr.SOL;
        }
        if (d.symbol === 'TON' && d.tokenAddress === '') {
          d.tokenAddress = DefaultTokenAddr.TON;
        }
        if (d.symbol === 'APT' && d.tokenAddress === '') {
          d.tokenAddress = DefaultTokenAddr.APT;
        }
      });
    }
    return Promise.resolve(res);
  });
}

export async function getTokenDetail(params: {
  chain_index: string | number | undefined | null;
  token_address: string;
}) {
  return request({
    url: Api.swap.tokenDetail,
    method: 'get',
    params: params,
  });
}


export async function orderInfo(data: { order_id: string }) {
  return request({
    url: Api.swap.orderInfo,
    method: 'get',
    params: data,
  });
}


export async function orderList(data: {
  order_id?: string;
  order_type: string;
}) {
  return request({
    url: Api.swap.orderList,
    method: 'get',
    params: data,
  });
}

export async function orderTrigger(data: {
  order_id: string;
  tx_hash?: any;
  action: string;
}) {
  return request({
    url: Api.swap.orderTrigger,
    method: 'post',
    data,
  });
}

export async function dexOrderCheck() {
  return request({
    url: Api.swap.dexOrderCheck,
    method: 'post',
  });
}
