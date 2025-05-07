
import { AllChainData, IServerJetton } from '~/swap/interface';
import useOkxSwap from '~/swap/hooks/useOkxSwap';
interface IProps {
  inputJetton: IServerJetton | null;
  outputJetton: IServerJetton | null;
  inputAmount: string;
  currentChain: AllChainData | null;
  userAddress: string | undefined;
}

export default function useSwapStation({
                                         inputJetton,
                                         outputJetton,
                                         inputAmount,
                                         currentChain,
                                         userAddress,
                                       }: IProps) {
  const {
    toTradeAmount,
    swapTokenInfo,
    approve,
    reloadSwap,
    swapERC20,
    quoteCode,
  } = useOkxSwap({
    inputJetton,
    outputJetton,
    inputAmount,
    currentChain,
    userAddress,
  });

  return {
    toTradeAmount,
    swapTokenInfo,
    approve,
    reloadSwap,
    swapERC20,
    quoteCode,
  };
}
