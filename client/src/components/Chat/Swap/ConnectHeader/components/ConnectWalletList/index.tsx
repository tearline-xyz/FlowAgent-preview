import {
  NotConnectAbsolute,
  NotTitle,
  WalletBox,
  WalletChainBox,
  OtherChain,
  WalletTypeBox,
  WalletTypeBoxLeft,
  WalletTypeBoxRight,
  WalletTypeName,
  WalletTypeFullName,
  ConnectArrow,
  ConnectArrowSol,
} from '~/components/Chat/Swap/ConnectHeader/components/ConnectWalletList/useConnectWalletListStyle';
import classNames from 'classnames';
import useCustomWeb3Modal, { ConnectEvm, ConnectSol } from '~/components/Account/hooks/useCustomWeb3Modal';
import CheckNetwork from '~/components/Chat/Swap/CheckNetwork';
import { useState } from 'react';
import { getImageUrl } from '~/swap/util/image-url';


interface ConnectWalletListProps {
  className: string;
  setVisibleMobal?: () => void;
}

export default function ConnectWalletList({
                                            className,
                                            setVisibleMobal,
                                          }: ConnectWalletListProps) {
  const [chainNumber, setChainNumber] = useState<number>(-1);

  const { openModal } = useCustomWeb3Modal();


  const connectClick = async (type: string, chain: number) => {

    setChainNumber(chain);
    if (type === 'EVM') {
      await openModal(ConnectEvm);
    }
    if (type === 'SOL') {
      await openModal(ConnectSol);
    }
    setVisibleMobal && setVisibleMobal();
  };
  return (
    <NotConnectAbsolute className={classNames('NotConnectAbsolute', className)}>
      <CheckNetwork chainNumber={chainNumber} setChainNumber={setChainNumber} />
      <NotTitle className={'NotTitle'}>Connect Wallet</NotTitle>
      <WalletBox onClick={() => connectClick('EVM', 56)}>
        <WalletChainBox className={'BscBox'}>
          <img
            className={'BscPng'}
            src={'https://www.okx.com/cdn/wallet/logo/BNB-20220308.png'}
            alt=''
          />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName>BNB Chain</WalletTypeName>
            <WalletTypeFullName>BNB Smart Chain Mainnet</WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight>
            <div className='text'>Connect</div>
            <ConnectArrow>
              <img src={getImageUrl('swap/Connect-Arrow.png')} alt='' />
            </ConnectArrow>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>
      <OtherChain>
        <div className='left'></div>
        Other Chain
        <div className='right'></div>
      </OtherChain>

      <WalletBox
        className={'SolBox'}
        onClick={() => connectClick('EVM', 1)}
        key={'evm'}
      >
        <WalletChainBox>
          <img className={'EvmPng'} src={getImageUrl('swap/evm-chain-logo.png')} alt='' />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName className={'SolName'}>EVM</WalletTypeName>
            <WalletTypeFullName className={'SolFullName'}>
              Ethereum Virtual Machine
            </WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight className={'SolConnect'}>
            <div className='text'>Connect</div>
            <ConnectArrowSol>
              <img src={getImageUrl('swap/bg-arrow.svg')} alt='' />
            </ConnectArrowSol>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>

      <WalletBox
        className={'SolBox'}
        onClick={() => connectClick('SOL', 501)}
        key={'sol'}
      >
        <WalletChainBox className={'SolChainBox'}>
          <img className={'SolPng'} src={getImageUrl('swap/sol-chain-logo.png')} alt='' />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName className={'SolName'}>Solana</WalletTypeName>
            <WalletTypeFullName className={'SolFullName'}>
              Solana
            </WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight className={'SolConnect'}>
            <div className='text'>Connect</div>
            <ConnectArrowSol>
              <img src={getImageUrl('swap/bg-arrow.svg')} alt='' />
            </ConnectArrowSol>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>
    </NotConnectAbsolute>
  );
}
