import { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export default function useSuiWeb3() {
  const wallet = useWallet();
  const { disconnect } = wallet;
  // console.log('wallet', wallet);
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  const suiClient = new SuiClient({ url: getFullnodeUrl('mainnet') });

  const fetchSuiBalance = async (cb?: Function) => {
    if (!wallet?.address) return;
    setIsLoading(true);
    try {
      const balanceData = await suiClient.getBalance({
        owner: wallet.address,
        coinType: '0x2::sui::SUI',
      });
      setBalance((Number(balanceData.totalBalance) / 10 ** 9).toString());
      cb && cb();
    } catch (e) {
      console.error(e);
      setBalance('Error');
    } finally {
      setIsLoading(false);
    }
  };
  async function getTokenBalanceSimple(TOKEN_TYPE:string) {
    if (!wallet.connected || !wallet.address) {
      throw new Error("Wallet not connected");
    }

    const balance = await suiClient.getBalance({
      owner: wallet.address,
      coinType: TOKEN_TYPE,
    });

    // console.log(`Token Balance: ${balance.totalBalance}`);
    return balance.totalBalance;
  }

  useEffect(() => {
    fetchSuiBalance().then();
  }, [wallet?.address]);
  return {
    wallet,
    suiConnected: wallet.connected,
    suiAddress: wallet.address,
    suiChainId: wallet.chain.id === 'sui:mainnet' ? 784 : '',
    suiDisconnect: disconnect,
    suiBalance: balance,
    assetsIsLoading: isLoading,
    fetchSuiBalance: fetchSuiBalance,
    getTokenBalanceSimple
  };
}
