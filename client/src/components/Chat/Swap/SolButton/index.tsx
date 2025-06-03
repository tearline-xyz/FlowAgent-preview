import { DisabledSwap, ErrorSwapOKXCode } from '~/swap/const/error-code';
import Button from '~/components/Mui/Button';
import { AllChainData, IServerJetton } from '~/swap/interface';
// import { EtherInitApi } from '~/swap/const/erher-api';

import React, { useState } from 'react';

import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import { ChainSwitch } from '~/components/Account/WagmiGlobal/config';
import { ErrorCodeEnum } from '~/enum/error-code.enum';

import {
  // SystemProgram,
  // PublicKey,
  // Keypair,
  Transaction,
  // TransactionInstruction,
  LAMPORTS_PER_SOL,
  VersionedTransaction,
} from '@solana/web3.js';

import bs58 from 'bs58';

import { useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';

// import {delay} from "@src/utils/util";

interface ISolButton {
  inputValue: string;
  inputJetton: IServerJetton | null;
  outputJetton: IServerJetton | null;
  getIds: string;
  quoteCode: number;
  swapERC20: (ids: string, cb: Function) => void;
  setTransactonSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setHash: React.Dispatch<React.SetStateAction<string>>;
  currentTokenBalance: string;
  connect: () => void;
  currentChainInfo: AllChainData | null;
}

export default function SolButton({
  inputJetton,
  outputJetton,
  inputValue,
  getIds,
  quoteCode,
  swapERC20,

  setTransactonSuccess,
  setHash,
  currentTokenBalance,
  connect,
  currentChainInfo,
}: ISolButton) {
  const [isTransacting, setIsTransacting] = useState<boolean>(false); // sol
  const {
    isConnected,
    address,
    chainId,
    checkSwitchNetwork,
    // openModal,
    disconnectConnect,
  } = useCustomWeb3Modal();
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>('solana');
  // console.log('chainId,currChainId', chainId,Number(swapStore.currentChainInfo.chainId));
  const solSwap = async () => {
    let currChainId = Number(currentChainInfo?.chainId);
    if (Number(chainId) !== currChainId) {
      if (currChainId && ChainSwitch && ChainSwitch[currChainId]) {
        //
        if (currChainId !== 501) {
          // checkSwitchNetwork(ChainSwitch[currChainId])
          disconnectConnect();
          connect();
        } else {
          checkSwitchNetwork(ChainSwitch[currChainId]);
        }
      }
      return;
    }
    if (!isConnected || !address || !inputJetton || !outputJetton || !connection) {
      return;
    }
    try {
      setIsTransacting(true);
      // console.log('isTransacting', isTransacting);
      const balance = await (connection as any).getBalance(walletProvider.publicKey as any);
      console.log('balance', balance);
      const estimatedFee = 0.01 * LAMPORTS_PER_SOL;
      if (balance < Number(inputValue) + estimatedFee) {
        // return;
      }

      // setLoading(true)
      // const response = await getSwap(params);
      // const response = await axiosSwap(params);

      swapERC20(getIds, async (response: any) => {
        // console.log('Full API Response:', response);
        // setLoading(false)
        if (!response?.data?.[0]?.tx) {
          setIsTransacting(false);
          // setLoading(false)
          throw new Error('Invalid swap data');
        }

        const txData = response.data[0].tx;
        console.log('Raw transaction data:', txData);

        try {
          // signAndSendTransaction
          // setLoading(true)
          // let key:any=walletProvider?.publicKey.toBase58()
          const signature: any = await signAndSendTransaction(
            txData.data,
            walletProvider?.publicKey as any,
          );
          setHash(signature);
          // setLoading(false)
          // getChainAssetsInit(-1, () => {
          // });

          console.log('Transaction successful:', signature);
          console.log(`View on Solscan: https://solscan.io/tx/${signature}`);
          setTransactonSuccess(true);

          return signature;
        } catch (error: unknown) {
          // setLoading(false)
          console.error('Transaction failed:', error);
          if (error instanceof Error) {
            console.error('Error details:', {
              message: error.message,
              stack: error.stack,
              name: error.name,
            });
            throw error;
          }
          throw new Error('Unknown error occurred');
        }
      });
    } catch (error: unknown) {
      console.error('Swap failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Swap failed: ${errorMessage}`);
    } finally {
      setIsTransacting(false);
    }
  };

  const signAndSendTransaction = async (callData: string, walletAddress: string) => {
    try {

      const decodedTx = bs58.decode(callData);

      let tx;

      try {
        tx = VersionedTransaction.deserialize(decodedTx);
        // console.log('Parsed as VersionedTransaction');
      } catch (error) {
        // console.log('Trying legacy Transaction format');
        tx = Transaction.from(decodedTx);
      }
      const recentBlockhash: any = (await (connection as any).getLatestBlockhash('confirmed'))
        ?.blockhash;
      if (tx instanceof VersionedTransaction) {
        tx.message.recentBlockhash = recentBlockhash;
      } else {
        tx.recentBlockhash = recentBlockhash;
        tx.feePayer = walletProvider.publicKey; // new PublicKey(walletAddress);
      }

      const signature = await walletProvider.sendTransaction(tx, connection as any, {
        skipPreflight: true,
        preflightCommitment: 'processed',
        maxRetries: 3,
      });
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };
  return (
    <Button
      className={'swapButton'}
      onClick={solSwap}
      loading={isTransacting}
      disabled={
        quoteCode === ErrorCodeEnum.NotApi
          ? true
          : Number(501) !== Number(currentChainInfo?.chainId)
            ? false
            : 501 !== Number(currentChainInfo?.chainId) ||
              DisabledSwap.some((i) => Number(i) === Number(quoteCode)) ||
              Number(currentTokenBalance) < Number(inputValue) ||
              Number(inputValue) <= 0 ||
              inputValue === ''
      }
    >
      {Number(501) !== Number(currentChainInfo?.chainId)
        ? 'Switch Network'
        : Number(inputValue) <= 0 || inputValue === ''
          ? 'Enter amount'
          : Number(currentTokenBalance) < Number(inputValue)
            ? 'Insufficient balance'
            : DisabledSwap.some((i) => Number(i) === Number(quoteCode))
              ? ErrorSwapOKXCode[quoteCode]
              : isTransacting
                ? 'Preparing Transaction'
                : 'Swap'}
    </Button>
  );
}
