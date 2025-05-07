import { TokenAssetsInterface } from '~/swap/interface';
import { DefaultTokenAddr } from '~/swap/const/contract';
import { chains } from '~/components/Account/api/chainRpc';

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
  return arrB.map(itemB => {
    // 在 a 数组中查找具有相同 age 的项
    const matchingItem: any = arrA.find(
      itemA =>
        itemA.tokenAddress.toLocaleLowerCase() ===
        itemB.tokenContractAddress.toLocaleLowerCase(),
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
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key); // 如果参数值为 undefined，则删除该参数
    }
  });

  // 使用 pushState 更新 URL
  window.history.pushState({}, '', url);
};
export const updateUrlParamsOne = (params: {
  inputChain: string | number | undefined;
}) => {
  const url: any = new URL(window.location.href);

  // 更新或添加参数
  Object.keys(params).forEach(key => {
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
  let block = chains.find(d => Number(d.chainId) === Number(chainId));
  if (block && hash) {
    window.open(`${block.explorerUrl}/tx/${hash}`);
    cb && cb();
  }
};
export const blockAccountOpen = (chainId: number, address: string, cb?: Function) => {
  let block = chains.find(d => Number(d.chainId) === Number(chainId));
  if (block && address) {
    window.open(`${block.explorerUrl}/address/${address}`);
    cb && cb();
  }
};

export const chainName = (chainId: number) => {
  let block = chains.find(d => Number(d.chainId) === Number(chainId));
  return block && block.name;
};
export const FILE_BASE_URL = 'https://static.tearline.xyz';

export function getJettonImgUrl(path: string): string {
  if (path.indexOf('http') === 0) {
    return path;
  }
  return `${FILE_BASE_URL}/${path}`;
}
