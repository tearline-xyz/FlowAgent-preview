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
        return true; // 找到符合条件的对象
      }
    }
    return d.tokenAddress.toLowerCase() === tokenContract?.toLowerCase();
  });
}

export function mergeAssetsArrays(arrA, arrB) {
  // 使用 map 遍历 b 数组
  return arrB.map((itemB) => {
    // 在 a 数组中查找具有相同 age 的项
    const matchingItem: any = arrA.find(
      (itemA) =>
        itemA.tokenAddress.toLocaleLowerCase() === itemB.tokenContractAddress.toLocaleLowerCase(),
    );

    // 如果找到匹配项，则合并数据
    if (matchingItem) {
      return {
        ...itemB, // 从 a 中复制属性
        balance: matchingItem.balance, // 添加 b 中的 page 属性
        tokenPrice: matchingItem.tokenPrice,
        isRiskToken: matchingItem.isRiskToken,
        amountUsdt: matchingItem.balance * matchingItem.tokenPrice,
      };
    }

    // 如果没有找到匹配项，返回原始 b 项（可选）
    return itemB;
  }); // 过滤掉 undefined 项（如果需要）
}

export const updateUrlParams = (params: {
  inputChain: string | number | undefined;
  inputCurrency: string;
  outputChain: string | number | undefined;
  outputCurrency: string;
}) => {
  const url: any = new URL(window.location.href);

  // 更新或添加参数
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key); // 如果参数值为 undefined，则删除该参数
    }
  });

  // 使用 pushState 更新 URL
  window.history.pushState({}, '', url);
};
export const updateUrlParamsOne = (params: { inputChain: string | number | undefined }) => {
  const url: any = new URL(window.location.href);

  // 更新或添加参数
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, params[key]);
    } else {
      // url.searchParams.delete(key); // 如果参数值为 undefined，则删除该参数
    }
  });

  // 使用 pushState 更新 URL
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
  // 检查输入是否为字符串
  if (typeof input !== 'string') {
    return input; // 如果不是字符串，直接返回
  }

  // // 去除前导空格
  input = input.trim();

  // 检查是否以 '0' 开头
  if (input.startsWith('0')) {
    // 检查第二位字符
    if (input.length > 1 && input[1] !== '.') {
      // 替换为 '0.' 开头的格式
      return '0.' + input.slice(1);
    }
  }

  return input; // 返回原始输入，如果没有修改
}

export function filterNumberPipe(
  event: any,
  decimalPointNumber: number,
  isDecimalNumber: boolean = true,
) {
  event = event.replace(/\。/g, '.');
  event = event.replace(/[^\d\.]/g, '');

  // 先格式化为float，考虑多个点的情况
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
  // 判断小数点后的长度,并做限制
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
