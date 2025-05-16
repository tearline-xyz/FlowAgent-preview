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
import useSuiWeb3 from '~/components/Account/hooks/useSuiWeb3';
import { EtherInitApi } from '~/swap/const/erher-api';
import { DefaultTokenAddr } from '~/swap/const/contract';
import { SolApi } from '~/swap/const/sol-api';

const useCustomWeb3Modal = () => {
  const {
    suiConnected,
    suiChainId,
    suiAddress,
    suiDisconnect,
    fetchSuiBalance,
    getTokenBalanceSimple,
    wallet,
  } = useSuiWeb3();
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
  console.log('inConnected', isConnected);
  const { switchNetwork, chainId } = useAppKitNetwork();

  const { walletProvider } = useAppKitProvider('eip155');
  const { walletProvider: walletProviderSol } = useAppKitProvider<Provider>('solana');
  const [account, setAccount] = useState<string | undefined>('');

  const evmChain = isConnected && chainId !== '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp' && chainId !== 607;
  const solChain = isConnected && chainId === '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
  const suiChain = suiConnected && suiAddress && !isConnected;
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
  const disconnectConnect = async () => {
    if (suiChain) {
      await suiDisconnect();
    } else {
      disconnect();
    }
  };
  const checkSwitchNetwork = (chainId: any) => {
    switchNetwork(chainId);
  };
  const address = suiConnected && suiAddress ? suiAddress : account;

  const isMainToken = (tokenAddr: string) =>
    Object.values(DefaultTokenAddr).some(
      (i) => i.toLocaleLowerCase() === tokenAddr.toLocaleLowerCase(),
    );

  const getTokenBalance = async (tokenAddress: string) => {
    let balance;
    if (evmChain) {
      walletProvider;
      const sdk = new EtherInitApi(address, walletProvider, chainId);
      balance = isMainToken(tokenAddress)
        ? await sdk.getBalance(tokenAddress)
        : await sdk.tokenBalance(tokenAddress, address);
    } else if (solChain) {
      const sdkSol = new SolApi(address, connection, walletProviderSol);
      if (isMainToken(tokenAddress)) {
        balance = await sdkSol.getBalance();
      } else {
        const tokenAccount = await sdkSol.getTokenAccount(tokenAddress);
        balance = await sdkSol.getTokenBalance(tokenAccount);
      }
    } else if (suiChain) {
      if (isMainToken(tokenAddress)) {
        const sBalance = await fetchSuiBalance();
        balance = sBalance;
      } else {
        balance = await getTokenBalanceSimple(tokenAddress);
      }
    }
    return balance;
  };

  return {
    openModal,
    closeModal,
    disconnectConnect,
    checkSwitchNetwork,
    walletInfo,
    account,
    address,
    chainId:
      suiConnected && suiAddress
        ? suiChainId
        : chainId === '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
          ? 501
          : chainId, // TODO sol 501; 其余的按照EVM 后面解决 SUI TON
    isConnected: suiConnected ? suiConnected : isConnected,
    state: state.selectedNetworkId?.toString(),
    walletProvider,
    evmChain,
    solChain,
    suiChain,
    embeddedWalletInfo,
    disconnect,
    connection,
    walletProviderSol,
    getTokenBalance,
    suiWallet: wallet,
  };
};

export default useCustomWeb3Modal;

export const ConnectEvm = { view: 'Connect', namespace: 'eip155' };
export const ConnectSol = { view: 'Connect', namespace: 'solana' };
