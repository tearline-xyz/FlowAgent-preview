import React from 'react';
import { ChatDeposit } from '~/swap/interface';
import BN from 'bignumber.js';
import { useWallet } from '@suiet/wallet-kit';
import { initCetusSDK, TickMath } from '@cetusprotocol/cetus-sui-clmm-sdk';

interface ISwapWarp {
  data: {
    action: string;
    data: ChatDeposit;
  };
}

const DepositWrap = ({ data }: ISwapWarp) => {
  const d = data.data;
  const sdk = initCetusSDK({ network: 'mainnet' });
  const wallet = useWallet();
  // console.log('typeof', typeof d.amount_a);

  const generateTransaction = async () => {
    // const poolAddress = '0x6fd4915e6d8d3e2ba6d81787046eb948ae36fdfc75dad2e24f0d4aaa2417a416';
    // const pool = await sdk.Pool.getPool(poolAddress);
    // console.log('pool: ', pool);

    // build tick range
    // const lowerTick = TickMath.getPrevInitializableTickIndex(
    //   new BN(pool.current_tick_index).toNumber(),
    //   new BN(pool.tickSpacing).toNumber(),
    // );
    // const upperTick = TickMath.getNextInitializableTickIndex(
    //   new BN(pool.current_tick_index).toNumber(),
    //   new BN(pool.tickSpacing).toNumber(),
    // );
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
      const resData = await wallet.signAndExecuteTransaction({
        transaction: openPositionTransactionPayload,
      });
      console.log(resData);
    } catch (error) {
      console.log('error: ', error);
    }

    // return openPositionTransactionPayload
  };
  return (
    <div>
      <button
        onClick={() => {
          generateTransaction();
        }}
      >
        deposit
      </button>
    </div>
  );
};

export default DepositWrap;
