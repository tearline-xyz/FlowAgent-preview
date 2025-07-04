import { memo, useEffect, useState } from 'react';
import {
  axiosAggregatorQuote,
  axiosLiquidity,
  axiosSupportedChain,
  getTokenDetail,
} from '~/swap/serve';
// import { logoList } from '~/swap/const/contract';
import { AllChainData, ChatTransaction, IServerJetton, LiquidityInterface } from '~/swap/interface';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import useSwapStation from '~/swap/hooks/useSwapStation';
import { shiftedBy } from '~/swap/hooks/useOkxSwap';
import { DefaultTokenAddr, getChainInfo } from '~/swap/const/contract';
import ConnectWallet from '~/components/Chat/Swap/ConnectWalet';
import CheckNetwork from '~/components/Chat/Swap/CheckNetwork';
import EvmButton from '~/components/Chat/Swap/EvmButton';
import SolButton from '~/components/Chat/Swap/SolButton';
import { EtherInitApi } from '~/swap/const/erher-api';
import { SolApi } from '~/swap/const/sol-api';
import { useInterval } from '~/swap/hooks/useInterval';
import SwapPanelInputBox from '../SwapPanelInput/SwapPanalInput';
import { DivExChangeBox, DivSwapPanel, DivSwapPanelBox } from './useSwapWrapStyle';
import { getImageUrl } from '~/swap/util/image-url';
import { ToFixedPipe } from '~/swap/const/bignumber';
import CurrentChainBox from '../CurrentChainBox';
import SwapSlippage from '../SwapSlipPage';
import SuiButton from '~/components/Chat/Swap/SuiButton';
import useSuiWeb3 from '~/components/Account/hooks/useSuiWeb3';

export const transferData = {
  acton: 'okx_swap_v1',
  data: [
    {
      from_coin: '0x2::sui::SUI',
      from_decimal: 6,
      from_symbol: 'Sui',
      to_coin: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
      to_decimal: 18,
      to_symbol: 'CETUS',
      from_amount: '0.1',
      to_amount: '0',
      chain_name: 'Sui',
      chain_id: 784,
    },
    {
      from_coin: '11111111111111111111111111111111',
      from_decimal: 18,
      from_symbol: 'SOL',
      to_coin: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
      // 'to_coin': 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      to_decimal: 18,
      to_symbol: 'PYTH',
      from_amount: '0.01',
      to_amount: '0',
      chain_name: 'SOL',
      chain_id: 501,
    },
  ],
};

interface ISwapWarp {
  data: {
    action: string;
    data: ChatTransaction[];
  };
}

const SwapWarp = memo(({ data }: ISwapWarp) => {
  // console.log('SwapWarp', data);
  const [slippage, setSlippage] = useState<string>('0.5');
  const [inputValue, setInputValue] = useState<string>('');
  const [liquidityList, setLiquidityList] = useState<LiquidityInterface[]>([]);
  const [currentChainInfo, setCurrentChainInfo] = useState<AllChainData | null>(null);
  const [inputJetton, setInputJetton] = useState<IServerJetton | null>(null);
  const [outputJetton, setOutputJetton] = useState<IServerJetton | null>(null);
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [chainNumber, setChainNumber] = useState<number>(-1);
  // const [fromTokenBalance, setFromTokenBalance] = useState<string>('');
  const [transactonSuccess, setTransactonSuccess] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');
  const {
    isConnected,
    address,
    evmChain,
    solChain,
    suiChain,
    getTokenBalance,
    chainId,
    walletProvider,
    // openModal
  } = useCustomWeb3Modal();
  const { toTradeAmount, swapTokenInfo, approve, swapERC20, quoteCode, reloadSwap } =
    useSwapStation({
      inputJetton,
      outputJetton,
      inputAmount: inputValue,
      currentChain: currentChainInfo,
      userAddress: address,
      slippage,
    });
  // console.log('toTradeAmount', toTradeAmount);

  useEffect(() => {
    initTokenBalance();
    axiosSupportedChain().then((res: any) => {
      if (res.code === 0) {
        let chainAllData = res.data;
        const transaction: ChatTransaction[] = data.data;
        if (transaction && transaction.length) {
          let transactionParams: ChatTransaction = {
            chain_id: 0,
            chain_name: '',
            from_amount: '',
            from_coin: '',
            from_decimal: 0,
            from_symbol: '',
            to_amount: '',
            to_coin: '',
            to_decimal: 0,
            to_symbol: '',
          };
          let arrParams: any = transaction.filter((d: ChatTransaction) => {
            return Number(d.chain_id) === 56;
          });
          if (arrParams.length) {
            transactionParams = arrParams[0];
          } else {
            transactionParams = transaction[0];
          }
          const currChain: AllChainData[] = chainAllData.filter(
            (i: AllChainData) => i.chainId === transactionParams.chain_id,
          );
          if (currChain.length) {
            const item = currChain[0];
            setCurrentChainInfo({
              ...item,
              imgUrl: getChainInfo(item.chainId, 'imgUrl'),
              symbol: getChainInfo(item.chainId, 'symbol'),
            });
          }
          initParams(transactionParams).then();
        }
      }
    });
    return () => {};
  }, []);

  const initTokenBalance = async () => {
    const inputTokenBalance = await getTokenBalance(inputJetton?.tokenContractAddress ?? '');
    const outputTokenBalance = await getTokenBalance(outputJetton?.tokenContractAddress ?? '');
    setInputJetton((prev) => (prev ? { ...prev, balance: inputTokenBalance } : null));
    setOutputJetton((prev) => (prev ? { ...prev, balance: outputTokenBalance } : null));
  };
  useInterval(() => {
    initTokenBalance();
  }, 5000);

  const onExchangeInOut = async () => {
    const temp = JSON.parse(JSON.stringify(inputJetton));

    setInputJetton(outputJetton);
    setOutputJetton(temp);
    // setInputValue('')
  };
  const getIds = () => {
    let ids = '';
    let arr: any = liquidityList.filter((d: LiquidityInterface) => d.checked);
    if (arr.length) {
      ids = arr.map((item) => item.id).join(',');
    }
    return ids;
  };

  useEffect(() => {
    if (!currentChainInfo?.chainId) {
      return;
    }
    axiosLiquidity({
      chain_id: currentChainInfo?.chainId as number,
    }).then((res: any) => {
      if (res.code === 0) {
        setLiquidityList(res.data);
      }
    });
    return () => {};
  }, [currentChainInfo?.chainId]);

  const initParams = async (dataChat: ChatTransaction) => {
    const transactionParams = dataChat;
    const inputJetton_ = transactionParams?.from_coin;
    const outputJetton_ = transactionParams?.to_coin;
    const inputChain_ = transactionParams?.chain_id;
    if (inputJetton_) {
      getTokenDetail({
        chain_index: inputChain_,
        token_address: inputJetton_,
      }).then((res: any) => {
        if (res.code === 0 && res.data.length) {
          const arr: IServerJetton[] = res.data.map((d: any) => {
            return {
              decimals: d.decimals,
              tokenContractAddress: d.tokenAddress,
              tokenLogoUrl: d.logoUrl,
              tokenName: d.name,
              tokenSymbol: d.symbol,
            };
          });
          setInputJetton(arr[0]);
        }
      });
    }
    if (outputJetton_) {
      getTokenDetail({
        chain_index: inputChain_,
        token_address: outputJetton_,
      }).then((res: any) => {
        if (res.code === 0 && res.data.length) {
          let arr: IServerJetton[] = res.data.map((d: any) => {
            return {
              decimals: d.decimals,
              tokenContractAddress: d.tokenAddress,
              tokenLogoUrl: d.logoUrl,
              tokenName: d.name,
              tokenSymbol: d.symbol,
            };
          });
          setOutputJetton(arr[0]);
        }
      });
    }
    if (transactionParams?.from_amount) {
      setInputValue(transactionParams?.from_amount as string);
    } else if (
      transactionParams?.to_amount &&
      !transactionParams?.from_amount &&
      inputJetton_ &&
      outputJetton_ &&
      transactionParams?.chain_id
    ) {
      const resQuot: any = await axiosAggregatorQuote({
        chain_id: transactionParams?.chain_id,
        amount: transactionParams?.to_amount,
        from_token_address: inputJetton_,
        to_token_address: outputJetton_,
        // price_impact_protection_percentage: swapStore.customSlippage / 100 + '',
      });
      if (Number(resQuot.code) === 0 && resQuot.data.length) {
        const data: any = resQuot.data[0];
        const { toToken, toTokenAmount } = data;
        const toAmount = shiftedBy(toTokenAmount, Number(toToken?.decimal), -1);
        setInputValue(toAmount);
      }
    }
  };

  return (
    <DivSwapPanel>
      <CurrentChainBox currentChainInfo={currentChainInfo} />
      <DivSwapPanelBox>
        <SwapPanelInputBox
          type="input"
          showMax={true}
          inputValue={inputValue}
          jettonData={inputJetton}
          disabled={false}
          onChangeValue={(val) => {
            setInputValue(val);
          }}
          swapTokenInfo={swapTokenInfo}
          currentChainInfo={currentChainInfo}
        />
        <DivExChangeBox onClick={onExchangeInOut}>
          <img src={getImageUrl('swap/exchange.png')} alt="" />
        </DivExChangeBox>
      </DivSwapPanelBox>
      <DivSwapPanelBox>
        <SwapPanelInputBox
          type="output"
          showMax={false}
          inputValue={
            inputValue
              ? toTradeAmount
                ? ToFixedPipe(toTradeAmount, Number(toTradeAmount) > 10 ? 4 : 8, 1)
                : ''
              : ''
          }
          jettonData={outputJetton}
          disabled={true}
          onChangeValue={(val) => {
            setOutputJetton(val);
          }}
          swapTokenInfo={swapTokenInfo}
          currentChainInfo={currentChainInfo}
        />
      </DivSwapPanelBox>
      <SwapSlippage setSlippage={setSlippage} slippage={slippage} />
      {!isConnected ? (
        <ConnectWallet
          isSwitch={isSwitch}
          setIsSwitch={setIsSwitch}
          chainId={currentChainInfo?.chainId as number}
          setChainNumber={setChainNumber}
        />
      ) : (
        <>
          {evmChain ? (
            <EvmButton
              inputValue={inputValue}
              getIds={getIds()}
              inputJetton={inputJetton}
              outputJetton={outputJetton}
              quoteCode={quoteCode}
              swapERC20={swapERC20}
              setTransactonSuccess={setTransactonSuccess}
              setHash={setHash}
              approve={approve}
              currentTokenBalance={inputJetton?.balance as string}
              connect={() => {
                setIsSwitch(true);
              }}
              currentChainInfo={currentChainInfo}
            />
          ) : solChain ? (
            <SolButton
              inputValue={inputValue}
              getIds={getIds()}
              inputJetton={inputJetton}
              outputJetton={outputJetton}
              quoteCode={quoteCode}
              swapERC20={swapERC20}
              setTransactonSuccess={setTransactonSuccess}
              setHash={setHash}
              currentTokenBalance={inputJetton?.balance as string}
              connect={() => {
                setIsSwitch(true);
              }}
              currentChainInfo={currentChainInfo}
            />
          ) : suiChain ? (
            <SuiButton
              inputValue={inputValue}
              getIds={getIds()}
              inputJetton={inputJetton}
              outputJetton={outputJetton}
              quoteCode={quoteCode}
              swapERC20={swapERC20}
              setTransactonSuccess={setTransactonSuccess}
              setHash={setHash}
              currentTokenBalance={inputJetton?.balance as string}
              connect={() => {
                setIsSwitch(true);
              }}
              currentChainInfo={currentChainInfo}
            />
          ) : (
            <ConnectWallet
              isSwitch={isSwitch}
              setIsSwitch={setIsSwitch}
              chainId={currentChainInfo?.chainId as number}
              setChainNumber={setChainNumber}
            />
          )}
        </>
      )}
      <CheckNetwork setChainNumber={setChainNumber} chainNumber={chainNumber} />
    </DivSwapPanel>
  );
});
export default SwapWarp;
