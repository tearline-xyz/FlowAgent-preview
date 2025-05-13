import Button from '~/components/Mui/Button';
import React, { useEffect } from 'react';
import { ConnectSol, ConnectEvm } from '~/components/Account/hooks/useCustomWeb3Modal';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
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
  const { openModal } = useCustomWeb3Modal();
  useEffect(() => {
    if (isSwitch) {
      openWallet();
      setIsSwitch(false);
    }
  }, [isSwitch]);
  const openWallet = () => {
    setChainNumber(chainId);
    openModal(chainId === 501 ? ConnectSol : ConnectEvm);
  };
  return (
    <Button className={'swapButton'} onClick={openWallet}>
      Connect Wallet
    </Button>
  );
}
