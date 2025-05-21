import React, { useEffect, useState } from 'react';
import { ChatDeposit, IServerJetton, LiquidityInterface } from '~/swap/interface';
import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import { useWallet } from '@suiet/wallet-kit';
import { initCetusSDK, Pool, ClmmPoolUtil, TickMath } from '@cetusprotocol/cetus-sui-clmm-sdk';
import { DivExChangeBox, DivSwapPanel, DivSwapPanelBox } from './useDepositWrapStyle';
import CurrentChainBox from '../../Swap/CurrentChainBox';
import DepositPanelInputBox from '../depositOanalInput/depositPanalInput';
import { getImageUrl } from '~/swap/util/image-url';
import Button from '~/components/Mui/Button';
import { axiosAggregatorQuote, axiosLiquidity, getTokenDetail } from '~/swap/serve';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import ConnectWallet from '../../Swap/ConnectWalet';
import CheckNetwork from '../../Swap/CheckNetwork';
import { ChainIdEnum } from '~/swap/enum';
import { useToastContext } from '~/Providers';
import { info } from 'console';
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
  console.log('inputPoolAddress', d.pool_address);

  const sdk = initCetusSDK({ network: 'mainnet' });

  const [inputJetton, setInputJetton] = useState<IServerJetton | null>(null);
  const [outputJetton, setOutputJetton] = useState<IServerJetton | null>(null);
  const [inputValue, setInputValue] = useState(d.amount_a?.toString() ?? 0);
  const [outputValue, setOutputValue] = useState(d.amount_b?.toString() ?? 0);
  const [lowerTick, setLowerTick] = useState(d.tick_lower);
  const [upperTick, setUpperTick] = useState(d.tick_upper);
  const { showToast } = useToastContext();
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [pool, setPool] = useState<Pool | null>(null);
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const [chainNumber, setChainNumber] = useState<number>(-1);
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
    const _inputDecimals = _inputJetton.decimals
      ? Number(_inputJetton.decimals)
      : inputJetton?.decimals
        ? Number(inputJetton?.decimals)
        : 6;
    const _outputDecimals = _outputJetton.decimals
      ? Number(_outputJetton.decimals)
      : outputJetton?.decimals
        ? Number(outputJetton?.decimals)
        : 6;
    // init token balance
    const inputBalance = await getTokenBalance(inputAddress, _inputDecimals);
    console.log('inputBalance', inputBalance);

    const outputBalance = await getTokenBalance(outputAddress, _outputDecimals);

    _inputJetton.balance = inputBalance;
    _outputJetton.balance = outputBalance;
    console.log('_inputJetton', _inputJetton);
    console.log('_outputJetton', _outputJetton);

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
    if (pool) {
      initJettonInfo();
    }
  }, [isConnected, suiWallet]);

  const [upperEffAdjPriceAtoB] = tickToPrice(
    upperTick,
    Number(pool?.tickSpacing),
    Number(inputJetton?.decimals),
    Number(outputJetton?.decimals),
  );
  console.log('upperEffAdjPriceAtoB', upperEffAdjPriceAtoB);

  const [lowerEffAdjPriceAtoB] = tickToPrice(
    lowerTick,
    Number(pool?.tickSpacing),
    Number(inputJetton?.decimals),
    // open_position  add_
    Number(outputJetton?.decimals),
  );
  console.log('lowerEffAdjPriceAtoB', lowerEffAdjPriceAtoB);

  const fromAmountAToAmountB = async (newVal) => {
    console.log('amountAToB lowerTick', lowerTick);
    console.log('amountAToB upperTick', upperTick);
    const liquidityInput = ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
      lowerTick,
      upperTick,
      new BN(Number(newVal) * Math.pow(10, Number(inputJetton?.decimals ?? '6'))),
      true,
      true,
      slippage,
      new BN(pool?.current_sqrt_price ?? 0),
    );

    console.log('liquidityInput', liquidityInput);
    const amount_b = liquidityInput.tokenMaxB.toNumber();
    console.log('amount_b', amount_b);
    setOutputValue((amount_b / 10 ** Number(outputJetton?.decimals ?? '6')).toString());
  };

  const fromAmountBToAmountA = async (newVal) => {
    console.log('amountBToA lowerTick', lowerTick);
    console.log('amountBToA upperTick', upperTick);
    const liquidityInput = ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
      lowerTick,
      upperTick,
      new BN(Number(newVal) * Math.pow(10, Number(outputJetton?.decimals ?? '6'))),
      false,
      true,
      slippage,
      new BN(pool?.current_sqrt_price ?? 0),
    );

    console.log('liquidityInput', liquidityInput);
    const amount_a = liquidityInput.tokenMaxA.toNumber();
    console.log('amount_a', amount_a);
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

      // 从objectChanges中查找Position对象
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

      // 从events中获取更多详细信息
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
      console.log('提取的头寸信息:', positionInfo);
      return positionInfo;
    } catch (error) {
      console.error('提取头寸信息时出错:', error);
      return null;
    }
  };

  // 验证交易是否成功
  const verifyTransaction = async (txResponse) => {
    if (!txResponse || !txResponse.digest) {
      console.error('交易响应无效');
      return null;
    }

    // 定义重试次数和延迟
    const maxRetries = 2; // 总共尝试3次（初始尝试 + 2次重试）
    const delays = [1000, 3000]; // 重试延迟时间：1秒和3秒
    let attempt = 0;
    let lastError: any = null;

    // 定义睡眠函数
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // 执行带有重试逻辑的验证
    while (attempt <= maxRetries) {
      try {
        console.log(`尝试验证交易 (第${attempt + 1}/${maxRetries + 1}次)`);

        // 获取完整的交易数据，包括对象变更
        const txnData = await sdk.fullClient.getTransactionBlock({
          digest: txResponse.digest,
          options: {
            showEffects: true,
            showInput: true,
            showEvents: true,
            showObjectChanges: true,
          },
        });

        console.log(`第${attempt + 1}次尝试 - 获取到交易详情:`, txnData);

        // 检查交易状态
        if (txnData.effects?.status?.status !== 'success') {
          console.error(`第${attempt + 1}次尝试 - 交易失败:`, txnData.effects?.status);
          lastError = new Error(`交易执行状态: ${txnData.effects?.status?.status || '未知'}`);
          throw lastError;
        }

        // 提取头寸信息
        const positionInfo = await extractPositionInfo(txnData);

        if (positionInfo && positionInfo.positionId) {
          console.log(`第${attempt + 1}次尝试 - 成功提取头寸信息:`, positionInfo);
          return positionInfo;
        }

        // 如果交易成功但没找到Position对象，依然返回成功
        console.log(`第${attempt + 1}次尝试 - 交易成功，但未找到明确的Position对象。`);
        return true;
      } catch (error) {
        lastError = error;
        console.error(`第${attempt + 1}次尝试验证交易失败:`, error);

        if (attempt < maxRetries) {
          // 还有重试机会，等待后重试
          console.log(`将在${delays[attempt] / 1000}秒后进行第${attempt + 2}次尝试`);
          await sleep(delays[attempt]);
        } else {
          // 已达到最大重试次数
          console.error(`已尝试${maxRetries + 1}次，验证交易最终失败:`, error);
          showToast({
            message: 'The opening transaction failed',
            status: 'error',
          });
          setIsTransacting(false);
        }
      }

      attempt++;
    }
    // 如果所有尝试都失败，返回失败
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
    console.log('openPositionTransactionPayload: ', openPositionTransactionPayload);
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
          throw new Error('无法获取头寸详情');
        }
        const freshPool = await sdk.Pool.getPool(d.pool_address);
        console.log('最新池子信息:', freshPool);

        // 获取头寸详情，以确认tick范围
        const positionDetails = await sdk.Position.getPositionById(positionInfo?.positionId);
        console.log('头寸详情:', positionDetails);

        if (!positionDetails) {
          throw new Error('无法获取头寸详情，请确认头寸ID是否正确');
        }

        // 获取当前的tick索引和流动性
        const currentTickIndex = new BN(freshPool.current_tick_index).toNumber();
        const tickLower = positionDetails.tick_lower_index;
        const tickUpper = positionDetails.tick_upper_index;
        const curSqrtPrice = new BN(freshPool.current_sqrt_price);

        console.log('当前价格信息:', {
          currentTickIndex,
          tickLower,
          tickUpper,
          inRange: tickLower <= currentTickIndex && currentTickIndex <= tickUpper,
        });

        console.log('here is inputValue', inputValue);

        // 使用ClmmPoolUtil计算合适的流动性和币种数量
        const coinAmount = new BN(
          Number(inputValue) * Math.pow(10, Number(inputJetton?.decimals ?? '6')),
        );
        console.log('here is coinAmount', coinAmount, coinAmount.toString());

        const fix_amount_a = true; // 固定币种A的数量

        // 计算流动性和代币数量
        console.log('计算流动性和代币数量...');
        const liquidityInput = await ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
          tickLower,
          tickUpper,
          coinAmount,
          fix_amount_a,
          true,
          slippage,
          curSqrtPrice,
        );

        console.log('流动性计算结果:', liquidityInput);

        // 准备新的流动性参数
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
        console.log('sdk.senderAddress', sdk.senderAddress);

        console.log('更新后的流动性参数:', updatedParams);
        const payload = await sdk.Position.createAddLiquidityFixTokenPayload(updatedParams, {
          slippage,
          curSqrtPrice,
        });
        payload.setGasBudget(100000000); // 增加gasBudget

        console.log('添加流动性交易载荷:', payload);
        try {
          const resData = await suiWallet.signAndExecuteTransaction({
            transaction: payload,
          });

          console.log('添加流动性交易响应:', resData);

          // 使用相同的验证逻辑验证交易
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
          // 捕获钱包特定的错误
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
    // setInputValue('')
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
    <div className="flex items-center gap-3">
      <SelectRange
        lowerTick={lowerTick}
        upperTick={upperTick}
        poolAddress={d.pool_address}
        setLowerTick={setLowerTick}
        setUpperTcik={setUpperTick}
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
              <img src={getImageUrl('swap/exchange.png')} alt="" />
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
                : Number(inputJetton?.balance) < Number(inputValue) ||
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
                  : Number(outputJetton?.balance) < Number(inputValue)
                    ? `Insufficient ${outputJetton?.tokenSymbol} balance`
                    : 'Deposit'}
          </Button>
        )}
        <CheckNetwork setChainNumber={setChainNumber} chainNumber={chainNumber} />
      </DivSwapPanel>
    </div>

    // <div>aa</div>
  );
};

export default DepositWrap;
