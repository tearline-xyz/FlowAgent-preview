import React, { useEffect, useState } from 'react';
import { ChatDeposit, IServerJetton, LiquidityInterface } from '~/swap/interface';
import BN from 'bignumber.js';
import { useWallet } from '@suiet/wallet-kit';
import { initCetusSDK, Pool } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { DivExChangeBox, DivSwapPanel, DivSwapPanelBox } from './useDepositWrapStyle';
import CurrentChainBox from '../../Swap/CurrentChainBox';
import DepositPanelInputBox from '../depositOanalInput/depositPanalInput';
import { getImageUrl } from '~/swap/util/image-url';
import Button from '~/components/Mui/Button';
import { axiosAggregatorQuote, axiosLiquidity, getTokenDetail } from '~/swap/serve';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import ConnectWallet from '../../Swap/ConnectWalet';
import EvmButton from '../../Swap/EvmButton';
import useSwapStation from '~/swap/hooks/useSwapStation';
import SolButton from '../../Swap/SolButton';
import SuiButton from '../../Swap/SuiButton';
import CheckNetwork from '../../Swap/CheckNetwork';
import useSuiWeb3 from '~/components/Account/hooks/useSuiWeb3';

interface ISwapWarp {
  data: {
    action: string;
    data: ChatDeposit;
  };
}

const DepositWrap = ({ data }: ISwapWarp) => {
  const d = data.data;
  const sdk = initCetusSDK({ network: 'mainnet' });
  const [inputJetton, setInputJetton] = useState<IServerJetton | null>(null);
  const [outputJetton, setOutputJetton] = useState<IServerJetton | null>(null);
  const [inputValue, setInputValue] = useState(d.amount_a.toString());
  const [outputValue, setOutputValue] = useState(d.amount_b.toString());
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [pool, setPool] = useState<Pool | null>(null);
  const [chainNumber, setChainNumber] = useState<number>(-1);
  const [liquidityList, setLiquidityList] = useState<LiquidityInterface[]>([]);
  const { isConnected, suiWallet, getTokenBalance } = useCustomWeb3Modal();
  const [transactonSuccess, setTransactonSuccess] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');

  const currentChainInfo = {
    chainId: 784,
    chainName: 'Sui',
    // dexTokenApproveAddress: '',
  };

  const initJettonInfo = async () => {
    const pool = await sdk.Pool.getPool(data.data.pool_address);

    const _inputJetton = {} as IServerJetton;
    const _outputJetton = {} as IServerJetton;

    //init token info
    const inputAddress = pool.coinTypeA;
    const outputAddress = pool.coinTypeB;
    const outputDetail = await getTokenDetail({
      chain_index: 784,
      token_address: outputAddress,
    });
    if (outputDetail.data.length) {
      _outputJetton.tokenContractAddress = outputAddress;
      _outputJetton.decimals = outputDetail.data[0].decimals.toString();
      _outputJetton.tokenName = outputDetail.data[0].name;
      _outputJetton.tokenSymbol = outputDetail.data[0].symbol;
      _outputJetton.tokenLogoUrl = outputDetail.data[0].logoUrl;
    }
    const inputDetail = await getTokenDetail({
      chain_index: 784,
      token_address: inputAddress,
    });
    if (inputDetail.data.length) {
      _inputJetton.tokenContractAddress = inputAddress;
      _inputJetton.decimals = inputDetail.data[0].decimals.toString();
      _inputJetton.tokenName = inputDetail.data[0].name;
      _inputJetton.tokenSymbol = inputDetail.data[0].symbol;
      _inputJetton.tokenLogoUrl = inputDetail.data[0].logoUrl;
    }

    const fromTokenRes: any = await axiosAggregatorQuote({
      chain_id: 784,
      amount: 10 ** Number(_inputJetton['decimals']),
      from_token_address: inputAddress,
      to_token_address:
        '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
    });

    const toTokenRes: any = await axiosAggregatorQuote({
      chain_id: 784,
      amount: 10 ** Number(_outputJetton['decimals']),
      from_token_address: outputAddress,
      to_token_address:
        '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
    });

    _inputJetton['tokenPrice'] = fromTokenRes.data[0].fromToken.tokenUnitPrice;
    _outputJetton['tokenPrice'] = toTokenRes.data[0].fromToken.tokenUnitPrice;

    // init token balance
    const inputBalance = await getTokenBalance(inputAddress);
    const outputBalance = await getTokenBalance(outputAddress);
    console.log('inputBalance', inputBalance);
    console.log('outputBalance', outputBalance);

    _inputJetton.balance = inputBalance;
    _outputJetton.balance = outputBalance;
    console.log('_inputJetton', _inputJetton);
    console.log('_outputJetton', _outputJetton);

    setInputJetton(_inputJetton);
    setOutputJetton(_outputJetton);
  };

  useEffect(() => {
    initJettonInfo();
  }, [isConnected]);

  const generateTransaction = async () => {
    const openPositionTransactionPayload = sdk.Position.openPositionTransactionPayload({
      coinTypeA: d.amount_a.toString(),
      coinTypeB: d.amount_b.toString(),
      tick_lower: d.tick_lower.toString(),
      tick_upper: d.tick_upper.toString(),
      pool_id: d.pool_address,
    });
    openPositionTransactionPayload.setGasBudget(100000000);
    console.log('openPositionTransactionPayload: ', openPositionTransactionPayload);
    try {
      const resData = await suiWallet.signAndExecuteTransaction({
        transaction: openPositionTransactionPayload,
      });
      console.log(resData);
    } catch (error) {
      console.log('error: ', error);
    }

    // return openPositionTransactionPayload
  };
  // const getIds = () => {
  //   let ids = '';
  //   let arr: any = liquidityList.filter((d: LiquidityInterface) => d.checked);
  //   if (arr.length) {
  //     ids = arr.map((item) => item.id).join(',');
  //   }
  //   return ids;
  // };
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
  }, []);

  const onExchangeInOut = async () => {
    const temp = JSON.parse(JSON.stringify(inputJetton));

    setInputJetton(outputJetton);
    setOutputJetton(temp);
    // setInputValue('')
  };

  const buttonClick = async () => {};

  return (
    <DivSwapPanel>
      <CurrentChainBox
        currentChainInfo={{
          chainId: 784,
          chainName: 'Sui',
          imgUrl: 'https://web3.okx.com/cdn/wallet/logo/sui_17700.png',
          symbol: 'SUI',
          // dexTokenApproveAddress: '',
        }}
      />
      <DivSwapPanelBox>
        <DepositPanelInputBox
          type="input"
          showMax={true}
          jettonData={inputJetton}
          inputValue={inputValue}
          disabled={false}
          onChangeValue={(val) => {
            setInputValue(val);
          }}
        />
        <DivExChangeBox onClick={onExchangeInOut}>
          <img src={getImageUrl('swap/exchange.png')} alt="" />
        </DivExChangeBox>
      </DivSwapPanelBox>
      <DivSwapPanelBox>
        <DepositPanelInputBox
          type="output"
          showMax={false}
          inputValue={outputValue}
          jettonData={outputJetton}
          disabled={true}
          onChangeValue={(val) => {}}
        />
      </DivSwapPanelBox>
      {!isConnected ? (
        <ConnectWallet
          isSwitch={isSwitch}
          setIsSwitch={setIsSwitch}
          chainId={784}
          setChainNumber={setChainNumber}
        />
      ) : (
        <Button
          className={'swapButton'}
          onClick={buttonClick}
          // loading={isTransacting}
          disabled={
            Number(501) !== Number(currentChainInfo?.chainId)
              ? false
              : 501 !== Number(currentChainInfo?.chainId) ||
                Number(inputJetton?.balance) < Number(inputValue) ||
                Number(inputValue) <= 0 ||
                inputValue === ''
          }
        >
          {Number(501) !== Number(currentChainInfo?.chainId)
            ? 'Switch Network'
            : Number(inputValue) <= 0 || inputValue === ''
              ? 'Enter amount'
              : Number(inputJetton?.balance) < Number(inputValue)
                ? 'Insufficient balance'
                : ''}
        </Button>
      )}
      <CheckNetwork setChainNumber={setChainNumber} chainNumber={chainNumber} />
    </DivSwapPanel>
    // <div>aa</div>
  );
};

export default DepositWrap;
