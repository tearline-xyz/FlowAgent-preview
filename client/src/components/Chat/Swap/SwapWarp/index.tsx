import { useEffect, useState } from 'react';
import { axiosSupportedChain, axiosLiquidity, getTokenDetail, axiosAggregatorQuote } from '~/swap/serve';
import { LiquidityInterface, AllChainData } from '~/swap/interface';
// import { logoList } from '~/swap/const/contract';
import { IServerJetton } from '~/swap/interface';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import useSwapStation from '~/swap/hooks/useSwapStation';
import { ChatTransaction } from '~/swap/interface';
import { shiftedBy } from '~/swap/hooks/useOkxSwap';
import { getChainInfo } from '~/swap/const/contract';
import ConnectWallet from '~/components/Chat/Swap/ConnectWalet';
import CheckNetwork from '~/components/Chat/Swap/CheckNetwork';
import EvmButton from '~/components/Chat/Swap/EvmButton';
import SolButton from '~/components/Chat/Swap/SolButton';
import { EtherInitApi } from '~/swap/const/erher-api';
import { SolApi } from '~/swap/const/sol-api';
import { useInterval } from '~/swap/hooks/useInterval';
import { DefaultTokenAddr } from '~/swap/const/contract';

export const transferData = {
  'acton': 'okx_swap_v1',
  'data': [
    {
      'from_coin': '11111111111111111111111111111111',
      'from_decimal': 18,
      'from_symbol': 'SOL',
      'to_coin': 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
      // 'to_coin': 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      'to_decimal': 18,
      'to_symbol': 'PYTH',
      'from_amount': '0.01',
      'to_amount': '0',
      'chain_name': 'SOL',
      'chain_id': 501,
    },
    {
      'from_coin': '0xdac17f958d2ee523a2206206994597c13d831ec7',
      'from_decimal': 6,
      'from_symbol': 'USDT',
      'to_coin': '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
      'to_decimal': 18,
      'to_symbol': 'BNB',
      'from_amount': '1000.0',
      'to_amount': '0',
      'chain_name': 'Ethereum',
      'chain_id': 1,
    },
  ],
};

interface ISwapWarp {
  data: {
    action: string;
    data: ChatTransaction[]
  }
}

export default function SwapWarp({ data }: ISwapWarp) {
  console.log('SwapWarp', data);
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
    walletProvider,
    chainId,
    connection,
    walletProviderSol
    // openModal
  } = useCustomWeb3Modal();
  const {
    toTradeAmount,
    swapTokenInfo,
    approve,
    swapERC20,
    quoteCode,
    reloadSwap,
  } = useSwapStation({
    inputJetton,
    outputJetton,
    inputAmount: inputValue,
    currentChain: currentChainInfo,
    userAddress: address,
    slippage,
  });
  console.log('toTradeAmount', toTradeAmount);


  useEffect(() => {
    getTokenBalance();
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
          const currChain: AllChainData[] = chainAllData.filter((i: AllChainData) => i.chainId === transactionParams.chain_id);
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
    return () => {
    };
  }, []);
  useInterval(() => {
    getTokenBalance();
  }, 2000);

  const isMainChain = (tokenAddr: string) => Object.values(DefaultTokenAddr).some(i => i.toLocaleLowerCase() === tokenAddr.toLocaleLowerCase());
  
  const getTokenBalance = async () => {
    if (!isConnected || !address) return;

    // Common function to update jetton balance
    const updateJettonBalance = async (
      jetton: typeof inputJetton | typeof outputJetton,
      setJetton: typeof setInputJetton | typeof setOutputJetton,
      isInput: boolean
    ) => {
      if (!jetton?.tokenContractAddress) return;

      let balance = '0';

      if (evmChain) {
        const sdk = new EtherInitApi(address, walletProvider, chainId);
        balance = isMainChain(jetton.tokenContractAddress)
          ? await sdk.getBalance(address)
          : await sdk.tokenBalance(jetton.tokenContractAddress, address);
      }
      else if (solChain) {
        const sdkSol = new SolApi(address, connection, walletProviderSol);
        if (isMainChain(jetton.tokenContractAddress)) {
          balance = await sdkSol.getBalance();
        } else {
          const tokenAccount = await sdkSol.getTokenAccount(jetton.tokenContractAddress);
          balance = await sdkSol.getTokenBalance(tokenAccount);
        }
      }

      setJetton(prev => prev ? { ...prev, balance } : null);
    };

    // Process both input and output jettons in parallel
    await Promise.all([
      updateJettonBalance(inputJetton, setInputJetton, true),
      updateJettonBalance(outputJetton, setOutputJetton, false)
    ]);
  };
  const getIds = () => {
    let ids = '';
    let arr: any = liquidityList.filter((d: LiquidityInterface) => d.checked);
    if (arr.length) {
      ids = arr.map(item => item.id).join(',');
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
    return () => {
    };
  }, [currentChainInfo?.chainId]);


  const initParams = async (dataChat: ChatTransaction) => {
    let transactionParams = dataChat;
    const inputJetton_ = transactionParams?.from_coin;
    const outputJetton_ = transactionParams?.to_coin;
    const inputChain_ = transactionParams?.chain_id;
    if (inputJetton_) {
      getTokenDetail({
        chain_index: inputChain_,
        token_address: inputJetton_,
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
        let toAmount = shiftedBy(toTokenAmount, Number(toToken?.decimal), -1);
        setInputValue(toAmount);
      }
    }
  };


  return (
    <div>
      <div className='flex'>Swap Chain Logo <img className='w-10 h-10' src={currentChainInfo?.imgUrl} alt='' /></div>
      <div className='flex'>Form Token Logo <img className='w-10 h-10' src={inputJetton?.tokenLogoUrl} alt='' /></div>
      <div className='flex'>Form token {inputJetton?.tokenSymbol}</div>
      <div className='flex'>Form balance {inputJetton?.balance}</div>
      <div className='flex'>Form Amount {inputValue}</div>


      <div className='flex'>To Token Logo <img className='w-10 h-10' src={outputJetton?.tokenLogoUrl} alt='' /></div>
      <div className='flex'>To Token {outputJetton?.tokenSymbol}</div>
      <div className='flex'>To Balance {outputJetton?.balance}</div>
      <div className='flex'>To Amount {toTradeAmount}</div>
      <div className='flex'>Swap Slippage {slippage}%</div>
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
    </div>
  );
}
