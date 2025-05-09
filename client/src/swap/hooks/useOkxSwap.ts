import { AllChainData, IServerJetton, SwapDataInfo } from '~/swap/interface';
import { useEffect, useState } from 'react';

import { ConfigFee } from '~/swap/const';

import { axiosApproveTransaction, axiosAggregatorQuote, axiosSwap } from '~/swap/serve';
import { useInterval } from '~/swap/hooks/useInterval';

import BigNumber from 'bignumber.js';

export function shiftedBy(allowance: any, decimals: any, direction: number) {
  const target = new BigNumber(allowance);
  if (target.isNaN()) {
    return '';
  }
  return new BigNumber(allowance).shiftedBy(direction * decimals).toFixed();
}


interface IProps {
  inputJetton: IServerJetton | null;
  outputJetton: IServerJetton | null;
  inputAmount: string;
  currentChain: AllChainData | null;

  userAddress: string | undefined;
  slippage:string
}

export default function useOkxSwap({
                                     inputJetton,
                                     outputJetton,
                                     inputAmount,
                                     currentChain,
                                     userAddress,
                                     slippage
                                   }: IProps) {
  // console.log('inputJetton', inputJetton)
  // console.log('outputJetton', outputJetton)
  // console.log('inputAmount', inputAmount)
  // console.log('currentChain', currentChain)
  // const {walletProvider} = useWeb3ModalProvider();

  const [toTradeAmount, setToTradeAmount] = useState<string>('');
  const [loadingQuote, setLoadingQuote] = useState<boolean>(false);
  const [quoteCode, setQuoteCode] = useState<number>(0);
  const [swapTokenInfo, setSwapTokenInfo] = useState<SwapDataInfo>();
  const [dealy, setDealy] = useState<any>(null);
  // const dispatch = useAppDispatch();
  useInterval(async () => {
    setDealy(null);
    await getSwapQuote();
    setDealy(15000);
  }, dealy);

  const getSwapQuote = async () => {
    if (
      !inputJetton ||
      !outputJetton ||
      !currentChain ||
      !inputAmount ||
      +inputAmount <= 0
    ) {
      return;
    }

    const inputAmount1: string = shiftedBy(
      inputAmount,
      inputJetton.decimals,
      1,
    );
    setLoadingQuote(true);
    // dispatch(swapSlice.actions.setLoadingQuote(true));
    axiosAggregatorQuote({
      chain_id: currentChain?.chainId as number,
      amount: inputAmount1,
      from_token_address: inputJetton.tokenContractAddress,
      to_token_address: outputJetton.tokenContractAddress,
      // dex_ids: '29,37,39,32,33,35,36,41,44,50,46,30,43,53,59,60,81,83,80,86,88,91,92,90,99,28,100,248,112,113,135,168,147,153,150,141,146,149,154,102,148,145,173,164,174,185,195,189,180,187,188,191,178,200,216,218,223,265,267,275,271,269,374,380,395,394',
      // price_impact_protection_percentage: swapStore.customSlippage / 100 + '',
      fee_percent: ConfigFee.feePercent,
    })
      .then((res: any) => {
        setQuoteCode(res.code);
        if (Number(res.code) === 0 && res.data.length) {
          const data: any = res.data[0];
          const {
            dexRouterList,
            estimateGasFee,
            fromToken,
            priceImpactPercentage,
            quoteCompareList,
            toToken,
            toTokenAmount,
            tradeFee,
          } = data;
          let toAmount = shiftedBy(toTokenAmount, Number(toToken?.decimal), -1);

          let amountOut = quoteCompareList.length
            ? Math.min(...quoteCompareList.map(d => d.amountOut))
            : Number(toAmount) * 0.95;
          let maxQuoteObject = quoteCompareList.length
            ? quoteCompareList.reduce((max, current) => {
              return current.amountOut > max.amountOut ? current : max;
            })
            : {};

          setToTradeAmount(toAmount);

          // dispatch(swapSlice.actions.setQuoteCompareList(quoteCompareList));
          //
          // dispatch(
          //   swapSlice.actions.setSwapInfo({
          //     toToken: {
          //       tokenSymbol: toToken.tokenSymbol,
          //       tokenUnitPrice: toToken.tokenUnitPrice,
          //     },
          //   }),
          // );
          setSwapTokenInfo({
            dexRouterList,
            priceImpactPercentage,
            quoteCompareList,
            baseUsdtPrice: Number(fromToken.tokenUnitPrice),
            tokenUsdtPrice: Number(toToken.tokenUnitPrice),
            estimateGasFee: Number(estimateGasFee),
            tradeFee,
            minimumReceived: amountOut,
            maxQuoteObject,
          });
        } else {
          setToTradeAmount('');

          // dispatch(swapSlice.actions.setQuoteCompareList([]));
        }
      })
      .finally(() => {
        setLoadingQuote(false);
        // dispatch(swapSlice.actions.setLoadingQuote(false));
      });
    // getQuote({
    //   chainId: currentChain?.chainId as number,
    //   amount: inputAmount1,
    //   fromTokenAddress: inputJetton.tokenContractAddress,
    //   toTokenAddress: outputJetton.tokenContractAddress,
    //   // dexIds: '29,37,39,32,33,35,36,41,44,50,46,30,43,53,59,60,81,83,80,86,88,91,92,90,99,28,100,248,112,113,135,168,147,153,150,141,146,149,154,102,148,145,173,164,174,185,195,189,180,187,188,191,178,200,216,218,223,265,267,275,271,269,374,380,395,394',
    //   priceImpactProtectionPercentage: slippage,
    //   feePercent: ConfigFee.feePercent
    // })
  };

  const approve = (cb: Function) => {
    if (
      !inputJetton ||
      !outputJetton ||
      !currentChain ||
      !inputAmount ||
      +inputAmount <= 0
    ) {
      return;
    }
    // console.log('inputAmount', inputAmount);
    // const inputAmount1: string = shiftedBy(new BigNumber(inputAmount).plus(0.1).minus(0.000001).toString(), inputJetton.decimals, 1)
    const inputAmount1: string = shiftedBy(
      inputAmount,
      inputJetton.decimals,
      1,
    );
    // console.log('inputAmount1', inputAmount1);
    axiosApproveTransaction({
      chain_id: currentChain?.chainId as number,
      token_contract_address: inputJetton.tokenContractAddress,
      approve_amount: inputAmount1,
    }).then((res: any) => {
      cb(res);
    });
    // getApproveTransaction({
    //   chainId: currentChain?.chainId as number,
    //   tokenContractAddress: inputJetton.tokenContractAddress,
    //   approveAmount: inputAmount1
    // }).then((res: any) => {
    //   cb(res)
    // })
  };

  const swapERC20 = (ids: string = '', cb: Function) => {
    if (
      !inputJetton ||
      !outputJetton ||
      !currentChain ||
      !inputAmount ||
      +inputAmount <= 0
    ) {
      return;
    }
    const inputAmount1: string = shiftedBy(
      new BigNumber(inputAmount).toFixed(12, 1),
      inputJetton.decimals,
      1,
    );
    let request: {
      amount: string;
      chain_id: number | undefined;
      to_token_address: string;
      user_wallet_address: string | undefined;
      from_token_address: string;
      slippage: string;
      dex_ids?: string;
    } = {
      chain_id: currentChain?.chainId,
      amount: inputAmount1,
      from_token_address: inputJetton.tokenContractAddress,
      to_token_address: outputJetton.tokenContractAddress,
      slippage: Number(slippage) / 100 + '',
      user_wallet_address: userAddress,
    };
    if (ids) {
      request = {
        ...request,
        dex_ids: ids,
      };
    }
    // const request = {
    //   chain_id: currentChain?.chainId,
    //   amount: inputAmount1,
    //   from_token_address: inputJetton.tokenContractAddress,
    //   to_token_address: outputJetton.tokenContractAddress,
    //   slippage: slippage,
    //   user_wallet_address: userAddress,
    //   dexIds: '29,37,39,32,33,35,36,41,44,50,46,30,43,53,59,60,81,83,80,86,88,91,92,90,99,28,100,248,112,113,135,168,147,153,150,141,146,149,154,102,148,145,173,164,174,185,195,189,180,187,188,191,178,200,216,218,223,265,267,275,271,269,374,380,395,394',
    // }
    axiosSwap(request).then((res: any) => {
      cb(res);
    });
  };
  useEffect(() => {
    // console.log('inputJetton', inputJetton);
    // console.log('outputJetton', outputJetton);
    // console.log('inputAmount', inputAmount);
    getSwapQuote();
    return () => {
    };
  }, [inputJetton?.tokenContractAddress, outputJetton?.tokenContractAddress, inputAmount]);
  useEffect(() => {
    setDealy(null);
    if (inputAmount) {
      setDealy(15000);
    } else {
      setToTradeAmount('');
      setDealy(null);
    }
    return () => {
    };
  }, [inputAmount]);

  const reloadSwap = async () => {
    setDealy(null);
    await getSwapQuote();
    setDealy(15000);
  };

  return {
    toTradeAmount,
    swapTokenInfo,
    approve,
    swapERC20,
    quoteCode,
    reloadSwap,
    loadingQuote,
  };
}
