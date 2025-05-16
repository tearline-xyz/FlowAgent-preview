import { DisabledSwap, ErrorSwapOKXCode } from '~/swap/const/error-code';

import { DefaultTokenAddr } from '~/swap/const/contract';
// import {Button} from '~/components/ui';
import Button from '~/components/Mui/Button';
import { AllChainData, IServerJetton } from '~/swap/interface';
import { EtherInitApi } from '~/swap/const/erher-api';
import React, { useState } from 'react';

import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import { ChainSwitch } from '~/components/Account/WagmiGlobal/config';
import { ErrorCodeEnum } from '~/enum/error-code.enum';

interface IEvmButton {
  inputValue: string;
  inputJetton: IServerJetton | null;
  outputJetton: IServerJetton | null;
  getIds: string;
  quoteCode: number;
  swapERC20: (ids: string, cb: Function) => void;
  approve: (data: any) => void;
  setTransactonSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setHash: React.Dispatch<React.SetStateAction<string>>;
  currentTokenBalance: string;
  connect: () => void;
  currentChainInfo: AllChainData | null;
}

export default function EvmButton({
  inputJetton,
  outputJetton,
  inputValue,
  getIds,
  quoteCode,
  swapERC20,
  approve,
  setTransactonSuccess,
  setHash,
  currentTokenBalance,
  connect,
  currentChainInfo,
}: IEvmButton) {
  const {
    chainId,
    isConnected,
    address,
    walletProvider,
    checkSwitchNetwork,
    // openModal,
    disconnectConnect,
  } = useCustomWeb3Modal();

  const [loading, setLoading] = useState<boolean>(false);

  const [swapStatus, setSwapStatus] = useState<string>('');

  const evmSwap = async () => {
    let currChainId = Number(currentChainInfo?.chainId);
    if (Number(chainId) !== currChainId) {
      if (currentChainInfo?.chainId && ChainSwitch && ChainSwitch[currChainId]) {
        if (currChainId === 501 || currChainId === 607) {
          // checkSwitchNetwork(ChainSwitch[currChainId])
          disconnectConnect();
          connect();
        } else {
          checkSwitchNetwork(ChainSwitch[currentChainInfo?.chainId]);
        }
      }
      return;
    }
    if (
      !inputJetton ||
      !outputJetton ||
      !address ||
      Number(chainId) === 607 ||
      Number(chainId) === 501
    ) {
      return;
    }
    let isEvm: boolean = Object.values(DefaultTokenAddr).some(
      (i) => i.toLowerCase() === inputJetton.tokenContractAddress.toLowerCase(),
    );
    if (isEvm) {
      evmSendSwap();
    } else {
      const etherApi = new EtherInitApi(address, walletProvider);
      const allowanceNumber: any = await etherApi.allowance(
        inputJetton?.tokenContractAddress as string,
        address,
        currentChainInfo?.dexTokenApproveAddress,
      );
      if (Number(inputValue) > Number(allowanceNumber)) {
        setLoading(true);
        setSwapStatus('approve');
        approve(async (data: any) => {
          if (Number(data.code) === 0 && data.data.length) {
            const info: {
              data: string;
              dexContractAddress: string;
              gasLimit: string;
              gasPrice: string;
            } = data.data[0];
            try {
              await etherApi.sendSignedTransaction({
                to: inputJetton.tokenContractAddress,
                value: 0,
                data: info.data,
                gasLimit: info.gasLimit,
              });
              await evmSendSwap();
            } catch (e) {
              setLoading(false);
              setSwapStatus('');
            }
          } else {
            setSwapStatus('');
          }
        });
      } else {
        evmSendSwap();
      }
    }
  };
  const evmSendSwap = () => {
    try {
      setLoading(true);
      setSwapStatus('swap');
      const id_s = getIds;
      const etherApi = new EtherInitApi(address, walletProvider);
      swapERC20(id_s, async (data: any) => {
        if (Number(data.code) === 0) {
          const swapData = data.data;

          if (swapData.length) {
            try {
              const swapDataTxInfo = swapData[0].tx;
              const hash: any = await etherApi.sendSignedTransaction({
                to: swapDataTxInfo.to,
                value: swapDataTxInfo.value,
                data: swapDataTxInfo.data,
                gasLimit: 0,
                // gasPrice: BigInt(swapDataTxInfo.gasPrice) * BigInt(ratio),
                // gas: BigInt(swapDataTxInfo.gas) * BigInt(ratio),
              });
              // console.log('hash', hash);
              setHash(hash.hash);
              setSwapStatus('');
              setLoading(false);
              setTransactonSuccess(true);
            } catch (e) {
              console.log(e, e);
              setSwapStatus('');
              setLoading(false);
            }

            // console.log('hash', hash);
          }
        } else {
          setSwapStatus('');
          setLoading(false);
        }
      });
    } catch (e) {
      setSwapStatus('');
      setLoading(false);
    }
  };
  return (
    <Button
      className={'swapButton'}
      // showLoadingText={false}
      // buttonText={true}
      hiddenLoadingText={true}
      onClick={evmSwap}
      disabled={
        quoteCode === ErrorCodeEnum.NotApi
          ? true
          : isConnected && address && Number(chainId) !== Number(currentChainInfo?.chainId)
            ? false
            : DisabledSwap.some((i) => Number(i) === Number(quoteCode)) ||
              Number(currentTokenBalance) < Number(inputValue) ||
              Number(inputValue) <= 0 ||
              inputValue === ''
      }
      loading={loading}
    >
      {isConnected && address && Number(chainId) !== Number(currentChainInfo?.chainId)
        ? 'Switch Network'
        : Number(inputValue) <= 0 || inputValue === ''
          ? 'Enter amount'
          : Number(currentTokenBalance) < Number(inputValue)
            ? 'Insufficient balance'
            : DisabledSwap.some((i) => Number(i) === Number(quoteCode))
              ? ErrorSwapOKXCode[quoteCode]
              : swapStatus === 'approve'
                ? 'Approve'
                : swapStatus === 'swap'
                  ? 'Preparing Transaction'
                  : 'Swap'}
    </Button>
  );
}
