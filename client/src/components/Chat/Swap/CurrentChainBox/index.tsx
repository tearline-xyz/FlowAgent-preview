import React from 'react';
import { CurrentChainBoxRoot, CurrentChainLeft } from './useCurrentChainStyle';
import { getChainLogo } from '~/swap/const/contract';
import { AllChainData } from '~/swap/interface';

interface ICurrentChainBox {
  currentChainInfo: AllChainData | null;
}

export default function CurrentChainBox({ currentChainInfo }: ICurrentChainBox) {
  return (
    <CurrentChainBoxRoot>
      <CurrentChainLeft>
        <img className={'TokenLogo'} src={getChainLogo(currentChainInfo?.chainId)} alt="" />
        {currentChainInfo?.chainName}
      </CurrentChainLeft>
    </CurrentChainBoxRoot>
  );
}
