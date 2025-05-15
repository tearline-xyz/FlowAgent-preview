import { AllChainData, IServerJetton } from '~/swap/interface';
import React, { useState } from 'react';
import Button from '~/components/Mui/Button';
import { ErrorCodeEnum } from '~/enum/error-code.enum';
import { DisabledSwap, ErrorSwapOKXCode } from '~/swap/const/error-code';
import { ChainIdEnum } from '~/swap/enum';
import useSuiWeb3 from '~/components/Account/hooks/useSuiWeb3';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import { Transaction } from '@mysten/sui/transactions';

interface ISuiButton {
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
  currentChainInfo: AllChainData | null
}

// const MAX_RETRIES = 3;
export default function SuiButton({
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
                                  }: ISuiButton) {

  const {
    chainId,
    disconnectConnect,
    suiChain,
  } = useCustomWeb3Modal();
  const { wallet } = useSuiWeb3();
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const suiSwap = async () => {
    if (!suiChain) {
      return;
    }
    let currChainId = Number(currentChainInfo?.chainId);
    if (Number(chainId) !== currChainId) {
      if (currChainId !== ChainIdEnum.Sui) {
        await disconnectConnect();
        connect();
      }
      return;
    }
    try {
      swapERC20(getIds, async (res: any) => {
        let response=res.data[0];
        console.log('Full API Response:', response);
        // let retryCount = 0;
        // while (retryCount < MAX_RETRIES) {
          try {
            const txDigest = await executeSwap(response);
            if (txDigest) {
              setTransactonSuccess(true);
            }
            console.log('Transaction successful with digest:', txDigest);
            // break; // Exit retry loop on success
          } catch (error) {
            // retryCount++;
            // if (retryCount === MAX_RETRIES) {
            //   console.error('Max retries reached, transaction failed');
            //   setIsTransacting(false);
            //   throw error;
            // }
            // await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
          }
        // }

      });
    } catch (e) {

    }
  };

  async function executeSwap(response: any) {

    try {
      if (!response?.tx) {
        throw new Error('Invalid swap data - missing unsigned transaction');
      }

      // Parse the unsigned transaction data
      const unsignedTx: any = response.tx.data;
      const txBytes = unsignedTx;

      // Create transaction from the bytes
      const tx = Transaction.from(txBytes);

      // If you need to modify the transaction (e.g., set sender or gas parameters)
      // Note: The transaction might already be properly constructed from the API
      // tx.setSender(wallet.address);
      // tx.setGasPrice(BigInt(response.data.callData.gasPrice));
      // tx.setGasBudget(BigInt(response.data.callData.gas));
      // Sign and execute the transaction
      const result = await wallet.signAndExecuteTransaction({
        transaction: tx,
        options: {
          showEffects: true,
          showEvents: true,
        },
      });

      console.log('Transaction executed successfully!');
      console.log('Digest:', result.digest);
      return result.digest;
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error;
    }
  }

  return (
    <Button
      className={'swapButton'}
      onClick={suiSwap}
      loading={isTransacting}
      disabled={
        quoteCode === ErrorCodeEnum.NotApi ? true :
          ChainIdEnum.Sui !== Number(currentChainInfo?.chainId)
            ? false
            : ChainIdEnum.Sui !== Number(currentChainInfo?.chainId) ||
            DisabledSwap.some(i => Number(i) === Number(quoteCode)) ||
            Number(currentTokenBalance) < Number(inputValue) ||
            Number(inputValue) <= 0 ||
            inputValue === ''
      }
    >
      {ChainIdEnum.Sui !== Number(currentChainInfo?.chainId)
        ? 'Switch Network'
        : Number(inputValue) <= 0 || inputValue === ''
          ? 'Enter amount'
          : Number(currentTokenBalance) < Number(inputValue)
            ? 'Insufficient balance'
            : DisabledSwap.some(i => Number(i) === Number(quoteCode))
              ? ErrorSwapOKXCode[quoteCode]
              : isTransacting
                ? 'Preparing Transaction'
                : 'Swap'}
    </Button>
  );
}
