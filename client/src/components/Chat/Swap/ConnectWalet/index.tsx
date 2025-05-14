import Button from '~/components/Mui/Button';
import React, { useEffect, useState, useCallback } from 'react';
import { ConnectSol, ConnectEvm } from '~/components/Account/hooks/useCustomWeb3Modal';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import { ChainIdEnum } from '~/swap/enum';
import SuiWalletModal from '~/components/Chat/Swap/ConnectHeader/components/SuiWalletModal';

interface ConnectWalletProps {
  isSwitch: boolean;
  setIsSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  chainId: number | any;
  setChainNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function ConnectWallet({
                                        isSwitch,
                                        setIsSwitch,
                                        chainId,
                                        setChainNumber,
                                      }: ConnectWalletProps) {
  console.log('ConnectWallet', chainId);
  const [showModal, setShowModal] = useState(false);
  const { openModal } = useCustomWeb3Modal();
  // useEffect(() => {
  //   if (isSwitch) {
  //     if (chainId === ChainIdEnum.Sui) {
  //       setShowModal(true);
  //       setIsSwitch(false);
  //     }else {
  //       openWallet();
  //       setIsSwitch(false);
  //     }
  //   }
  // }, [isSwitch]);
  // const openWallet = () => {
  //   setChainNumber(chainId);
  //   if (chainId === ChainIdEnum.Sui) {
  //     setShowModal(true);
  //   } else {
  //     openModal(chainId === ChainIdEnum.Sol ? ConnectSol : ConnectEvm);
  //   }
  // };
  useEffect(() => {
    if (isSwitch) {
      handleWalletConnection();
    }
  }, [isSwitch]);
  const handleWalletConnection = useCallback(() => {
    setChainNumber(chainId);
    setIsSwitch(false);

    if (chainId === ChainIdEnum.Sui) {
      setShowModal(true);
    } else {
      const WalletComponent = chainId === ChainIdEnum.Sol ? ConnectSol : ConnectEvm;
      openModal(WalletComponent);
    }
  }, [chainId, openModal, setChainNumber, setIsSwitch]);
  return (
    <>
      <Button className={'swapButton'} onClick={handleWalletConnection}>
        Connect Wallet
      </Button>
      <SuiWalletModal setShowModal={setShowModal} showModal={showModal} />
    </>
  );
}
