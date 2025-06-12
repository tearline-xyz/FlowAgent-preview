import React, { useEffect, useState } from 'react';
import { ChatDeposit, IServerJetton, LiquidityInterface } from '~/swap/interface';
import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import { useWallet } from '@suiet/wallet-kit';
import { initCetusSDK, Pool, ClmmPoolUtil, TickMath } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { DivExChangeBox, DivSwapPanel, DivSwapPanelBox } from './useDepositWrapStyle';
import CurrentChainBox from '../../Swap/CurrentChainBox';
import DepositPanelInputBox from '../depositPanalInput/depositPanalInput';
import { getImageUrl } from '~/swap/util/image-url';
import Button from '~/components/Mui/Button';
import { axiosAggregatorQuote, axiosLiquidity, getTokenDetail } from '~/swap/serve';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import ConnectWallet from '../../Swap/ConnectWalet';
import CheckNetwork from '../../Swap/CheckNetwork';
import { useToastContext } from '~/Providers';
import SelectRange from '../select-range/select-range';

function tickToPrice(
  tick: number,
  feeTier: number,
  decimalA: number,
  decimalB: number,
): [number, number] {
  const feePercent = feeTier / 1_000_000;
  const priceBtoA = Math.pow(1.0001, tick);
  const adjPriceBtoA = priceBtoA * Math.pow(10, decimalA - decimalB);
  let effAdjPriceBtoA = adjPriceBtoA * (1 - feePercent);
  let effAdjPriceAtoB = 1 / effAdjPriceBtoA;
  // Swap the values
  [effAdjPriceAtoB, effAdjPriceBtoA] = [effAdjPriceBtoA, effAdjPriceAtoB];
  return [effAdjPriceAtoB, effAdjPriceBtoA];
}

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
  const [inputValue, setInputValue] = useState(d.amount_a?.toString() ?? 0);
  const [outputValue, setOutputValue] = useState(d.amount_b?.toString() ?? 0);
  const [lowerTick, setLowerTick] = useState(d.tick_lower);
  const [upperTick, setUpperTick] = useState(d.tick_upper);
  const { showToast, onOpenChange } = useToastContext();
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [pool, setPool] = useState<Pool | null>(null);
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const [chainNumber, setChainNumber] = useState<number>(-1);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  // const [liquidityList, setLiquidityList] = useState<LiquidityInterface[]>([]);
  const { isConnected, suiWallet, getTokenBalance, suiChain, disconnectConnect, chainId } =
    useCustomWeb3Modal();

  const slippage = 0.05;

  const currentChainInfo = {
    chainId: 784,
    chainName: 'Sui',
    // dexTokenApproveAddress: '',
  };

  const initPool = async () => {
    const pool = await sdk.Pool.getPool(data.data.pool_address);
    setPool(() => pool);
    console.log('pool', pool);
    return pool;
  };
  const initJettonInfo = async (poolData?: Pool) => {
    const _inputJetton = {} as IServerJetton;
    const _outputJetton = {} as IServerJetton;
    const _pool = poolData ?? pool;

    //init token info
    const inputAddress = _pool?.coinTypeA ?? '';
    const outputAddress = _pool?.coinTypeB ?? '';

    const outputDetail = await getTokenDetail({
      chain_index: 784,
      token_address: outputAddress ?? '',
    });
    if (outputDetail.data.length) {
      _outputJetton.tokenContractAddress = outputAddress ?? '';
      _outputJetton.decimals = outputDetail.data[0].decimals.toString();
      _outputJetton.tokenName = outputDetail.data[0].name;
      _outputJetton.tokenSymbol = outputDetail.data[0].symbol;
      _outputJetton.tokenLogoUrl = outputDetail.data[0].logoUrl;
    }
    const inputDetail = await getTokenDetail({
      chain_index: 784,
      token_address: inputAddress ?? '',
    });
    if (inputDetail.data.length) {
      console.log('inputDetail', inputDetail);

      _inputJetton.tokenContractAddress = inputAddress ?? '';
      _inputJetton.decimals = inputDetail.data[0].decimals.toString();
      _inputJetton.tokenName = inputDetail.data[0].name;
      _inputJetton.tokenSymbol = inputDetail.data[0].symbol;
      _inputJetton.tokenLogoUrl = inputDetail.data[0].logoUrl;
    }

    const fromTokenRes: any = await axiosAggregatorQuote({
      chain_id: 784,
      amount: 10 ** Number(_inputJetton.decimals),
      from_token_address: inputAddress,
      to_token_address:
        '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
    });

    const toTokenRes: any = await axiosAggregatorQuote({
      chain_id: 784,
      amount: 10 ** Number(_outputJetton.decimals),
      from_token_address: outputAddress,
      to_token_address:
        '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
    });

    _inputJetton.tokenPrice = fromTokenRes.data[0]?.fromToken.tokenUnitPrice;
    _outputJetton.tokenPrice = toTokenRes.data[0]?.fromToken.tokenUnitPrice;
    const _inputDecimals = _inputJetton.decimals ? Number(_inputJetton.decimals) : 6;
    const _outputDecimals = _outputJetton.decimals ? Number(_outputJetton.decimals) : 6;
    // init token balance
    const inputBalance = await getTokenBalance(inputAddress, _inputDecimals);

    const outputBalance = await getTokenBalance(outputAddress, _outputDecimals);

    _inputJetton.balance = inputBalance;
    _outputJetton.balance = outputBalance;

    setInputJetton(_inputJetton);
    setOutputJetton(_outputJetton);
  };

  const initData = async () => {
    const poolData = await initPool();
    await initJettonInfo(poolData);
  };

  useEffect(() => {
    initData();
    const timerId = setInterval(() => {
      initPool();
    }, 5000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    console.log('yyyyyyuuu');

    if (pool) {
      initJettonInfo();
    }
  }, [isConnected, suiWallet, suiChain, pool?.coinTypeA, pool?.coinTypeB]);

  const fromAmountAToAmountB = async (newVal) => {
    const liquidityInput = ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
      lowerTick,
      upperTick,
      new BN(Number(newVal) * Math.pow(10, Number(inputJetton?.decimals ?? '6'))),
      true,
      true,
      slippage,
      new BN(pool?.current_sqrt_price ?? 0),
    );

    const amount_b = liquidityInput.tokenMaxB.toNumber();

    setOutputValue((amount_b / 10 ** Number(outputJetton?.decimals ?? '6')).toString());
  };

  const fromAmountBToAmountA = async (newVal) => {
    const liquidityInput = ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
      lowerTick,
      upperTick,
      new BN(Number(newVal) * Math.pow(10, Number(outputJetton?.decimals ?? '6'))),
      false,
      true,
      slippage,
      new BN(pool?.current_sqrt_price ?? 0),
    );

    const amount_a = liquidityInput.tokenMaxA.toNumber();

    setInputValue((amount_a / 10 ** Number(inputJetton?.decimals ?? '6')).toString());
  };

  const extractPositionInfo = async (txnData) => {
    if (!txnData) return null;

    try {
      const positionInfo = {
        positionId: '',
        poolId: '',
        tickLower: '',
        tickUpper: '',
        timestamp: txnData.timestampMs || null,
      };

      const objectChanges = txnData.objectChanges || [];
      const positionObject = objectChanges.find(
        (change) =>
          change.type === 'created' &&
          change.objectType &&
          change.objectType.includes('position::Position') &&
          change.owner &&
          change.owner.AddressOwner === suiWallet.address,
      );

      if (positionObject) {
        positionInfo.positionId = positionObject.objectId as string;
      }

      if (txnData.events && txnData.events.length > 0) {
        const positionEvent = txnData.events.find(
          (event) => event.type && event.type.includes('OpenPositionEvent') && event.parsedJson,
        );

        if (positionEvent && positionEvent.parsedJson) {
          positionInfo.positionId = positionInfo.positionId || positionEvent.parsedJson.position;
          positionInfo.poolId = positionEvent.parsedJson.pool;

          if (positionEvent.parsedJson.tick_lower) {
            positionInfo.tickLower = positionEvent.parsedJson.tick_lower.bits;
          }

          if (positionEvent.parsedJson.tick_upper) {
            positionInfo.tickUpper = positionEvent.parsedJson.tick_upper.bits;
          }
        }
      }

      return positionInfo;
    } catch (error) {
      return null;
    }
  };

  const verifyTransaction = async (txResponse) => {
    if (!txResponse || !txResponse.digest) {
      return null;
    }

    const maxRetries = 2;
    const delays = [1000, 3000];
    let attempt = 0;
    let lastError: any = null;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (attempt <= maxRetries) {
      try {
        const txnData = await sdk.fullClient.getTransactionBlock({
          digest: txResponse.digest,
          options: {
            showEffects: true,
            showInput: true,
            showEvents: true,
            showObjectChanges: true,
          },
        });

        if (txnData.effects?.status?.status !== 'success') {
          lastError = new Error(`status: ${txnData.effects?.status?.status || 'unknown'}`);
          throw lastError;
        }

        const positionInfo = await extractPositionInfo(txnData);

        if (positionInfo && positionInfo.positionId) {
          return positionInfo;
        }

        return true;
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries) {
          await sleep(delays[attempt]);
        } else {
          showToast({
            message: 'The opening transaction failed',
            status: 'error',
          });
          setIsTransacting(false);
        }
      }

      attempt++;
    }
    return null;
  };

  const generateTransaction = async () => {
    if (!suiChain) return;
    setIsTransacting(true);
    const openPositionTransactionPayload = sdk.Position.openPositionTransactionPayload({
      coinTypeA: pool?.coinTypeA ?? '',
      coinTypeB: pool?.coinTypeB ?? '',
      tick_lower: lowerTick.toString(),
      tick_upper: upperTick.toString(),
      pool_id: d.pool_address,
    });
    openPositionTransactionPayload.setGasBudget(100000000);
    try {
      const resData = await suiWallet.signAndExecuteTransaction({
        transaction: openPositionTransactionPayload,
      });
      const positionInfo = await verifyTransaction(resData);
      if (positionInfo?.positionId) {
        const position = await sdk.Position.getPositionById(positionInfo?.positionId);
        if (!position) {
          setIsTransacting(false);
          showToast({
            message: 'Position details cannot be obtained',
            status: 'error',
          });
          setIsTransacting(false);
          throw new Error('Position details cannot be obtained.');
        }
        const freshPool = await sdk.Pool.getPool(d.pool_address);

        const positionDetails = await sdk.Position.getPositionById(positionInfo?.positionId);

        if (!positionDetails) {
          throw new Error('Position details cannot be obtained.');
        }

        const currentTickIndex = new BN(freshPool.current_tick_index).toNumber();
        const tickLower = positionDetails.tick_lower_index;
        const tickUpper = positionDetails.tick_upper_index;
        const curSqrtPrice = new BN(freshPool.current_sqrt_price);

        const coinAmount = new BN(
          Number(inputValue) * Math.pow(10, Number(inputJetton?.decimals ?? '6')),
        );
        console.log('here is coinAmount', coinAmount, coinAmount.toString());

        const fix_amount_a = true;

        const liquidityInput = await ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
          tickLower,
          tickUpper,
          coinAmount,
          fix_amount_a,
          true,
          slippage,
          curSqrtPrice,
        );

        const updatedParams = {
          coinTypeA: freshPool.coinTypeA,
          coinTypeB: freshPool.coinTypeB,
          pool_id: freshPool.poolAddress,
          tick_lower: tickLower.toString(),
          tick_upper: tickUpper.toString(),
          fix_amount_a: true,
          amount_a: Number(inputValue) * Math.pow(10, Number(inputJetton?.decimals ?? '6')),
          amount_b: liquidityInput.tokenMaxB.toNumber(),
          slippage,
          is_open: false,
          pos_id: positionInfo!.positionId,
          rewarder_coin_types: [],
          collect_fee: true,
        };
        sdk.senderAddress = suiWallet.address ?? '';
        const payload = await sdk.Position.createAddLiquidityFixTokenPayload(updatedParams, {
          slippage,
          curSqrtPrice,
        });
        payload.setGasBudget(100000000);

        try {
          const resData = await suiWallet.signAndExecuteTransaction({
            transaction: payload,
          });

          const isSuccess = await verifyTransaction(resData);

          if (isSuccess) {
            showToast({
              status: 'success',
              message: 'The liquidity addition was successful.',
            });
            setIsTransacting(false);
          } else {
            setIsTransacting(false);
            showToast({
              status: 'error',
              message: 'Failure of liquidity addition',
            });
          }
        } catch (walletError) {
          console.error('The wallet transaction was executed incorrectly:', walletError);
        }
      } else {
        showToast({
          status: 'error',
          message: 'open position transaction failed',
        });
        setIsTransacting(false);
      }
    } catch (error) {
      console.log('error: ', error);
      showToast({
        status: 'error',
        message: 'open position transaction failed',
      });
      setIsTransacting(false);
    }
  };

  const onExchangeInOut = async () => {
    const temp = JSON.parse(JSON.stringify(inputJetton));

    setInputJetton(outputJetton);
    setOutputJetton(temp);
  };

  const buttonClick = async () => {
    if (!suiChain) {
      await disconnectConnect();
      setIsSwitch(true);
      return;
    }
    generateTransaction();
  };

  return (
    <div className="flex items-start gap-3">
      <SelectRange
        lowerTick={lowerTick}
        upperTick={upperTick}
        poolAddress={d.pool_address}
        setLowerTick={setLowerTick}
        setUpperTcik={setUpperTick}
        // onRangeChanged={(lower, upper) => {
        //   if (pool) {
        //     if (lower > pool.current_tick_index || upper < pool.current_tick_index) {
        //       showToast({
        //         status: 'error',
        //         message: 'The current price is not in the range',
        //       });
        //       setButtonDisabled(true);
        //       return;
        //     } else {
        //       setButtonDisabled(false);
        //     }
        //   }
        // }}
      />

      <DivSwapPanel className="space-y-6">
        <CurrentChainBox
          currentChainInfo={{
            chainId: 784,
            chainName: 'Sui',
            imgUrl: 'https://web3.okx.com/cdn/wallet/logo/sui_17700.png',
            symbol: 'SUI',
            // dexTokenApproveAddress: '',
          }}
        />
        <div>
          <DivSwapPanelBox className="">
            <DepositPanelInputBox
              type="input"
              showMax={true}
              jettonData={inputJetton}
              inputValue={inputValue}
              disabled={false}
              onChangeValue={(val) => {
                setInputValue(val);
                fromAmountAToAmountB(val);
              }}
            />
            <DivExChangeBox onClick={onExchangeInOut}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </DivExChangeBox>
          </DivSwapPanelBox>
          <DivSwapPanelBox>
            <DepositPanelInputBox
              type="input"
              showMax={false}
              inputValue={outputValue}
              jettonData={outputJetton}
              disabled={false}
              onChangeValue={(val) => {
                setOutputValue(val);
                fromAmountBToAmountA(val);
              }}
            />
          </DivSwapPanelBox>
        </div>
        {!isConnected ? (
          <ConnectWallet
            isSwitch={isSwitch}
            setIsSwitch={setIsSwitch}
            chainId={784}
            setChainNumber={setChainNumber}
          />
        ) : (
          <Button
            className={'swapButton mt-10'}
            onClick={buttonClick}
            loading={isTransacting}
            disabled={
              !suiChain
                ? false
                : buttonDisabled ||
                  Number(inputJetton?.balance) < Number(inputValue) ||
                  Number(outputJetton?.balance) < Number(outputValue) ||
                  Number(inputValue) <= 0 ||
                  inputValue === ''
            }
          >
            {!suiChain
              ? 'Switch Network'
              : Number(inputValue) <= 0 || inputValue === ''
                ? 'Enter amount'
                : Number(inputJetton?.balance) < Number(inputValue)
                  ? `Insufficient ${inputJetton?.tokenSymbol} balance`
                  : Number(outputJetton?.balance) < Number(outputValue)
                    ? `Insufficient ${outputJetton?.tokenSymbol} balance`
                    : 'Deposit'}
          </Button>
        )}
        <CheckNetwork setChainNumber={setChainNumber} chainNumber={chainNumber} />
      </DivSwapPanel>
    </div>
  );
};

export default DepositWrap;
