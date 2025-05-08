import { useEffect, useState } from 'react';
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
  useAppKitNetwork,
  useAppKitState,
  useAppKitProvider,
} from '@reown/appkit/react';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from '@reown/appkit-adapter-solana/react';
const useCustomWeb3Modal = () => {
  const { connection } = useAppKitConnection();
  const { open, close } = useAppKit();
  const {
    address: currAddress,
    isConnected,
    // caipAddress,
    // status,
    embeddedWalletInfo,
  } = useAppKitAccount();
  // console.log('status', status,caipAddress);
  const state = useAppKitState();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();
  // console.log('walletInfo', walletInfo);
  const { switchNetwork, chainId } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider('eip155');
  const { walletProvider: walletProviderSol } = useAppKitProvider<Provider>('solana');
  const [account, setAccount] = useState<string | undefined>('');
  let evmChain =
    isConnected &&
    chainId !== '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp' &&
    chainId !== 607;
  let solChain = isConnected && chainId === '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
  useEffect(() => {
    if (currAddress) {
      setAccount(currAddress);
    }
  }, [currAddress]);

  const openModal = (obj?: any) => {
    if (obj) {
      open(obj);
    } else {
      open();
    }
  };
  const closeModal = () => {
    close();
  };
  const disconnectConnect = () => {
    disconnect();
  };
  const checkSwitchNetwork = (chainId: any) => {
    switchNetwork(chainId);
  };

  return {
    openModal,
    closeModal,
    disconnectConnect,
    checkSwitchNetwork,
    walletInfo,
    account,
    address: account,
    chainId: chainId === '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp' ? 501 : chainId, // TODO sol 501; 其余的按照EVM 后面解决 SUI TON
    isConnected,
    state: state.selectedNetworkId?.toString(),
    walletProvider,
    evmChain,
    solChain,
    embeddedWalletInfo,
    disconnect,
    connection,
    walletProviderSol
  };
};

export default useCustomWeb3Modal;

export const ConnectEvm = { view: 'Connect', namespace: 'eip155' };
export const ConnectSol = { view: 'Connect', namespace: 'solana' };
