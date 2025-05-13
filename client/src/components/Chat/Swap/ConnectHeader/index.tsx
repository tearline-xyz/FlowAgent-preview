import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import {
  SwapHeaderRight,
  SwapHeaderRightWalletBox,
  SwapHeaderRowAccount,
  SwapHeaderAccountBox,
} from '~/components/Chat/Swap/ConnectHeader/useConectHeaderStyle';
import classNames from 'classnames';
import { getChainLogo } from '~/swap/const/contract';
import { truncateWalletAddr } from '~/swap/util/wallet-address';
import { getImageUrl } from '~/swap/util/image-url';
import Button from '~/components/Mui/Button';
import { useState, useEffect } from 'react';
import { getChainInfo } from '~/swap/const/contract';
import { useInterval } from '~/swap/hooks/useInterval';
import { EtherInitApi } from '~/swap/const/erher-api';
import { SolApi } from '~/swap/const/sol-api';
import { ToFixedPipe } from '~/swap/const/bignumber';
import ConnectUserInfo from '~/components/Chat/Swap/ConnectHeader/components/ConnectUserInfo';
import ConnectWalletList from '~/components/Chat/Swap/ConnectHeader/components/ConnectWalletList';
import { ConnectButton } from '@suiet/wallet-kit';
export default function ConnectHeader() {
  const {
    isConnected,
    address,
    chainId,
    evmChain,
    walletProvider,
    solChain,
    connection,
    walletProviderSol,
  } = useCustomWeb3Modal();
  const [symbol, setSymbol] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    let tokenName = getChainInfo(chainId, 'symbol');
    setSymbol(tokenName);
    return () => {};
  }, [chainId, isConnected]);
  useEffect(() => {
    loadData().then();
  }, [isConnected, address]);
  useInterval(() => {
    loadData().then();
  }, 5000);
  const loadData = async () => {
    if (!address || !isConnected) {
      return;
    }
    if (evmChain && walletProvider) {
      const etherApi = new EtherInitApi(address, walletProvider);
      const bal = await etherApi.getBalance(address);
      setBalance(Number(ToFixedPipe(bal, 6, 1, true)));
    }
    if (solChain && walletProviderSol) {
      const solSdk = new SolApi(address, connection, walletProviderSol);
      const balance = await solSdk.getBalance();
      setBalance(Number(ToFixedPipe(balance, 6, 1, true)));
    }
  };
  return (
    <SwapHeaderRight id={'SwapHeaderRight'} className="mr-3">
      <SwapHeaderRightWalletBox
        className={classNames(isConnected ? 'ConnectSuccess' : 'NotConnect')}
      >
        {isConnected ? (
          <SwapHeaderRowAccount>
            <SwapHeaderAccountBox>
              <img className={'AccountPng'} src={getChainLogo(chainId)} alt="" />
              {isConnected ? truncateWalletAddr(address) : ''}
              <img className={'SelectChatPng'} src={getImageUrl('swap/select-swap.png')} alt="" />
            </SwapHeaderAccountBox>
          </SwapHeaderRowAccount>
        ) : (
          <Button
            // sx={(theme) => ({
            //   width: '7rem !important',
            // })}
            className={classNames('swapButton', 'swapHeader')}
          >
            Connect Wallet
          </Button>
        )}
        <ConnectWalletList className={'Header'} />
        <ConnectUserInfo balance={balance} symbol={symbol} userAdder={address} />
      </SwapHeaderRightWalletBox>
      <ConnectButton />
    </SwapHeaderRight>
  );
}
