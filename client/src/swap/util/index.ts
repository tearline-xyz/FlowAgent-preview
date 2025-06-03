import { TokenAssetsInterface } from '~/swap/interface';
import { DefaultTokenAddr } from '~/swap/const/contract';
import { chains } from '~/components/Account/api/chainRpc';
import BigNumber from 'bignumber.js';

export function getAssetsInfo(
  chainTokenAssets: TokenAssetsInterface[],
  tokenContract: string | undefined,
) {
  return chainTokenAssets.find((d: TokenAssetsInterface) => {
    if (
      tokenContract === DefaultTokenAddr.SOL ||
      tokenContract === DefaultTokenAddr.ETH ||
      tokenContract === DefaultTokenAddr.TON ||
      tokenContract === DefaultTokenAddr.APT ||
      tokenContract === DefaultTokenAddr.BNB
    ) {
      if (d.tokenAddress === '') {
        return true;
      }
    }
    return d.tokenAddress.toLowerCase() === tokenContract?.toLowerCase();
  });
}

export function mergeAssetsArrays(arrA, arrB) {

  return arrB.map((itemB) => {

    const matchingItem: any = arrA.find(
      (itemA) =>
        itemA.tokenAddress.toLocaleLowerCase() === itemB.tokenContractAddress.toLocaleLowerCase(),
    );


    if (matchingItem) {
      return {
        ...itemB,
        balance: matchingItem.balance,
        tokenPrice: matchingItem.tokenPrice,
        isRiskToken: matchingItem.isRiskToken,
        amountUsdt: matchingItem.balance * matchingItem.tokenPrice,
      };
    }


    return itemB;
  });
}

export const updateUrlParams = (params: {
  inputChain: string | number | undefined;
  inputCurrency: string;
  outputChain: string | number | undefined;
  outputCurrency: string;
}) => {
  const url: any = new URL(window.location.href);


  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key);
    }
  });


  window.history.pushState({}, '', url);
};
export const updateUrlParamsOne = (params: { inputChain: string | number | undefined }) => {
  const url: any = new URL(window.location.href);


  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, params[key]);
    } else {

    }
  });


  window.history.pushState({}, '', url);
};
export const blockOpen = (chainId: number, hash: string, cb?: Function) => {
  let block = chains.find((d) => Number(d.chainId) === Number(chainId));
  if (block && hash) {
    window.open(`${block.explorerUrl}/tx/${hash}`);
    cb && cb();
  }
};
export const blockAccountOpen = (chainId: number, address: string, cb?: Function) => {
  let block = chains.find((d) => Number(d.chainId) === Number(chainId));
  if (block && address) {
    window.open(`${block.explorerUrl}/address/${address}`);
    cb && cb();
  }
};

export const chainName = (chainId: number) => {
  const block = chains.find((d) => Number(d.chainId) === Number(chainId));
  return block && block.name;
};
export const FILE_BASE_URL = 'https://static.tearline.xyz';

export function getJettonImgUrl(path: string): string {
  if (path.indexOf('http') === 0) {
    return path;
  }
  return `${FILE_BASE_URL}/${path}`;
}

export function formatNumberString(input) {

  if (typeof input !== 'string') {
    return input;
  }


  input = input.trim();


  if (input.startsWith('0')) {

    if (input.length > 1 && input[1] !== '.') {

      return '0.' + input.slice(1);
    }
  }

  return input;
}

export function filterNumberPipe(
  event: any,
  decimalPointNumber: number,
  isDecimalNumber: boolean = true,
) {
  event = event.replace(/\。/g, '.');
  event = event.replace(/[^\d\.]/g, '');


  if (event) {
    const list = event.match(/(\d+\.\d*)/g);
    if (list && list.length) {
      event = list[0];
    }
  }

  const target = new BigNumber(event);
  if (target.isNaN()) {
    event = '';
    return event;
  }

  event === '.' ? (event = '') : '';
  const _split = event.split('.');

  if (_split.length && _split.length > 2) {
    let tempStr = '';
    for (const i in _split) {
      tempStr += _split[i];
      i === '0' ? (tempStr += '.') : '';
    }
    event = tempStr;
  } else {
    if (_split.length === 1) {
      event = formatNumberString(_split[0]);
    }
  }

  const _float = event.split('.');
  if (_float.length && _float.length === 2) {
    _float[0] === '' ? (_float[0] = '0') : '';
    if (isDecimalNumber) {
      event = _float[0] + '.' + _float[1].slice(0, decimalPointNumber);
    } else {
      let _onePoint = _float[1].slice(0, 1);
      if (_float[1] !== '') {
        _onePoint = _float[1].slice(0, 1) < '5' ? '0' : '5';
      }
      event = _float[0] + '.' + _onePoint;
    }
  }
  return event;
}
