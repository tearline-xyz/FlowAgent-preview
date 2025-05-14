import React, { useEffect } from 'react';
import {ChainSwitch} from '~/components/Account/WagmiGlobal/config';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
interface ICheckNetwork {
  chainNumber: number;
  setChainNumber: React.Dispatch<React.SetStateAction<number>>
}

export default function CheckNetwork({ chainNumber,setChainNumber }: ICheckNetwork) {
  const { chainId, isConnected, checkSwitchNetwork } = useCustomWeb3Modal();
  useEffect(() => {
    const load = async () => {
      if (chainNumber === -1 || chainNumber===784) return;
      if (isConnected && chainId && chainId !== chainNumber) {
        if (chainNumber === 501) {
          if (chainId !== 501) {
            // console.log('1');
            checkSwitchNetwork(ChainSwitch[chainNumber]);
            setChainNumber(-1);
          }
        } else {
          if (chainId !== chainNumber) {
            // console.log('2');
            checkSwitchNetwork(ChainSwitch[chainNumber]);
            setChainNumber(-1);
          }
        }
      }
    };
    load().then();
    return () => {
    };
  }, [isConnected, chainNumber, chainId]);

  return (
    <></>
  )
}
